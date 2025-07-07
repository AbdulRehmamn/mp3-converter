// Test script using your API subscription
import axios from 'axios';

console.log('🧪 Testing your API subscription...\n');

// Test 1: Your exact axios implementation
async function testAxiosImplementation() {
  console.log('📡 Test 1: Axios Implementation');
  console.log('─'.repeat(40));
  
  const options = {
    method: 'GET',
    url: 'https://youtube-mp36.p.rapidapi.com/dl',
    params: {id: 'UxxajLWwzqY'},
    headers: {
      'x-rapidapi-key': 'f1cfc6624amshc1f7a8bfd6d6077p1623c3jsn944853391dde',
      'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
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

    xhr.open('GET', 'https://youtube-mp36.p.rapidapi.com/dl?id=UxxajLWwzqY');
    xhr.setRequestHeader('x-rapidapi-key', 'f1cfc6624amshc1f7a8bfd6d6077p1623c3jsn944853391dde');
    xhr.setRequestHeader('x-rapidapi-host', 'youtube-mp36.p.rapidapi.com');

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
    const result = await api.convertToMP3('UxxajLWwzqY');
    
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

// Run all tests
async function runAllTests() {
  const results = [];
  
  results.push(await testAxiosImplementation());
  results.push(await testXHRImplementation());
  results.push(await testAPIClass());
  
  console.log('\n📊 Test Results Summary');
  console.log('═'.repeat(40));
  console.log(`Axios Test: ${results[0] ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`XHR Test: ${results[1] ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`API Class Test: ${results[2] ? '✅ PASSED' : '❌ FAILED'}`);
  
  const passedTests = results.filter(r => r).length;
  console.log(`\n🎯 Overall: ${passedTests}/3 tests passed`);
  
  if (passedTests === 3) {
    console.log('🎉 All tests passed! Your API is working perfectly.');
  } else {
    console.log('⚠️  Some tests failed. Check the error messages above.');
  }
}

runAllTests().catch(console.error);