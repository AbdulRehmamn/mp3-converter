// YouTube to MP3 Converter API
// This demonstrates the core API functionality extracted from your React app

import axios from 'axios';

class YouTubeMP3API {
  constructor() {
    // Use environment variable or fallback to provided key
    this.apiKey = process.env.RAPIDAPI_KEY || '65560d6fd6msha21d1fb7df6c45cp165b1djsn3b50ced25f83';
    this.apiHost = 'youtube-mp36.p.rapidapi.com';
    this.baseURL = 'https://youtube-mp36.p.rapidapi.com';
    
    // Alternative APIs as fallbacks
    this.fallbackAPIs = [
      {
        host: 'youtube-mp315.p.rapidapi.com',
        url: 'https://youtube-mp315.p.rapidapi.com/dl'
      },
      {
        host: 'youtube-to-mp315.p.rapidapi.com', 
        url: 'https://youtube-to-mp315.p.rapidapi.com/download'
      }
    ];
  }

  /**
   * Extract video ID from YouTube URL or return the ID if already provided
   * @param {string} url - YouTube URL or video ID
   * @returns {string} - Video ID
   */
  extractVideoId(url) {
    // Enhanced regex to handle more YouTube URL formats
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[7] && match[7].length === 11) {
      return match[7];
    }
    
    // If regex fails, try to extract 11-character video ID manually
    const videoIdMatch = url.match(/[a-zA-Z0-9_-]{11}/);
    return videoIdMatch ? videoIdMatch[0] : url;
  }

  /**
   * Validate YouTube video ID format
   * @param {string} videoId - Video ID to validate
   * @returns {boolean} - Whether the ID is valid
   */
  isValidVideoId(videoId) {
    return /^[a-zA-Z0-9_-]{11}$/.test(videoId);
  }

  /**
   * Try conversion with fallback APIs
   * @param {string} videoId - YouTube video ID
   * @returns {Promise<Object>} - API response
   */
  async tryWithFallbacks(videoId) {
    // Try main API first
    try {
      const result = await this.makeAPIRequest(videoId, this.apiHost, `${this.baseURL}/dl`);
      if (result.success) return result;
    } catch (error) {
      console.log('Main API failed, trying fallbacks...');
    }

    // Try fallback APIs
    for (const fallback of this.fallbackAPIs) {
      try {
        console.log(`Trying fallback API: ${fallback.host}`);
        const result = await this.makeAPIRequest(videoId, fallback.host, fallback.url);
        if (result.success) return result;
      } catch (error) {
        console.log(`Fallback ${fallback.host} failed:`, error.message);
        continue;
      }
    }

    return {
      success: false,
      error: 'All API endpoints failed. The video might be restricted or unavailable.',
      details: 'Tried multiple API endpoints without success'
    };
  }

  /**
   * Make API request to specific endpoint
   * @param {string} videoId - YouTube video ID
   * @param {string} host - API host
   * @param {string} url - API URL
   * @returns {Promise<Object>} - API response
   */
  async makeAPIRequest(videoId, host, url) {
    const options = {
      method: 'GET',
      url: url,
      params: { id: videoId },
      headers: {
        'x-rapidapi-key': this.apiKey,
        'x-rapidapi-host': host,
      },
      timeout: 30000, // 30 second timeout
    };

    const response = await axios.request(options);
    
    if (response.data && (response.data.status === 'ok' || response.data.link)) {
      return {
        success: true,
        data: {
          title: response.data.title || 'Unknown Title',
          link: response.data.link,
          duration: response.data.duration || 'Unknown',
          progress: response.data.progress || 100,
          status: response.data.status || 'ok'
        }
      };
    } else {
      throw new Error('Invalid response format');
    }
  }

  /**
   * Convert YouTube video to MP3
   * @param {string} videoUrl - YouTube URL or video ID
   * @returns {Promise<Object>} - API response with download link
   */
  async convertToMP3(videoUrl) {
    try {
      if (!videoUrl || videoUrl.trim() === '') {
        return {
          success: false,
          error: 'Please provide a valid YouTube URL or video ID',
          details: 'Empty input provided'
        };
      }

      const videoId = this.extractVideoId(videoUrl);
      
      if (!this.isValidVideoId(videoId)) {
        return {
          success: false,
          error: 'Invalid YouTube video ID format',
          details: `Extracted ID: ${videoId}`
        };
      }

      console.log(`Converting video ID: ${videoId}`);
      return await this.tryWithFallbacks(videoId);
      
    } catch (error) {
      console.error('Conversion error:', error);
      return {
        success: false,
        error: error.code === 'ECONNABORTED' ? 
          'Request timeout. Please try again.' : 
          'An error occurred during conversion',
        details: error.response?.data || error.message
      };
    }
  }

  /**
   * Get video information without converting
   * @param {string} videoUrl - YouTube URL or video ID
   * @returns {Promise<Object>} - Video information
   */
  async getVideoInfo(videoUrl) {
    try {
      const videoId = this.extractVideoId(videoUrl);
      
      const options = {
        method: 'GET',
        url: `${this.baseURL}/dl`,
        params: { 
          id: videoId,
          info: true // This parameter might be supported by the API
        },
        headers: {
          'x-rapidapi-key': this.apiKey,
          'x-rapidapi-host': this.apiHost,
        },
      };

      const response = await axios.request(options);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to get video information',
        details: error.response?.data || error.message
      };
    }
  }
}

export default YouTubeMP3API;