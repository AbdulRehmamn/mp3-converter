// YouTube to MP3 Converter API
// Updated with your new API subscription

import axios from 'axios';

class YouTubeMP3API {
  constructor() {
    this.apiKey = 'f1cfc6624amshc1f7a8bfd6d6077p1623c3jsn944853391dde';
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
   * Convert YouTube video to MP3 using axios (your preferred method)
   * @param {string} videoUrl - YouTube URL or video ID
   * @returns {Promise<Object>} - API response with download link
   */
  async convertToMP3(videoUrl) {
    try {
      const videoId = this.extractVideoId(videoUrl);
      
      const options = {
        method: 'GET',
        url: 'https://youtube-mp36.p.rapidapi.com/dl',
        params: { id: videoId },
        headers: {
          'x-rapidapi-key': 'f1cfc6624amshc1f7a8bfd6d6077p1623c3jsn944853391dde',
          'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
        }
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
            
            if (responseData.status === 'ok') {
              resolve({
                success: true,
                data: {
                  title: responseData.title,
                  link: responseData.link,
                  duration: responseData.duration,
                  progress: responseData.progress,
                  status: responseData.status
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

      xhr.open('GET', `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`);
      xhr.setRequestHeader('x-rapidapi-key', 'f1cfc6624amshc1f7a8bfd6d6077p1623c3jsn944853391dde');
      xhr.setRequestHeader('x-rapidapi-host', 'youtube-mp36.p.rapidapi.com');

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
        url: 'https://youtube-mp36.p.rapidapi.com/dl',
        params: { id: videoId },
        headers: {
          'x-rapidapi-key': 'f1cfc6624amshc1f7a8bfd6d6077p1623c3jsn944853391dde',
          'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
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