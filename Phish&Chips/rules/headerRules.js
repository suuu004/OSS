// HTTP 헤더 관련 룰
const { fetchHeaders } = require('../utils/fetchUtil');

async function checkHeaderRules(url) {
    console.log('[HTTP 헤더 기반 룰]\n');

    let totalScore = 0; // 총 점수
    const MAX_SCORE = 10; // 총점 10점 만점으로 계산

    try {
        const res = await fetchHeaders(url);
        if (!res) return;
        const headers = res.headers;

        // 1. CSP (Content-Security-Policy): XSS, 인라인 스크립트 방지
        if (!headers['content-security-policy']) {
            console.warn('⚠️ CSP 헤더 없음');
            totalScore += 30;
        }

        // 2. X-Frame-Options: 클릭재킹 방지
        if (!headers['x-frame-options']) {
            console.warn('⚠️ X-Frame-Options 헤더 없음');
            totalScore += 20;
        }

        // 3. Strict-Transport-Security: HTTPS 접속 강제
        if (!headers['strict-transport-security']) {
            console.warn('⚠️ HSTS 미설정');
            totalScore += 20;
        }

        // 4. X-Content-Type-Options: 콘텐츠 타입 스니핑 방지
        if (!headers['x-content-type-options'] || headers['x-content-type-options'].toLowerCase() !== 'nosniff') {
            console.warn('⚠️ X-Content-Type-Options 설정 미흡');
            totalScore += 10;
        }

        // 5. CORS 설정 검사
        if (headers['access-control-allow-origin'] === '*') {
            console.warn('⚠️ CORS 정책이 모든 출처 허용 중임');
            totalScore += 10;
        }

        // 결과 출력
        console.log(`\n총 감점: ${totalScore}점 / ${MAX_SCORE}점`);

        if (totalScore === 0) {
            console.log('✅ 보안 설정 양호 (안전)');
        } else if (totalScore <= 4) {
            console.log('🟡 일부 취약점 존재 (주의)');
        } else {
            console.log('🔴 보안 위험 높음 (위험)');
        }

    } catch (err) {
        console.error('HTTP 요청 실패:', err.message);
    }
}

module.exports = { checkHeaderRules };
