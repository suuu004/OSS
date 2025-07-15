# OSS


✅ 1. Node.js 설치 확인
bash
복사
편집
node -v
npm -v
만약 설치되어 있지 않다면 → Node.js 공식 사이트에서 설치

✅ 2. 프로젝트 구조 만들기
터미널이나 VS Code에서 원하는 폴더로 이동 후:

bash
복사
편집
mkdir security-checker
cd security-checker
npm init -y
✅ 3. 필요한 패키지 설치
bash
복사
편집
npm install axios ssl-certificate
✅ 4. 디렉토리 및 파일 생성
📁 디렉토리 만들기
bash
복사
편집
mkdir rules utils
📝 파일 생성
bash
복사
편집
touch index.js
touch rules/urlRules.js
touch rules/headerRules.js
touch rules/sslRules.js
touch utils/fetchUtil.js
✅ 5. 각 파일에 코드 복사해서 붙여넣기
위에 제공한 코드를 각 파일에 정확히 붙여넣어 주세요:

index.js: 실행 메인

rules/urlRules.js: URL 룰

rules/headerRules.js: 헤더 룰

rules/sslRules.js: SSL 룰

utils/fetchUtil.js: 공통 유틸

✅ 6. index.js에 테스트 URL 추가
js
복사
편집
const testURL = 'https://example.com';  // ← 원하는 사이트로 바꿔도 됨
✅ 7. 실행
bash
복사
편집
node index.js
