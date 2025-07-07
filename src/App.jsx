import { useState } from 'react';
import './App.css';
import axios from 'axios';
import AdBanner728x90 from './Components/AdBanner728x90'; // adjust path if needed

function App() {
  const [videoId, setVideoId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
  };

  const convertToMp3 = async () => {
    setLoading(true);
    setError(null);
    setDownloadLink(null);

    const id = extractVideoId(videoId);

    const options = {
      method: 'GET',
      url: 'https://youtube-mp3-2025.p.rapidapi.com/v1/social/youtube/audio',
      params: { 
        id,
        ext: 'm4a',
        quality: '128kbps'
      },
      headers: {
        'x-rapidapi-key': '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc',
        'x-rapidapi-host': 'youtube-mp3-2025.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      if (response.data && response.data.download_url) {
        setDownloadLink(response.data.download_url);
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
        <div className="input-group">
          <input
            type="text"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            placeholder="Enter YouTube URL or Video ID"
            className="url-input"
          />
          <button
            onClick={convertToMp3}
            disabled={!videoId || loading}
            className="convert-button"
          >
            {loading ? 'Converting...' : 'Convert to MP3'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {downloadLink && (
          <div className="download-section">
            <p>Your MP3 is ready!</p>
            <a
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="download-button"
            >
              Download MP3
            </a>
          </div>
        )}
      </div>

      {/* Ad banner at the bottom */}
      <AdBanner728x90 />
    </div>
  );
}

export default App;