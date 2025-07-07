import { useState } from 'react';
import './App.css';
import axios from 'axios';
import AdBanner728x90 from './Components/AdBanner728x90';

export default function App() {
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

    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: { id: videoId },
      headers: {
        'x-rapidapi-key': 'f1cfc6624amshc1f7a8bfd6d6077p1623c3jsn944853391dde',
        'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      
      if (response.data.status === 'ok') {
        setDownloadLink(response.data.link);
        setVideoInfo({
          title: response.data.title || 'Unknown Title',
          duration: response.data.duration || 'Unknown',
          progress: response.data.progress || 100,
          status: response.data.status
        });
      } else {
        setError('Conversion failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
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
            placeholder="Enter YouTube URL or Video ID"
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
            <p><strong>Status:</strong> {videoInfo.status}</p>
            <p><strong>Progress:</strong> {videoInfo.progress}%</p>
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