const axios = require('axios');

// HTTP 응답 헤더를 가져오는 함수 (HEAD 요청)
async function getHTTPHeaders(url) {
  try {
    const response = await axios.head(url, {
      maxRedirects: 5,
      validateStatus: null
    });
    return {
      status: response.status,
      headers: response.headers,
    };
  } catch (error) {
    return { error: error.message };
  }
}

module.exports = getHTTPHeaders;
