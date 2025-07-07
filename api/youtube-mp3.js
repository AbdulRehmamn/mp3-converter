// YouTube to MP3 Converter API
// This demonstrates the core API functionality extracted from your React app

import axios from 'axios';

class YouTubeMP3API {
  constructor() {
    this.apiKey = '65560d6fd6msha21d1fb7df6c45cp165b1djsn3b50ced25f83';
    this.apiHost = 'youtube-mp36.p.rapidapi.com';
    this.baseURL = 'https://youtube-mp36.p.rapidapi.com';
  }

  /**
   * Extract video ID from YouTube URL or return the ID if already provided
   * @param {string} url - YouTube URL or video ID
   * @returns {string} - Video ID
   */
  extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
  }

  /**
   * Convert YouTube video to MP3
   * @param {string} videoUrl - YouTube URL or video ID
   * @returns {Promise<Object>} - API response with download link
   */
  async convertToMP3(videoUrl) {
    try {
      const videoId = this.extractVideoId(videoUrl);
      
      const options = {
        method: 'GET',
        url: `${this.baseURL}/dl`,
        params: { id: videoId },
        headers: {
          'x-rapidapi-key': this.apiKey,
          'x-rapidapi-host': this.apiHost,
        },
      };

      const response = await axios.request(options);
      
      if (response.data.status === 'ok') {
        return {
          success: true,
          data: {
            title: response.data.title,
            link: response.data.link,
            duration: response.data.duration,
            progress: response.data.progress,
            status: response.data.status
          }
        };
      } else {
        return {
          success: false,
          error: 'Conversion failed. Please try again.',
          details: response.data
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'An error occurred during conversion',
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