# OSS

분류	파일명	분석 대상	목적	예시
구성 보안 점검	urlRules.js	URL 구조	민감 정보 노출 여부	/admin, ?q=<script>
sslRules.js	SSL 인증서	유효성, 신뢰도	만료일, 발급기관
headerRules.js	HTTP 헤더	보안 헤더 설정 여부	CSP, HSTS, X-Frame-Options 등
취약점 점검	vulnRules.js (신규)	실제 페이지 동작	공격이 가능한 구조인지 탐지	XSS 삽입 응답, iframe 허용, 디렉토리 노출 등


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
  
✅ 6. 실행
[bash]
- node index.js
