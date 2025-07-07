// Test the YouTube converter
import YouTubeConverter from './youtube-converter.js';

const converter = new YouTubeConverter();

async function testConverter() {
  console.log('🧪 Testing YouTube Converter...\n');

  const testUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Roll
    'https://youtu.be/dQw4w9WgXcQ', // Short URL
    'dQw4w9WgXcQ' // Just ID
  ];

  for (const url of testUrls) {
    console.log(`📹 Testing: ${url}`);
    console.log('─'.repeat(50));

    // Get video info
    const infoResult = await converter.getVideoInfo(url);
    if (infoResult.success) {
      console.log(`📄 Title: ${infoResult.data.title}`);
      console.log(`👤 Author: ${infoResult.data.author}`);
    }

    // Convert to MP3
    const convertResult = await converter.convert(url);
    if (convertResult.success) {
      console.log('✅ Conversion successful!');
      console.log(`🔗 Download URL: ${convertResult.data.downloadUrl}`);
      console.log(`🛠️  Service: ${convertResult.data.service}`);
      if (convertResult.data.note) {
        console.log(`📝 Note: ${convertResult.data.note}`);
      }
    } else {
      console.log('❌ Conversion failed');
      console.log(`🚫 Error: ${convertResult.error}`);
    }

    console.log('\n');
    
    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

testConverter().catch(console.error);