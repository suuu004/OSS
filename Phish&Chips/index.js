const { checkURLRules } = require('./rules/urlRules');
const { checkHeaderRules } = require('./rules/headerRules');
const { checkSSLRules } = require('./rules/sslRules');

async function analyzeURL(targetUrl) {
  console.log(`🔍 URL 분석 시작: ${targetUrl}`);

  await checkURLRules(targetUrl);
  await checkHeaderRules(targetUrl);
  await checkSSLRules(targetUrl);
}

const testURL = 'http://example.com'; // 검사할 URL 입력
analyzeURL(testURL);
