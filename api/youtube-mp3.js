// YouTube to MP3 Converter API
// Using YouTube to MP3 Converter 100% Free API

import axios from 'axios';

class YouTubeMP3API {
  constructor() {
    this.apiKey = '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc';
    this.apiHost = 'youtube-to-mp3-converter-100-free.p.rapidapi.com';
    this.baseURL = 'https://youtube-to-mp3-converter-100-free.p.rapidapi.com';
  }

  /**
   * Convert YouTube video to MP3 using axios (your preferred method)
   * @param {string} videoUrl - Full YouTube URL
   * @returns {Promise<Object>} - API response with download link
   */
  async convertToMP3(videoUrl) {
    try {
      const options = {
        method: 'GET',
        url: 'https://youtube-to-mp3-converter-100-free.p.rapidapi.com/apifree.php',
        params: {
          yt: videoUrl
        },
        headers: {
          'x-rapidapi-key': '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc',
          'x-rapidapi-host': 'youtube-to-mp3-converter-100-free.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      
      if (response.data.success && response.data.download_url) {
        return {
          success: true,
          data: {
            title: response.data.title || 'Unknown Title',
            link: response.data.download_url,
            duration: response.data.duration,
            quality: response.data.quality || 'MP3',
            filesize: response.data.filesize
          }
        };
      } else if (response.data.download_link) {
        // Alternative response format
        return {
          success: true,
          data: {
            title: response.data.video_title || 'Unknown Title',
            link: response.data.download_link,
            duration: response.data.video_duration,
            quality: 'MP3',
            filesize: response.data.file_size
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
   * @param {string} videoUrl - Full YouTube URL
   * @returns {Promise<Object>} - API response with download link
   */
  async convertToMP3WithXHR(videoUrl) {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
          try {
            const responseData = JSON.parse(this.responseText);
            
            if (this.status === 200) {
              if (responseData.success && responseData.download_url) {
                resolve({
                  success: true,
                  data: {
                    title: responseData.title || 'Unknown Title',
                    link: responseData.download_url,
                    duration: responseData.duration,
                    quality: responseData.quality || 'MP3',
                    filesize: responseData.filesize
                  }
                });
              } else if (responseData.download_link) {
                resolve({
                  success: true,
                  data: {
                    title: responseData.video_title || 'Unknown Title',
                    link: responseData.download_link,
                    duration: responseData.video_duration,
                    quality: 'MP3',
                    filesize: responseData.file_size
                  }
                });
              } else {
                resolve({
                  success: false,
                  error: 'Conversion failed. Please try again.',
                  details: responseData
                });
              }
            } else {
              resolve({
                success: false,
                error: `API Error: ${this.status}`,
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

      xhr.addEventListener('error', function() {
        resolve({
          success: false,
          error: 'Network error occurred',
          details: 'Failed to connect to the API'
        });
      });

      xhr.addEventListener('timeout', function() {
        resolve({
          success: false,
          error: 'Request timeout',
          details: 'The request took too long to complete'
        });
      });

      const encodedUrl = encodeURIComponent(videoUrl);
      xhr.open('GET', `https://youtube-to-mp3-converter-100-free.p.rapidapi.com/apifree.php?yt=${encodedUrl}`);
      xhr.setRequestHeader('x-rapidapi-key', '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc');
      xhr.setRequestHeader('x-rapidapi-host', 'youtube-to-mp3-converter-100-free.p.rapidapi.com');
      xhr.timeout = 30000; // 30 second timeout

      xhr.send(null);
    });
  }

  /**
   * Get video information without converting
   * @param {string} videoUrl - Full YouTube URL
   * @returns {Promise<Object>} - Video information
   */
  async getVideoInfo(videoUrl) {
    try {
      const options = {
        method: 'GET',
        url: 'https://youtube-to-mp3-converter-100-free.p.rapidapi.com/apifree.php',
        params: {
          yt: videoUrl
        },
        headers: {
          'x-rapidapi-key': '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc',
          'x-rapidapi-host': 'youtube-to-mp3-converter-100-free.p.rapidapi.com'
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