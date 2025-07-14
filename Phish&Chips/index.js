const analyzeWebsite = require('./utils/analyzeWebsite');

const targetUrl = 'https://example.com';

analyzeWebsite(targetUrl).then((result) => {
  console.log('\n🔍 분석 결과:\n', result);
});
