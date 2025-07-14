const sslCertificate = require('ssl-certificate');

// 도메인의 SSL 인증서 정보를 조회
async function getSSLCertInfo(hostname) {
  try {
    const cert = await sslCertificate.get(hostname);
    return {
      issuer: cert.issuer,
      validFrom: cert.valid_from,
      validTo: cert.valid_to,
    };
  } catch (error) {
    return { error: error.message };
  }
}

module.exports = getSSLCertInfo;
