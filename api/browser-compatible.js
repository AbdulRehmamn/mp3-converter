// Browser-compatible version using XMLHttpRequest
// YouTube to MP3 Converter 100% Free API

class YouTubeMP3BrowserAPI {
  constructor() {
    this.apiKey = '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc';
    this.apiHost = 'youtube-to-mp3-converter-100-free.p.rapidapi.com';
  }

  /**
   * Convert YouTube video to MP3 using XMLHttpRequest (browser compatible)
   * @param {string} videoUrl - Full YouTube URL
   * @returns {Promise<Object>} - API response with download link
   */
  async convertToMP3(videoUrl) {
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
                // Alternative response format
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
                  details: responseData,
                  statusCode: this.status
                });
              }
            } else {
              resolve({
                success: false,
                error: `API Error: ${this.status}`,
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

      const encodedUrl = encodeURIComponent(videoUrl);
      xhr.open('GET', `https://youtube-to-mp3-converter-100-free.p.rapidapi.com/apifree.php?yt=${encodedUrl}`);
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
api.convertToMP3('https://www.youtube.com/watch?v=RpDz2umxPjA').then(result => {
  if (result.success) {
    console.log('Download link:', result.data.link);
    console.log('Title:', result.data.title);
  } else {
    console.error('Error:', result.error);
  }
});
*/