// URL 관련 룰
const { URL } = require('url');

function checkURLRules(rawUrl){
    const url = new URL(rawUrl);

    console.log('[URL 기발 룰 검사]\n');

    // HTTPS 사용 여부
    if (url.protocol !== 'https:'){  
        console.warn('⚠️https 사용하지 않음')
    }

    // 민감 경로 키워드 사용 여부
    const sensitivePaths = ['admin','login','phpmyadmin','.git','config'];
    sensitivePaths.forEach((keyword) =>{
        if(url.pathname.includes(keyword)){
            console.warn('⚠️민감 경로 포함됨: ${keyword}');
        }
    });

    // 쿼리 파라미터에 위험한 패턴 사용 여부
    if(url.search.includes('=') && /('|--|<|>)/.test(url.search)){
        console.warn('⚠️URL 파라미터에 잠재적 인젝션 패턴 감지됨')
    }
}

module.exports = {checkURLRules};