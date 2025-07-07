# YouTube to MP3 Converter API

This is the extracted API functionality from your React YouTube to MP3 converter application.

## 🔧 API Structure

### Core Components

1. **YouTubeMP3API Class** (`youtube-mp3.js`)
   - Main API wrapper class
   - Handles video ID extraction
   - Manages API requests to RapidAPI service

2. **Express Server** (`express-server.js`)
   - RESTful API endpoints
   - CORS enabled
   - Error handling

3. **Demo Script** (`demo.js`)
   - Example usage
   - Testing different URL formats

## 📡 API Endpoints

### Base URL
```
http://localhost:3001
```

### Endpoints

#### GET /
- **Description**: API information and available endpoints
- **Response**: JSON with API details

#### GET /convert
- **Description**: Convert YouTube video to MP3
- **Parameters**: 
  - `url` (string): YouTube URL
  - `id` (string): YouTube video ID
- **Example**: 
  ```
  GET /convert?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ
  GET /convert?id=dQw4w9WgXcQ
  ```

#### POST /convert
- **Description**: Convert YouTube video to MP3 (POST method)
- **Body**: 
  ```json
  {
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }
  ```

#### GET /info
- **Description**: Get video information without converting
- **Parameters**: Same as `/convert`

## 🚀 Usage Examples

### Using the API Class Directly

```javascript
import YouTubeMP3API from './youtube-mp3.js';

const api = new YouTubeMP3API();

// Convert a video
const result = await api.convertToMP3('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

if (result.success) {
  console.log('Download link:', result.data.link);
  console.log('Title:', result.data.title);
} else {
  console.error('Error:', result.error);
}
```

### Using HTTP Requests

```javascript
// GET request
const response = await fetch('http://localhost:3001/convert?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ');
const data = await response.json();

// POST request
const response = await fetch('http://localhost:3001/convert', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  })
});
const data = await response.json();
```

### Using cURL

```bash
# GET request
curl "http://localhost:3001/convert?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ"

# POST request
curl -X POST http://localhost:3001/convert \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

## 📋 Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "title": "Video Title",
    "link": "https://download-link.com/file.mp3",
    "duration": "3:45",
    "progress": 100,
    "status": "ok"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details"
}
```

## 🔑 API Configuration

The API uses RapidAPI's YouTube MP3 service:
- **Service**: youtube-mp36.p.rapidapi.com
- **API Key**: Configured in the YouTubeMP3API class
- **Rate Limits**: Depends on your RapidAPI subscription

## 🛠️ Installation & Setup

1. Install dependencies:
   ```bash
   npm install axios express cors
   ```

2. Run the demo:
   ```bash
   node api/demo.js
   ```

3. Start the Express server:
   ```bash
   node api/express-server.js
   ```

## ⚠️ Important Notes

1. **API Key Security**: The API key is currently hardcoded. In production, use environment variables.
2. **Rate Limiting**: Be respectful to the API service and implement rate limiting.
3. **Error Handling**: Always check the `success` field in responses.
4. **CORS**: The Express server has CORS enabled for development.

## 🔒 Security Considerations

- Move API keys to environment variables
- Implement request validation
- Add rate limiting
- Use HTTPS in production
- Validate YouTube URLs before processing