// 가중치 일관화 위한 파일

module.exports = {
    // header
    csp: 20,
    xFrameOptions: 15,
    hsts: 15,
    contentTypeOptions: 10,
    corsWildcard: 10,
  
    // ssl
    sslExpired: 30,
    sslExpirySoon: 10,
    sslUntrustedCA: 15,
    sslAnalysisFail: 50,
  
    // url
    urlHttpUsage: 5,
    urlSensitivePath: 3,
    urlInjectionPattern: 7,
  
    // vuln
    vulnXSS: 2,
    vulnClickjacking: 2,
    vulnFileUpload: 2,
    vulnDirListing: 2
  };
  