// HTTP 헤더 관련 룰
const {fetchHeaders} = require('../utils/fetchUtil');
//const axios = require('axios');

async function checkHeaderRules(url){
    console.log('[HTTP 헤더 기반 룰]\n');
    try {
        const res = await fetchHeaders(url);
        if (!res) return;
        const headers = res.headers;

        // CSP (Content-Security-Policy): XSS, 인라인 스크립트 방지
        if(!headers['const-security-policy']){
            console.warn('⚠️ CSP 헤더 없음');
        }
        
        // X-Frame-Options: 클릭재킹 방지
        if(!headers['x-frame-options']){
            console.warn('⚠️ X-Frame-Options 헤더 없음');
        }

        // Strict-Transport-Security: HTTPS 접속 강제
        if(!headers['strict-transport-security']){
            console.warn('⚠️ HSTS 미설정');
        }

        // X-Content-Type-Options: 콘텐츠 타입 스니핑 방지
        if (!headers['x-content-type-options'] || headers['x-content-type-options'] !== 'nosniff') {
            console.warn('⚠️ X-Content-Type-Options 설정 미흡');
          }

        // CORS 설정 검사
        if(!headers['access-control-allow-origin'] === '*'){
            console.warn('⚠️ CORS 정책이 모든 출처 허용 중임');
        }
    } catch(err){
        console.error('HTTP 요청 실패:', err.message);
    }
}

module.exports = { checkHeaderRules };