// SSL 인증서 관련 룰
const { getSSLCertificate } = require('../utils/fetchUtil');
const ruleWeights = require('../config/ruleWeights'); // 점수 가중치 가져오기

async function checkSSLRules(url){
    console.log('[SSL 인증서 룰 검사]');

    const hostname = new URL(url).hostname;
    let score = 0;
    let details = [];

    try {
        const cert = await getSSLCertificate(hostname);

        if (!cert) throw new Error('인증서 없음');

        // 유효기간 검사
        const now = new Date();
        const expiry = new Date(cert.valid_to);
        const daysLeft = Math.ceil((expiry - now)/ (1000*60*60*24));

        if (daysLeft < 0) {
            console.warn(`❌ 인증서 만료됨 (${cert.valid_to})`);
            score += ruleWeights.sslExpired;
            details.push({ issue: '인증서 만료', severity: 3 });
        } else if (daysLeft < 30) {
            console.warn(`⚠️ 인증서 만료까지 ${daysLeft}일 남음`);
            score += ruleWeights.sslExpirySoon;
            details.push({ issue: `만료 임박 (${daysLeft}일 남음)`, severity: 1 });
        }

        // 발급자 확인
        const issuerName = cert.issuer?.O || '알 수 없음';
        const trustedIssuers = ["Let's Encrypt", "DigiCert", "Google Trust Services", "Amazon"];

        const isTrusted = trustedIssuers.some((issuer) =>
            issuerName.toLowerCase().includes(issuer.toLowerCase())
        );

        if (!isTrusted) {
            console.warn(`⚠️ 비신뢰 발급자: ${issuerName}`);
            score += ruleWeights.sslUntrustedCA;
            details.push({ issue: `비신뢰 발급자 (${issuerName})`, severity: 2 });
        }

    } catch(err){
        console.error('❌ SSL 인증서 분석 실패:', err.message);
        score += ruleWeights.sslAnalysisFail;
        details.push({ issue: 'SSL 인증서 분석 실패', severity: 3 });
    }

    let grade = '';
    if(score >= 50) grade = '위험';
    else if(score >= 20) grade = '주의';
    else grade = '양호';

    console.log(`➡️ SSL 위험 점수: ${score}점 (${grade})`);
    return { score, grade, details };
}

module.exports = { checkSSLRules };