# YouTube to MP3 API Troubleshooting Guide

## Common Issues and Solutions

### 1. "Conversion Failed" Error

**Possible Causes:**
- Video is age-restricted or private
- Video has been removed or is unavailable
- API rate limits exceeded
- Invalid video ID format

**Solutions:**
- Try a different, publicly available video
- Check if the video URL is correct and accessible
- Wait a few minutes before trying again (rate limiting)
- Ensure the video ID is exactly 11 characters

### 2. API Key Issues

**Symptoms:**
- 401 Unauthorized errors
- "Invalid API key" messages

**Solutions:**
- Verify your RapidAPI subscription is active
- Check if you've exceeded your API quota
- Ensure the API key is correctly set in the environment

### 3. Network/Timeout Issues

**Symptoms:**
- Request timeout errors
- Connection refused errors

**Solutions:**
- Check your internet connection
- Try again after a few minutes
- The API service might be temporarily down

### 4. Video Restrictions

**Common Restricted Content:**
- Music videos from major labels
- Copyrighted content
- Age-restricted videos
- Private or unlisted videos

**Workarounds:**
- Try educational or creative commons content
- Use videos that are known to work with downloaders
- Test with shorter videos first

## Testing Videos

Here are some video IDs that typically work well for testing:

```
jNQXAC9IVRw - Popular music video
9bZkp7q19f0 - Educational content  
kJQP7kiw5Fk - Creative commons
```

## API Response Codes

- `200` - Success
- `400` - Bad request (invalid URL/ID)
- `401` - Unauthorized (API key issue)
- `429` - Too many requests (rate limited)
- `500` - Server error

## Debug Mode

To enable detailed logging, set the environment variable:
```bash
DEBUG=true node api/demo.js
```

## Alternative Solutions

If the primary API continues to fail:

1. **Check RapidAPI Status**: Visit the API page on RapidAPI
2. **Try Different Endpoints**: The code includes fallback APIs
3. **Update Dependencies**: Ensure axios and other packages are up to date
4. **Contact Support**: Reach out to the API provider

## Rate Limiting Best Practices

- Add delays between requests (3-5 seconds)
- Implement exponential backoff for retries
- Cache successful results to avoid repeated requests
- Monitor your API usage on RapidAPI dashboard