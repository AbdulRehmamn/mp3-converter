// Simple test using your exact implementation
import axios from 'axios';

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
  console.log('🔄 Testing your exact API implementation...');
  const response = await axios.request(options);
  console.log('✅ Success! Response:');
  console.log(response.data);
} catch (error) {
  console.log('❌ Error occurred:');
  console.error(error);
}