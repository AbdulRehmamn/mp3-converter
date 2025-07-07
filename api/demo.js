// Demo script to test the YouTube MP3 API
import YouTubeMP3API from './youtube-mp3.js';

const api = new YouTubeMP3API();

async function demonstrateAPI() {
  console.log('🎵 YouTube to MP3 API Demo\n');

  // Example YouTube URLs to test
  const testUrls = [
    'https://www.youtube.com/watch?v=jNQXAC9IVRw', // Popular music video
    'jNQXAC9IVRw', // Just the video ID
    'https://youtu.be/jNQXAC9IVRw', // Short URL format
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // Rick Roll (might be restricted)
  ];

  for (const url of testUrls) {
    console.log(`\n📹 Testing URL: ${url}`);
    console.log('─'.repeat(50));

    // Extract video ID
    const videoId = api.extractVideoId(url);
    console.log(`📋 Extracted Video ID: ${videoId}`);
    
    // Validate video ID
    if (!api.isValidVideoId(videoId)) {
      console.log('❌ Invalid video ID format');
      continue;
    }

    // Convert to MP3
    console.log('🔄 Converting to MP3...');
    const result = await api.convertToMP3(url);

    if (result.success) {
      console.log('✅ Conversion successful!');
      console.log(`📄 Title: ${result.data.title || 'N/A'}`);
      console.log(`⏱️  Duration: ${result.data.duration || 'N/A'}`);
      console.log(`📥 Download Link: ${result.data.link}`);
      console.log(`📊 Status: ${result.data.status}`);
    } else {
      console.log('❌ Conversion failed');
      console.log(`🚫 Error: ${result.error}`);
      if (result.details) {
        console.log('🔍 Details:', result.details);
      }
    }

    // Add delay between requests to be respectful to the API
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

// Run the demo
demonstrateAPI().catch(console.error);