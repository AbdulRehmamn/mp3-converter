import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [videoId, setVideoId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [downloadLink, setDownloadLink] = useState(null)

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : url
  }

  const convertToMp3 = async () => {
    setLoading(true)
    setError(null)
    setDownloadLink(null)

    const id = extractVideoId(videoId)

    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: { id },
      headers: {
        'x-rapidapi-key': '65560d6fd6msha21d1fb7df6c45cp165b1djsn3b50ced25f83',
        'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
      }
    }

    try {
      const response = await axios.request(options)
      if (response.data.status === 'ok') {
        setDownloadLink(response.data.link)
      } else {
        setError('Conversion failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
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
  )
}

export default App