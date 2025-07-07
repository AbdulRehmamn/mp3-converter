// Browser-compatible version using XMLHttpRequest
// This can be used directly in the browser without Node.js

class YouTubeMP3BrowserAPI {
  constructor() {
    this.apiKey = '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc';
    this.apiHost = 'youtube-mp3-2025.p.rapidapi.com';
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
   * Convert YouTube video to MP3 using XMLHttpRequest (browser compatible)
   * @param {string} videoUrl - YouTube URL or video ID
   * @returns {Promise<Object>} - API response with download link
   */
  async convertToMP3(videoUrl) {
    return new Promise((resolve) => {
      const videoId = this.extractVideoId(videoUrl);
      
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
          try {
            const responseData = JSON.parse(this.responseText);
            
            if (this.status === 200 && responseData.download_url) {
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
                details: responseData,
                statusCode: this.status
              });
            }
          } catch (error) {
            resolve({
              success: false,
              error: 'Failed to parse response',
              details: {
                message: error.message,
                responseText: this.responseText,
                statusCode: this.status
              }
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

      xhr.open('GET', `https://youtube-mp3-2025.p.rapidapi.com/v1/social/youtube/audio?id=${videoId}&ext=m4a&quality=128kbps`);
      xhr.setRequestHeader('x-rapidapi-key', this.apiKey);
      xhr.setRequestHeader('x-rapidapi-host', this.apiHost);
      xhr.timeout = 30000; // 30 second timeout

      xhr.send(null);
    });
  }
}

// For browser usage
if (typeof window !== 'undefined') {
  window.YouTubeMP3BrowserAPI = YouTubeMP3BrowserAPI;
}

// For Node.js usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = YouTubeMP3BrowserAPI;
}

// Example usage in browser:
/*
const api = new YouTubeMP3BrowserAPI();
api.convertToMP3('UxxajLWwzqY').then(result => {
  if (result.success) {
    console.log('Download link:', result.data.link);
  } else {
    console.error('Error:', result.error);
  }
});
*/