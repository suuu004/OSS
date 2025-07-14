// URL을 분석해서 구성 요소를 반환하는 함수
function parseURL(inputUrl) {
    try {
      const url = new URL(inputUrl);
      return {
        href: url.href,
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || 'default',
        pathname: url.pathname,
        searchParams: Object.fromEntries(url.searchParams.entries()),
      };
    } catch (e) {
      return { error: 'Invalid URL' };
    }
  }
  
  module.exports = parseURL;
  