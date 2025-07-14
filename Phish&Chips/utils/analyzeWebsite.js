const parseURL = require('./parseURL');
const getHTTPHeaders = require('./getHTTPheaders');
const getSSLCertInfo = require('./getSSLCertInfo');

// 세 가지 기능을 통합하여 사이트 보안 분석을 수행
async function analyzeWebsite(url) {
  const parsed = parseURL(url);
  if (parsed.error) return { error: 'Invalid URL' };

  const hostname = parsed.hostname;

  const [headers, cert] = await Promise.all([
    getHTTPHeaders(url),
    getSSLCertInfo(hostname)
  ]);

  let score = 100;
  let reasons = [];

  if (cert.error) {
    score -= 40;
    reasons.push('SSL 인증서 확인 불가');
  } else {
    const today = new Date();
    const validTo = new Date(cert.validTo);
    if (validTo < today) {
      score -= 30;
      reasons.push('SSL 인증서 만료');
    }
  }

  if (headers.headers) {
    if (!headers.headers['strict-transport-security']) {
      score -= 10;
      reasons.push('HSTS 미설정');
    }
    if (!headers.headers['x-content-type-options']) {
      score -= 5;
      reasons.push('X-Content-Type-Options 미설정');
    }
  }

  return {
    url,
    score,
    reasons,
    ssl: cert,
    headers: headers.headers || null,
  };
}

module.exports = analyzeWebsite;
