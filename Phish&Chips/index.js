const { checkURLRules } = require('./rules/urlRules');
const { checkHeaderRules } = require('./rules/headerRules');
const { checkSSLRules } = require('./rules/sslRules');
const { checkVulnerabilityRules } = require('./rules/vulnRules');
const { getGradeFromScore } = require('./utils/gradeUtil');

async function analyzeURL(targetUrl) {
  console.log(`\n[사이트 분석 시작] ${targetUrl}\n`);

  const results = {
    details: {}
  };

  // 1. URL 룰 검사
  const urlResult = await checkURLRules(targetUrl);
  results.details.url = {
    score: urlResult.score,
    grade: getGradeFromScore(urlResult.score),
    messages: urlResult.messages
  };

  // 2. Header 룰 검사
  const headerResult = await checkHeaderRules(targetUrl);
  results.details.header = {
    score: headerResult.score,
    grade: getGradeFromScore(headerResult.score),
    messages: headerResult.messages
  };

  // 3. SSL 룰 검사
  const sslResult = await checkSSLRules(targetUrl);
  results.details.ssl = {
    score: sslResult.score,
    grade: getGradeFromScore(sslResult.score),
    messages: sslResult.messages
  };

  // 4. 취약점 검사
  const vulnResult = await checkVulnerabilityRules(targetUrl);
  results.details.vulnerability = {
    score: vulnResult.score,
    grade: getGradeFromScore(vulnResult.score),
    messages: vulnResult.messages
  };

  // 5. 총점 계산
  const totalScore = Object.values(results.details).reduce(
    (sum, section) => sum + section.score,
    0
  );
  results.totalScore = totalScore;
  results.overallGrade = getGradeFromScore(totalScore);

  // 추가) 콘솔 출력
  //console.log('📝 [분석 결과 리포트]');
  //console.log(JSON.stringify(results, null, 2));
}

const testURL = process.argv[2];
if (!testURL) {
  console.error('❗ URL 인자를 넣어주세요: node index.js https://example.com');
  process.exit(1);
}
analyzeURL(testURL);
