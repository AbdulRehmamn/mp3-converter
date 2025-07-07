// Demo script to test the YouTube MP3 API
import YouTubeMP3API from './youtube-mp3.js';

const api = new YouTubeMP3API();

async function demonstrateAPI() {
  console.log('🎵 YouTube to MP3 API Demo\n');

  // Test with the video ID you provided
  const testUrls = [
    'UxxajLWwzqY', // Your test video ID
    'https://www.youtube.com/watch?v=UxxajLWwzqY', // Full URL
    'https://youtu.be/UxxajLWwzqY' // Short URL format
  ];

  for (const url of testUrls) {
    console.log(`\n📹 Testing URL: ${url}`);
    console.log('─'.repeat(50));

    // Extract video ID
    const videoId = api.extractVideoId(url);
    console.log(`📋 Extracted Video ID: ${videoId}`);

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
      console.log('🔍 Details:', result.details);
    }

    // Add delay between requests to be respectful to the API
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

// Test the exact implementation you provided
async function testYourImplementation() {
  console.log('\n🧪 Testing your exact implementation...\n');
  
  const options = {
    method: 'GET',
    url: 'https://youtube-mp36.p.rapidapi.com/dl',
    params: {id: 'UxxajLWwzqY'},
    headers: {
      'x-rapidapi-key': '65560d6fd6msha21d1fb7df6c45cp165b1djsn3b50ced25f83',
      'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log('✅ Direct API call successful!');
    console.log('Response data:', response.data);
  } catch (error) {
    console.log('❌ Direct API call failed');
    console.error(error);
  }
}

// Run both tests
async function runAllTests() {
  await testYourImplementation();
  await demonstrateAPI();
}

runAllTests().catch(console.error);