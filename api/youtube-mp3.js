// YouTube to MP3 Converter API
// Updated with your new API subscription

import axios from 'axios';

class YouTubeMP3API {
  constructor() {
    this.apiKey = '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc';
    this.apiHost = 'youtube-mp3-2025.p.rapidapi.com';
    this.baseURL = 'https://youtube-mp3-2025.p.rapidapi.com';
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
   * Convert YouTube video to MP3 using axios (your preferred method)
   * @param {string} videoUrl - YouTube URL or video ID
   * @returns {Promise<Object>} - API response with download link
   */
  async convertToMP3(videoUrl) {
    try {
      const videoId = this.extractVideoId(videoUrl);
      
      const options = {
        method: 'GET',
        url: 'https://youtube-mp3-2025.p.rapidapi.com/v1/social/youtube/audio',
        params: { 
          id: videoId,
          ext: 'm4a',
          quality: '128kbps'
        },
        headers: {
          'x-rapidapi-key': '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc',
          'x-rapidapi-host': 'youtube-mp3-2025.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      
      if (response.data && response.data.download_url) {
        return {
          success: true,
          data: {
            title: response.data.title || 'Unknown Title',
            link: response.data.download_url,
            duration: response.data.duration,
            quality: response.data.quality || '128kbps',
            format: response.data.ext || 'm4a'
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
      console.error('API Error:', error);
      return {
        success: false,
        error: 'An error occurred during conversion',
        details: error.response?.data || error.message
      };
    }
  }

  /**
   * Convert YouTube video to MP3 using XMLHttpRequest (alternative method)
   * @param {string} videoUrl - YouTube URL or video ID
   * @returns {Promise<Object>} - API response with download link
   */
  async convertToMP3WithXHR(videoUrl) {
    return new Promise((resolve) => {
      const videoId = this.extractVideoId(videoUrl);
      
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
          try {
            const responseData = JSON.parse(this.responseText);
            
            if (responseData && responseData.download_url) {
              resolve({
                success: true,
                data: {
                  title: responseData.title || 'Unknown Title',
                  link: responseData.download_url,
                  duration: responseData.duration,
                  quality: responseData.quality || '128kbps',
                  format: responseData.ext || 'm4a'
                }
              });
            } else {
              resolve({
                success: false,
                error: 'Conversion failed. Please try again.',
                details: responseData
              });
            }
          } catch (error) {
            resolve({
              success: false,
              error: 'Failed to parse response',
              details: error.message
            });
          }
        }
      });

      xhr.open('GET', `https://youtube-mp3-2025.p.rapidapi.com/v1/social/youtube/audio?id=${videoId}&ext=m4a&quality=128kbps`);
      xhr.setRequestHeader('x-rapidapi-key', '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc');
      xhr.setRequestHeader('x-rapidapi-host', 'youtube-mp3-2025.p.rapidapi.com');

      xhr.send(null);
    });
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
        url: 'https://youtube-mp3-2025.p.rapidapi.com/v1/social/youtube/audio',
        params: { 
          id: videoId,
          ext: 'm4a',
          quality: '128kbps'
        },
        headers: {
          'x-rapidapi-key': '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc',
          'x-rapidapi-host': 'youtube-mp3-2025.p.rapidapi.com'
        }
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