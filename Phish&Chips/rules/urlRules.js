// URL 관련 룰
const { URL } = require('url');
const ruleWeights = require('../config/ruleWeights'); // 점수 가중치 가져오기

function checkURLRules(rawUrl) {
    const url = new URL(rawUrl);

    console.log('[🔎 URL 기반 룰 검사]');
    let score = 0;
    const messages = [];

    // 1. HTTPS 사용 여부 (-5점)
    if (url.protocol !== 'https:') {
        messages.push('⚠️ HTTPS 사용하지 않음 (-5점)');
        score -= 5;
    }

    // 2. 민감 경로 키워드 사용 여부 (키워드당 -3점)
    const sensitivePaths = ['admin', 'login', 'phpmyadmin', '.git', 'config'];
    sensitivePaths.forEach((keyword) => {
        if (url.pathname.toLowerCase().includes(keyword)) {
            messages.push(`⚠️ 민감 경로 포함됨: ${keyword} (-3점)`);
            score -= 3;
        }
    });

    // 3. 쿼리 파라미터에 위험한 패턴 사용 여부 (-7점)
    if (url.search.includes('=') && /('|--|<|>)/.test(url.search)) {
        messages.push('⚠️ URL 파라미터에 잠재적 인젝션 패턴 감지됨 (-7점)');
        score -= 7;
    }

    // 최종 결과 출력
    console.log(messages.join('\n') || '✅ 이상 없음');
    console.log(`➡️ URL 위험 점수: ${score}\n`);

    return {
        score,
        messages,
    };
}

module.exports = { checkURLRules };
