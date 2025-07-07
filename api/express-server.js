// Express.js server wrapper for the YouTube MP3 API
import express from 'express';
import cors from 'cors';
import YouTubeMP3API from './youtube-mp3.js';

const app = express();
const port = process.env.PORT || 3001;
const api = new YouTubeMP3API();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'YouTube to MP3 Converter API',
    version: '1.0.0',
    endpoints: {
      'GET /convert': 'Convert YouTube video to MP3',
      'GET /info': 'Get video information',
      'POST /convert': 'Convert with POST request'
    }
  });
});

// GET endpoint for conversion
app.get('/convert', async (req, res) => {
  const { url, id } = req.query;
  
  if (!url && !id) {
    return res.status(400).json({
      success: false,
      error: 'Please provide either "url" or "id" parameter',
      example: '/convert?url=https://www.youtube.com/watch?v=VIDEO_ID'
    });
  }

  try {
    const videoUrl = url || id;
    console.log(`Processing conversion request for: ${videoUrl}`);
    const result = await api.convertToMP3(videoUrl);
    
    if (result.success) {
      console.log('✅ Conversion successful');
      res.json(result);
    } else {
      console.log('❌ Conversion failed:', result.error);
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});

// POST endpoint for conversion
app.post('/convert', async (req, res) => {
  const { url, id } = req.body;
  
  if (!url && !id) {
    return res.status(400).json({
      success: false,
      error: 'Please provide either "url" or "id" in request body'
    });
  }

  try {
    const videoUrl = url || id;
    console.log(`Processing POST conversion request for: ${videoUrl}`);
    const result = await api.convertToMP3(videoUrl);
    
    if (result.success) {
      console.log('✅ POST Conversion successful');
      res.json(result);
    } else {
      console.log('❌ POST Conversion failed:', result.error);
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('POST Server error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});

// Get video info endpoint
app.get('/info', async (req, res) => {
  const { url, id } = req.query;
  
  if (!url && !id) {
    return res.status(400).json({
      success: false,
      error: 'Please provide either "url" or "id" parameter'
    });
  }

  try {
    const videoUrl = url || id;
    const result = await api.getVideoInfo(videoUrl);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    details: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(port, () => {
  console.log(`🚀 YouTube MP3 API server running on port ${port}`);
  console.log(`📖 API Documentation: http://localhost:${port}`);
});

export default app;