// Test script using the YouTube to MP3 Converter 100% Free API
import axios from 'axios';

console.log('🧪 Testing YouTube to MP3 Converter 100% Free API...\n');

// Test 1: Your exact axios implementation
async function testAxiosImplementation() {
  console.log('📡 Test 1: Axios Implementation');
  console.log('─'.repeat(40));
  
  const options = {
    method: 'GET',
    url: 'https://youtube-to-mp3-converter-100-free.p.rapidapi.com/apifree.php',
    params: {
      yt: 'https://www.youtube.com/watch?v=RpDz2umxPjA'
    },
    headers: {
      'x-rapidapi-key': '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc',
      'x-rapidapi-host': 'youtube-to-mp3-converter-100-free.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log('✅ Axios test successful!');
    console.log('Response:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Axios test failed');
    console.error('Error:', error.response?.data || error.message);
    return false;
  }
}

// Test 2: XMLHttpRequest implementation
async function testXHRImplementation() {
  console.log('\n📡 Test 2: XMLHttpRequest Implementation');
  console.log('─'.repeat(40));
  
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        try {
          const responseData = JSON.parse(this.responseText);
          console.log('✅ XHR test successful!');
          console.log('Response:', responseData);
          resolve(true);
        } catch (error) {
          console.log('❌ XHR test failed');
          console.error('Error:', error);
          resolve(false);
        }
      }
    });

    xhr.addEventListener('error', function() {
      console.log('❌ XHR test failed - Network error');
      resolve(false);
    });

    xhr.open('GET', 'https://youtube-to-mp3-converter-100-free.p.rapidapi.com/apifree.php?yt=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DRpDz2umxPjA');
    xhr.setRequestHeader('x-rapidapi-key', '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc');
    xhr.setRequestHeader('x-rapidapi-host', 'youtube-to-mp3-converter-100-free.p.rapidapi.com');

    xhr.send(null);
  });
}

// Test 3: API Class implementation
async function testAPIClass() {
  console.log('\n📡 Test 3: API Class Implementation');
  console.log('─'.repeat(40));
  
  const { default: YouTubeMP3API } = await import('./youtube-mp3.js');
  const api = new YouTubeMP3API();
  
  try {
    const result = await api.convertToMP3('https://www.youtube.com/watch?v=RpDz2umxPjA');
    
    if (result.success) {
      console.log('✅ API Class test successful!');
      console.log('Title:', result.data.title);
      console.log('Download Link:', result.data.link);
      console.log('Duration:', result.data.duration);
      return true;
    } else {
      console.log('❌ API Class test failed');
      console.log('Error:', result.error);
      return false;
    }
  } catch (error) {
    console.log('❌ API Class test failed');
    console.error('Error:', error);
    return false;
  }
}

// Test 4: Different video URLs
async function testDifferentUrls() {
  console.log('\n📡 Test 4: Different URL Formats');
  console.log('─'.repeat(40));
  
  const testUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=jNQXAC9IVRw'
  ];

  let passedTests = 0;
  
  for (const url of testUrls) {
    console.log(`\nTesting URL: ${url}`);
    
    const options = {
      method: 'GET',
      url: 'https://youtube-to-mp3-converter-100-free.p.rapidapi.com/apifree.php',
      params: { yt: url },
      headers: {
        'x-rapidapi-key': '359df03b12msh7db3fabbc8e8adfp14eef9jsn6273b5b4d5dc',
        'x-rapidapi-host': 'youtube-to-mp3-converter-100-free.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(`✅ Success for ${url}`);
      console.log('Title:', response.data.title || response.data.video_title || 'Unknown');
      passedTests++;
    } catch (error) {
      console.log(`❌ Failed for ${url}:`, error.message);
    }
    
    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  return passedTests > 0;
}

// Run all tests
async function runAllTests() {
  const results = [];
  
  results.push(await testAxiosImplementation());
  results.push(await testXHRImplementation());
  results.push(await testAPIClass());
  results.push(await testDifferentUrls());
  
  console.log('\n📊 Test Results Summary');
  console.log('═'.repeat(40));
  console.log(`Axios Test: ${results[0] ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`XHR Test: ${results[1] ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`API Class Test: ${results[2] ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`URL Format Test: ${results[3] ? '✅ PASSED' : '❌ FAILED'}`);
  
  const passedTests = results.filter(r => r).length;
  console.log(`\n🎯 Overall: ${passedTests}/4 tests passed`);
  
  if (passedTests === 4) {
    console.log('🎉 All tests passed! Your API is working perfectly.');
  } else if (passedTests > 0) {
    console.log('⚠️  Some tests passed. The API is partially working.');
  } else {
    console.log('❌ All tests failed. Check your API subscription and network connection.');
  }
}

runAllTests().catch(console.error);