// SSL 인증서 관련 룰
const { getSSLCertificate } = require('../utils/fetchUtil');
//const sslCertificate = require('../utils/fetchUtil');

async function checkSSLRules(url){
    console.log('[SSL 인증서 룰 검사]');
    const hostname = new URL(url).hostname;

    try{
        const cert = await getSSLCertificate.get(hostname);
        
        // 유효기간 검사
        const now = new Date();
        const expiry = new Date(cert.valid_to);
        const daysLeft = Math.ceil((expiry - now)/ (1000*60*60*24));

        if (daysLeft < 0) {
            console.warn(`❌ 인증서 만료됨 (${cert.valid_to})`);
          } else if (daysLeft < 30) {
            console.warn(`⚠️ 인증서 만료까지 ${daysLeft}일 남음`);
          }

        // 발급자 확인 (일반적으로 많이 쓰는 기관만 허용)
        const issuerName = cert.issuer?.O || '알 수 없음';
        const trustedIssuers = ["Let's Encrypt", "DigiCert", "Google Trust Services", "Amazon"];

        const isTrusted = trustedIssuers.some((issuer) =>
            issuerName.toLowerCase().includes(issuer.toLowerCase())
        );

        if (!isTrusted) {
            console.warn(`⚠️ 잘 알려지지 않은 인증서 발급자: ${issuerName}`);
        }
          
    } catch(err){
        console.error('SSL 인증서 분석 실패:',err.message);
    }
}

module.exports = { checkSSLRules };