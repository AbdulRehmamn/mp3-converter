import { useState } from 'react';
import './App.css';
import AdBanner728x90 from './Components/AdBanner728x90';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);

  const convertToMp3 = async () => {
    setLoading(true);
    setError(null);
    setDownloadLink(null);
    setVideoInfo(null);

    try {
      // Method 1: Using fetch (browser-compatible version of axios)
      const response = await fetch(`https://youtube-to-mp3-converter-100-free.p.rapidapi.com/apifree.php?yt=${encodeURIComponent(videoUrl)}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc',
          'x-rapidapi-host': 'youtube-to-mp3-converter-100-free.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.download_url) {
        setDownloadLink(data.download_url);
        setVideoInfo({
          title: data.title || 'Unknown Title',
          duration: data.duration || 'Unknown',
          quality: data.quality || 'MP3',
          filesize: data.filesize || 'Unknown'
        });
      } else if (data.download_link) {
        // Alternative response format
        setDownloadLink(data.download_link);
        setVideoInfo({
          title: data.video_title || 'Unknown Title',
          duration: data.video_duration || 'Unknown',
          quality: 'MP3',
          filesize: data.file_size || 'Unknown'
        });
      } else {
        // Fallback to XMLHttpRequest method
        await convertWithXHR();
      }
    } catch (err) {
      console.error('Fetch conversion error:', err);
      // Fallback to XMLHttpRequest method
      await convertWithXHR();
    } finally {
      setLoading(false);
    }
  };

  const convertWithXHR = async () => {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
          try {
            const responseData = JSON.parse(this.responseText);
            
            if (this.status === 200) {
              if (responseData.success && responseData.download_url) {
                setDownloadLink(responseData.download_url);
                setVideoInfo({
                  title: responseData.title || 'Unknown Title',
                  duration: responseData.duration || 'Unknown',
                  quality: responseData.quality || 'MP3',
                  filesize: responseData.filesize || 'Unknown'
                });
              } else if (responseData.download_link) {
                setDownloadLink(responseData.download_link);
                setVideoInfo({
                  title: responseData.video_title || 'Unknown Title',
                  duration: responseData.video_duration || 'Unknown',
                  quality: 'MP3',
                  filesize: responseData.file_size || 'Unknown'
                });
              } else {
                setError('Conversion failed. The API did not return a download link.');
              }
            } else {
              setError(`API Error: ${this.status} - ${responseData.message || 'Unknown error'}`);
            }
          } catch (error) {
            setError('Failed to parse API response. Please try again.');
            console.error('Parse error:', error);
          }
          resolve();
        }
      });

      xhr.addEventListener('error', function() {
        setError('Network error occurred. Please check your connection and try again.');
        resolve();
      });

      xhr.addEventListener('timeout', function() {
        setError('Request timeout. Please try again.');
        resolve();
      });

      const encodedUrl = encodeURIComponent(videoUrl);
      xhr.open('GET', `https://youtube-to-mp3-converter-100-free.p.rapidapi.com/apifree.php?yt=${encodedUrl}`);
      xhr.setRequestHeader('x-rapidapi-key', '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc');
      xhr.setRequestHeader('x-rapidapi-host', 'youtube-to-mp3-converter-100-free.p.rapidapi.com');
      xhr.timeout = 30000; // 30 second timeout

      xhr.send(null);
    });
  };

  return (
    <div>
      <div className="converter-container">
        <h1>YouTube to MP3 Converter</h1>
        <p>Convert YouTube videos to MP3 audio files quickly and easily</p>
        
        <div className="input-group">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
            className="url-input"
          />
          <button
            onClick={convertToMp3}
            disabled={!videoUrl || loading}
            className="convert-button"
          >
            {loading ? 'Converting...' : 'Convert to MP3'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {videoInfo && (
          <div className="video-info">
            <h3>Video Information:</h3>
            <p><strong>Title:</strong> {videoInfo.title}</p>
            <p><strong>Duration:</strong> {videoInfo.duration}</p>
            <p><strong>Quality:</strong> {videoInfo.quality}</p>
            <p><strong>File Size:</strong> {videoInfo.filesize}</p>
          </div>
        )}

        {downloadLink && (
          <div className="download-section">
            <p>✅ Your MP3 is ready for download!</p>
            <a
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="download-button"
              download
            >
              📥 Download MP3
            </a>
          </div>
        )}

        <div className="instructions">
          <h3>How to use:</h3>
          <ol>
            <li>Copy a YouTube video URL</li>
            <li>Paste it in the input field above</li>
            <li>Click "Convert to MP3"</li>
            <li>Wait for the conversion to complete</li>
            <li>Download your MP3 file</li>
          </ol>
          <p><strong>Supported formats:</strong> Full YouTube URLs, shortened youtu.be links</p>
        </div>
      </div>

      <AdBanner728x90 />
    </div>
  );
}

export default App;