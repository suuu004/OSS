const sslChecker = require('ssl-checker');
const { URL } = require('url');
const ruleWeights = require('../config/ruleWeights');

async function checkSSLRules(rawUrl) {
  console.log('[SSL 인증서 검사]');
  
  let score = 0;
  const messages = [];

  try {
    const hostname = new URL(rawUrl).hostname;
    const cert = await sslChecker(hostname);

    // cert 구조 예시
    // {
    //   valid: true,
    //   validFrom: 'Aug 1 00:00:00 2023 GMT',
    //   validTo: 'Nov 1 23:59:59 2025 GMT',
    //   daysRemaining: 456,
    //   issuer: 'Let's Encrypt',
    //   subject: 'example.com'
    // }

    if (!cert.valid) {
      messages.push(`❌ 인증서가 유효하지 않음 (만료일: ${cert.validTo})`);
      score += ruleWeights.SSL_EXPIRED || 30;
    } else if (cert.daysRemaining < 30) {
      messages.push(`⚠️ 인증서 만료 임박 (${cert.daysRemaining}일 남음)`);
      score += ruleWeights.SSL_EXPIRING_SOON || 10;
    }

    // 신뢰할 수 있는 발급자인지 확인
    const trustedIssuers = ["Let's Encrypt", "DigiCert", "Google Trust Services", "Amazon"];
    const isTrusted = trustedIssuers.some(issuer =>
      cert.issuer.toLowerCase().includes(issuer.toLowerCase())
    );

    if (!isTrusted) {
      messages.push(`⚠️ 비신뢰 발급자: ${cert.issuer}`);
      score += ruleWeights.SSL_UNTRUSTED_ISSUER || 15;
    }

  } catch (error) {
    messages.push(`❌ SSL 인증서 검사 실패: ${error.message}\n`);
    score += ruleWeights.SSL_CHECK_FAIL || 50;
  }

  // 등급 판단
  let grade = '';
  if (score >= 50) grade = '위험';
  else if (score >= 20) grade = '주의';
  else grade = '양호';

  console.log(`➡️ SSL 점수: ${score}점 (${grade})\n`);
  messages.forEach(msg => console.log(msg));

  return { score, grade, messages };
}

module.exports = { checkSSLRules };
