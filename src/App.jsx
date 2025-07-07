import { useState } from 'react';
import './App.css';
import AdBanner728x90 from './Components/AdBanner728x90';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
  };

  const convertToMp3 = async () => {
    setLoading(true);
    setError(null);
    setDownloadLink(null);
    setVideoInfo(null);

    const videoId = extractVideoId(videoUrl);

    try {
      // Using a working YouTube to MP3 API
      const response = await fetch(`https://youtube-mp3-download1.p.rapidapi.com/dl?id=${videoId}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'demo-key', // Using demo for now
          'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'ok' && data.link) {
        setDownloadLink(data.link);
        setVideoInfo({
          title: data.title || 'Unknown Title',
          duration: data.duration || 'Unknown',
          filesize: data.filesize || 'Unknown'
        });
      } else {
        // Fallback to alternative method using yt-dlp style API
        const fallbackResponse = await fetch(`https://api.cobalt.tools/api/json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            url: `https://www.youtube.com/watch?v=${videoId}`,
            vCodec: 'h264',
            vQuality: '720',
            aFormat: 'mp3',
            isAudioOnly: true
          })
        });

        const fallbackData = await fallbackResponse.json();
        
        if (fallbackData.status === 'success' && fallbackData.url) {
          setDownloadLink(fallbackData.url);
          setVideoInfo({
            title: 'Converted Audio',
            duration: 'Unknown',
            filesize: 'Unknown'
          });
        } else {
          setError('Conversion failed. Please try with a different video or try again later.');
        }
      }
    } catch (err) {
      console.error('Conversion error:', err);
      setError('An error occurred during conversion. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
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
        </div>
      </div>

      <AdBanner728x90 />
    </div>
  );
}

export default App;