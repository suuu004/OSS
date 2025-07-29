const axios = require("axios");
const https = require("follow-redirects").https;
const url = require("url");

// 위험도 점수 분석 함수
async function analyzeURL(targetUrl) {
  let score = 0;
  const results = {
    XSS: false,
    Clickjacking: false,
    FileUploadExposure: false,
    DirectoryListing: false,
  };

  try {
    // 1. 메인 페이지 응답 받아오기
    const res = await axios.get(targetUrl, {
      maxRedirects: 5,
      validateStatus: null,
    });

    const headers = res.headers;
    const body = res.data;

    // [1] XSS - 응답 내 <script>, <img onerror>, javascript: 존재 여부
    const xssIndicators = ["<script", "onerror=", "javascript:"];
    if (xssIndicators.some(tag => body.toLowerCase().includes(tag))) {
      results.XSS = true;
      score += 2;
    }

    // [2] Clickjacking - X-Frame-Options 헤더가 없으면 위험
    if (!headers["x-frame-options"]) {
      results.Clickjacking = true;
      score += 2;
    }

    // [3] File Upload 취약점 - 업로드 관련 경로 존재 여부 확인
    const uploadPaths = ["/upload", "/uploads", "/file", "/files", "/images"];
    for (let path of uploadPaths) {
      const uploadUrl = new URL(path, targetUrl).href;
      try {
        const uploadRes = await axios.get(uploadUrl, { validateStatus: null });
        if (
          uploadRes.status === 200 &&
          uploadRes.headers["content-type"]?.includes("text/html")
        ) {
          results.FileUploadExposure = true;
          score += 2;
          break;
        }
      } catch {}
    }

    // [4] Directory Listing - 디렉토리 인덱스 노출 여부
    const dirPaths = ["/uploads/", "/files/", "/data/", "/images/"];
    for (let path of dirPaths) {
      const dirUrl = new URL(path, targetUrl).href;
      try {
        const dirRes = await axios.get(dirUrl, { validateStatus: null });
        if (
          dirRes.status === 200 &&
          /(Index of|Directory Listing|Parent Directory)/i.test(dirRes.data)
        ) {
          results.DirectoryListing = true;
          score += 2;
          break;
        }
      } catch {}
    }

    // 위험도 해석
    let riskLevel = "낮음";
    if (score >= 6) riskLevel = "높음";
    else if (score >= 3) riskLevel = "중간";

    // 결과 출력
    console.log(`\n🔍 [${targetUrl}] 보안 진단 결과`);
    console.log(`✔️ XSS 의심: ${results.XSS}`);
    console.log(`✔️ Clickjacking 가능성: ${results.Clickjacking}`);
    console.log(`✔️ 파일 업로드 취약 경로 존재: ${results.FileUploadExposure}`);
    console.log(`✔️ 디렉토리 리스팅 노출: ${results.DirectoryListing}`);
    console.log(`➡️ 위험도 점수: ${score}/8`);
    console.log(`⚠️ 최종 위험도: ${riskLevel}`);
  } catch (err) {
    console.error("❌ 요청 실패:", err.message);
  }
}

// 테스트 실행
const target = process.argv[2]; // node securityAnalyzer.js https://example.com
if (!target) {
  console.log("❗ URL을 인자로 입력해주세요. 예: node securityAnalyzer.js https://example.com");
} else {
  analyzeURL(target);
}
