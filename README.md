# OSS



✅ 1. Node.js 설치 확인
- node -v
- npm -v


+ axios 설치
- npm install axios


✅ 2. 프로젝트 구조 만들기
터미널이나 VS Code에서 원하는 폴더로 이동 후:
- mkdir security-checker
- cd security-checker
- npm init -y


✅ 3. 필요한 패키지 설치
- npm install axios ssl-certificate
=> 설치 불가 발생


+ SSL 인증서 조회를 위한 패키지
ssl-checker

-> SSL 만료일, 발급자 등 정보 확인 가능

설치:
- npm install ssl-checker

  
✅ 4. 파일

index.js: 실행 메인

rules/urlRules.js: URL 룰

rules/headerRules.js: 헤더 룰

rules/sslRules.js: SSL 룰

rules/vulnRules.js : 취약점 룰

utils/fetchUtil.js: 공통 유틸
  
✅ 5. 실행
- node index.js https://example.com
