# OSS


✅ 1. Node.js 설치 확인
bash
- node -v
- npm -v

만약 설치되어 있지 않다면 → Node.js 공식 사이트에서 설치

✅ 2. 프로젝트 구조 만들기
터미널이나 VS Code에서 원하는 폴더로 이동 후:

[bash]
- mkdir security-checker
- cd security-checker
- npm init -y
- 
✅ 3. 필요한 패키지 설치
[bash]
- npm install axios ssl-certificate

✅ 4. 파일

index.js: 실행 메인
rules/urlRules.js: URL 룰
rules/headerRules.js: 헤더 룰
rules/sslRules.js: SSL 룰
utils/fetchUtil.js: 공통 유틸

✅ 5. index.js에 테스트 URL 추가
[js]
- const testURL = 'https://example.com'; 
- 
✅ 6. 실행
[bash]
- node index.js
