const allProjects = [
    {
      title: "[SOSOP] 소상공인 경쟁력 평가 리포트 자동화 시스템",
      tech: "FastAPI, Celery, PostgreSQL, Redis, python-pptx, Chromium, HTMX, OpenAI·Gemini·Ollama, Docker Compose",
      desc: "설문 파일 한 장 → HTML·PDF·PPTX 리포트 자동 생성. Windows 전용 레거시 도구를 웹 시스템으로 재구축",
      image: "/videos/sosop/poster.jpg",
      video: {
        src: "https://ai.marketlink.co.kr/portfolio/sosop-intro.mp4",
        poster: "/videos/sosop/poster.jpg",
        captions: "/videos/sosop/sosop-intro.ko.vtt",
      },
      link: "https://ai.marketlink.co.kr/sosop",
      longDesc: `
        **핵심 역할:** 기획 · 설계 · 개발 · 배포 100% 단독 수행
        **배경:** Tkinter + PowerPoint COM 기반 Windows 전용 도구 → 이식 불가 문제를 웹 시스템 재구축으로 해결
        **파이프라인:** 6단계 (집계 → 정제 → 인사이트 → PPT→PDF ∥ HTML), 단계별 엑셀 시트 누적, 실패 단계부터 재시도
        **LLM 폴백 체인:** OpenAI → Gemini → Ollama(EXAONE 3.5 32B), 마지막 성공 모델만 기록
        **산출물:** 하나의 HTML 덱에서 HTML · PDF · PPTX 동시 생성 (PPTX 편집 가능, PDF 자체 점검), 로그인 없는 공유 링크 발급
        **수치 조정:** 문항별 응답 건수 조정 시 Top3 비율 · 등급 즉시 재계산, 원본 응답은 보존
        **배포 · 운영:** Docker Compose 5개 서비스 (web · worker 동일 이미지), 관리자 로그인 + OTP, Google Drive 동기화
      `,
      category: 'AI',
    },
    {
      title: "AI 패널 설문 에이전트 (LV10)",
      tech: "Node.js, Express 5, TypeScript, Playwright + CDP, React 19, Vite 8, MySQL, Gemini·OpenAI·EXAONE",
      desc: "한국어 페르소나 LLM이 브라우저를 직접 조종해 웹 설문을 자동 응답. 목표 완주율 80% 이상",
      image: "/images/prjLV10_SurveyAgent.jpg",
      link: "https://ai.marketlink.co.kr/PROJECT_DOSSIER.html",
      linkLabel: "시스템 도시에 보기 ↗",
      longDesc: `
        **핵심 역할:** 기획 · 설계 · 개발 100% 단독 수행
        **개요:** Nemotron 한국어 패널 페르소나를 탑재한 LLM이 Playwright(CDP)로 설문을 읽고 · 판단하고 · 마킹하는 자동응답 시스템
        **실행 사이클:** URL 접수 → 쿼터 인지 페르소나 배정 → DOM/AX 파싱 → 질문 유형 감지 → LLM 추론 → 응답 실행 → 제출 → 완료/스크린아웃 판정 (8단계 루프)
        **핵심 역량:** 6대 스크린아웃 생존 필라 (SPA-safe 데드락 감지, 스크리너 구간 안전 응답 등), SSE/WebSocket 실시간 관제 대시보드
        **엔지니어링:** 백엔드 서비스 모듈 28+, server.ts 6,212 → 277 라인 리팩터링, vitest 23 스위트 · 179 케이스
        **LLM:** Gemini · OpenAI · 로컬 EXAONE 3계열 추론 엔진 선택
      `,
      category: 'AI',
    },
    {
      title: "[SnapShorts] OpenShorts AI 숏폼 SaaS",
      tech: "FastAPI, Celery + Redis, PostgreSQL(RLS), faster-whisper, Gemini, Stripe·PortOne, NVIDIA DGX GPU",
      desc: "롱폼 영상 → 바이럴 숏폼 자동 생성 SaaS. 클립 1편 원가 약 21원, 클립 매출총이익률 88%",
      image: "/images/prjOpenShorts.jpg",
      link: "https://ai.marketlink.co.kr/shorts/",
      linkLabel: "아키텍처 · 사업 보고서 보기 ↗",
      longDesc: `
        **핵심 역할:** 기획 · 설계 · 개발 100% 단독 수행
        **기능:** AI 클립 생성기, 쿠팡 핫딜 쇼츠, AI 블로그 포스팅, 유튜브 스튜디오, UGC 가상 크리에이터 · 아바타 갤러리
        **아키텍처:** JWT 멀티테넌트 + PostgreSQL 행 단위 보안(RLS), Celery 분산 GPU 워커 (DGX 2노드), 로컬 GPU 우선 · 클라우드 폴백
        **마진 가드:** 작업 전 크레딧 차감 Lock, API 원가 대비 최소 35% 마진 보장 단가 연동
        **원가 혁신:** 클립 1편 $0.016(약 21.4원) → 판매 $0.15, 매출총이익률 88.5% · DGX 온프레미스로 원가 78% 절감 (설계 기준)
        **결제:** Stripe 정기결제 + PortOne/Toss 국내 간편결제
      `,
      category: 'AI',
    },
    {
      title: "Lotte웰푸드 EAV System",
      tech: "Python, MySQL 8 (EAV), SQLAlchemy, pandas, RapidFuzz, EasyOCR, Playwright, Google · Naver 검색 API, openpyxl",
      desc: "제과 · 제빵 18개 카테고리 507,658셀의 속성을 정제하고, 평균 신뢰도 0.875로 계약 기준(0.85)을 넘겼습니다.",
      image: "/images/prjLotteSKU.jpg",
      link: "https://ai.marketlink.co.kr/lotte/v2/dashboard.html",
      linkLabel: "QC 대시보드 보기",
      longDesc: `
        **핵심 역할:** 기획 · 설계 · 개발 · 운영 100% 단독 수행
        **규모:** 마스터 55,546행, 정제 대상 SKU 53,102행, 납품 SKU 44,836행, 18개 카테고리(스낵, 비스킷, 캔디, 젤리, 초코, 빵 등), 정제 셀 507,658개
        **정제 방식:** 결정론 규칙, 공공 DB(식약처 등), 이미지 OCR, 검색 · LLM 순서로 근거를 쌓고 셀마다 출처와 신뢰도를 기록합니다.
        **품질:** 신뢰도 0.85 이상인 AI 확정 73.9%(375,232셀), 나머지 26.1%는 사람 검수 큐로 보냅니다. 평균 신뢰도 0.875로 계약 기준 0.85를 충족합니다.
        **검수:** 검수자가 대시보드에서 바로 확정하거나 고치고, AI 확정분의 약 1.5%는 블라인드 표본으로 다시 검수합니다.
        **데이터 원칙:** 원본 원장과 이미지는 바꾸지 않고, 모든 결과를 근거 태그와 함께 따로 저장해 되돌릴 수 있습니다. 납품, 사내 검수, 참조 스키마를 분리했습니다.
        **운영:** 매일 정해진 시각에 MySQL 스냅샷으로 대시보드를 갱신하고 버전을 보존하며, 납품용 엑셀을 자동으로 만듭니다.
      `,
      category: 'Automation',
    },
    {
      title: "MARKETLINK-AX 온프레미스 AI 플랫폼 (NVIDIA DGX Spark ×2)",
      tech: "NVIDIA DGX Spark(GB10) ×2, Nginx, Let's Encrypt, Docker, Ollama LB, FastAPI · Next.js · Vite",
      desc: "DGX 2노드 클러스터 위에 26개 서비스 · 132개 엔드포인트를 단일 도메인으로 운영하는 사내 AI 플랫폼",
      image: "/images/prjDGXPlatform.jpg",
      longDesc: `
        **핵심 역할:** 클러스터 구축 · 게이트웨이 설계 · 서비스 개발 100% 단독 수행
        **인프라:** NVIDIA DGX Spark 2노드 (GB10, 128GB 통합 메모리), 단일 공개 도메인 HTTPS 게이트웨이 (Let's Encrypt, 보안 헤더), 경로 기반 서비스 라우팅
        **LLM 추론 게이트웨이:** Ollama 2노드 로드밸런싱 (random two least_conn), GPU 동시성 상한(포화 시 503), 헬스체크
        **자체 개발 서비스 (21):** SOSOP, AI 패널 설문 에이전트, OpenShorts, AI Studio, DataLink, OCR 대시보드, Lotte웰푸드 EAV System, Meatlink AI Hub, CategoryMaster Agents, 농협 주류 매출분석 포털, PMS, Sales Lead Monitor, 사업자정보 조회, 수산물 챗봇, Kiosk MBTI, Builder, 친환경 제품 리서치 대시보드 외
        **오픈소스 도입 · 운영:** Open WebUI(RAG 챗봇), Mattermost, Termix, GoAccess
        **운영:** GoAccess 트래픽 리포트, 서비스별 로그 분리, 내부 전용 서비스 비공개 전환
      `,
      category: 'AI',
    },
    {
      title: "AI Video Generation Framework",
      tech: "Python, Node.js, REST API, JSON Pipeline",
      desc: "8단계 AI 영상 자동 생성 Framework 기획/설계/개발. 콘텐츠 제작 효율 60% ↑",
      image: "/images/prjAI_Video_Framework.png",
      longDesc: `
        **핵심 역할:** AI 영상 자동 생성 플랫폼 기획 및 설계
        **주요 성과:** 콘텐츠 제작 효율 160% ↑
        **기존 기술 스택:** Python, Node.js, REST API, JSON 파이프라인
      `,
      category: 'AI',
    },
    {
      title: "[AI] CommercialAds Video Generation Framework",
      tech: "Python, Node.js, REST API, JSON Pipeline",
      desc: "AI 광고 영상 (Short & Long Form 자동 생성",
      image: "/images/prjVideoAI.png",
      longDesc: `
        **핵심 역할:** AI 영상 자동 생성 플랫폼 기획 및 설계
        **주요 성과:** 콘텐츠 제작 효율 200% ↑
        **기존 기술 스택:** Python, Node.js, REST API, JSON 파이프라인
      `,
      category: 'AI',
    },
/*     {
      title: "[MyouV] Kpop + AI Platform",
      tech: "RockyLinux, Nginx, React+Bite, FastAPI Backend, MySQL, Google Veo3 API, Docker, github, Google Cloud Run CI/CD,",
      desc: "Kpop Music 활용, Longform Video 생성 & Fandom Community 공유 플랫폼",
      image: "/images/prjMyouV.png",
      longDesc: `
        **핵심 역할:** 플랫폼 개발 총괄, System 구축(NCP, GCP), 백엔드 & 인증 구조 설계, Video 생성 Backend API 개발
        **주요 성과:** SeriesA 투자 유치 성공
      `,
      category: 'Web, PWA'
    }, */
    {
      title: "Edge&Next 의료정보 통합 플랫폼",
      tech: "CentOS, Apache2, Nginx, PHP 7.4, EMR 연동, React",
      desc: "백엔드 & 인증 구조 설계. 실시간 EMR 연동, 고가용성 확보",
      image: "/images/prjAutomation_01_social.png",
      longDesc: `
        **핵심 역할:** 백엔드 & 인증 구조 설계
        **주요 성과:** 실시간 EMR 연동, 고가용성 확보
        **기존 기술 스택:** CentOS, Apache2, Nginx, PHP 7.4, EMR 연동, React
      `,
      category: 'Web',
    },
    {
      title: "Sales Admin System v3.0",
      tech: "SaaS, BI, AI Dashboard, Python, Node.js",
      desc: "BI + AI Dashboard 구축. 데이터 분석 효율 193% 향상",
      image: "/images/prjInfra_SalesMgmt.png",
      longDesc: `
        **핵심 역할:** BI + AI Dashboard 구축
        **주요 성과:** 데이터 분석 효율 193% 향상
        **기존 기술 스택:** SaaS, BI, AI Dashboard, Python, Node.js
      `,
      category: 'Automation',
    },
    {
      title: "MarketLink Consumer Survey Center",
      tech: "KoBERT, GPT-4, 설문 응답 분류, CSV 처리",
      desc: "설문 코드 자동 분류 AI 설계. 데이터 처리 속도 150배 향상",
      image: "/images/prjOpenSurvey.png",
      longDesc: `
        **핵심 역할:** 설문 코드 자동 분류 AI 설계
        **주요 성과:** 데이터 처리 속도 150배 향상
        **기존 기술 스택:** KoBERT, GPT-4, 설문 응답 분류, CSV 처리
      `,
      category: 'AI',
    },
    {
      title: "Kakaopay Securities Dashboard",
      tech: "Apache-Tomcat, 데이터 로그 분석, 트래픽 모니터링",
      desc: "시스템 운영 로그 분석 및 시각화. 서비스 안정성 100% 유지",
      image: "/images/prjKakaopaysec_Monitoring.png",
      longDesc: `
        **핵심 역할:** 시스템 운영 로그 분석 및 시각화
        **주요 성과:** 서비스 안정성 100% 유지
        **기존 기술 스택:** Apache-Tomcat, 데이터 로그 분석, 트래픽 모니터링
      `,
      category: 'Web',
    },
    {
      title: "교육연수원 및 e-Learning 플랫폼 개발",
      tech: "모바일 반응형 웹, UX/UI, LMS",
      desc: "반응형 웹/UX 설계. 월간 사용자 30% 증가",
      image: "/images/prjKFTA_Responsive.png",
      longDesc: `
        **핵심 역할:** 반응형 웹/UX 설계
        **주요 성과:** 월간 사용자 30% 증가
        **기존 기술 스택:** 모바일 반응형 웹, UX/UI, LMS
      `,
      category: 'Web',
    },
    {
      title: "AI 기반 콘텐츠 자동 생성 워크플로우",
      tech: "Claude API, Google Sheet API, Hashtag Generation",
      desc: "Claude API, Hashtag Generation, Google Sheet API 연동. 이미지/텍스트 자동화 기반 SNS 콘텐츠 생성. 포스트 생성 자동화 파이프라인 구축.",
      image: "/images/prjWorkflowAutomation.png",
      longDesc: `
        **주요 기술:**
        *   Claude API, Hashtag Generation, Google Sheet API 연동
        *   이미지/텍스트 자동화 기반 SNS 콘텐츠 생성
        **성과:**
        *   포스트 생성 자동화 파이프라인 구축 (기획 → 해시태그 → 이미지 → 업로드)
        *   마케팅팀 작업시간 70% 단축
      `,
      category: 'AI',
    },
    {
      title: "한국교총 종합교육연수원 웹 개편 및 LMS 시스템 개선",
      tech: "PHP, MS-SQL, IIS, HTML5, JavaScript, CSS, CDN, .NET Framework",
      desc: "한국교총 종합교육연수원 웹사이트 전면 개편, 반응형/적응형 웹 구현, FLASH 컨텐츠 변환, LMS 기능 개선 등을 통해 사이트 재도약 및 운영 효율 증대.",
      image: "/images/prjKFTA_main.png",
      longDesc: `
        **과업 수행 목표:** 'TOP 교원 연수 사이트로 Re-Positioning'을 목표로 하며, 2020 KERIS 연수원 평가 대비 요구조건 반영, 모바일 대응 사이트 개편, FLASH 지원 종료에 따른 대응, LMS/LCMS 기능 개선, 이용자 유입 확대를 위한 UX/UI 개선 등을 포함합니다.

        **주요 과제 및 진행 결과 요약 (2020.11.05일 기준):**
        *   종합교육연수원 반응형 웹 전면 개편 (www.kftaedu.or.kr): 5월 31일 완료되었으며, 운영 지원이 진행 중입니다.
        *   원격교육연수원 "사제동행" 1차 개편 (리뉴얼): 3월 30일 완료되었으며, 교육 이수 조건 변경 반영 및 디자인 전면 리뉴얼 등이 이루어졌습니다.
        *   원격교육연수원 "사제동행" 2차 개편 (반응형 웹): 개발 진척율 90%로, 연내(12월 2주 이내) 완료를 목표로 진행 중입니다.
        *   FLASH 컨텐츠 변환: 계획된 1,800차시(80개 과정 이내) 대비 실제 1,802차시(75개 과정)가 진행되었으며, 진행율은 93%입니다.

        **원격교육연수원 사제동행 1차 리뉴얼 개편 (2020.01.02~2020.3.28):**
        디자인 리뉴얼 전면 개편, PC 가로 폭 가변 확대, LMS 연수 이수 조건 변경 개발이 수행되었고, 완료 후 운영 유지 보수가 지원 중입니다.

        **LMS 연수 이수 조건 변경 개발 (1차 개편 관련):**
        *   1, 2학점 과정의 경우, 기존의 '학습 참여(20점)'와 '설문(20점)'이 삭제되고, '의견 등록(신설, 40점)'이 추가되었으며, 온라인 시험은 60점으로 유지되었습니다.
        *   4학점 과정의 경우, 기존의 '진도 점수(10점)'가 삭제되고, '온라인 시험'이 10점에서 20점으로 변경되었습니다. 진도율은 80% 이상에서 90% 이상으로 변경되었습니다.
        *   이수 기준은 '총점 60점 이상 / 진도율 90% 이상'으로 명시되었습니다.

        **종합교육연수원 적응형 웹 전면 개편 (2020.03.02~2020.05.31):** 적응형 웹으로 전면 개편이 완료(100%)되었으며, 운영 지원이 진행 중입니다.

        **FLASH 교육 과정 변환 (2020.02.01~2020.12.31):** FLASH 컨텐츠를 HTML5 및 MP4 형식으로 변환하는 작업이 진행되었으며, 연내 완료 예정(93%)입니다.

        **외부 연동 모듈 변경:** 결제 모듈이 이니시스(INICIS)에서 NHN KCP로, 문자메시지(SMS) 모듈이 KCT(한국케이블텔레콤)에서 와이즈캔(WISECAN)으로 변경되었습니다.

        **추가 개발 사항:** 당초 FLASH 원본 퀴즈를 MP4로 변환했으나, 사용자 상호작용이 필요한 별도 포맷으로 과정 평가(퀴즈) 기능이 추가 개발(차시당 평균 3페이지)되었고, 학습 자료 다운로드 링크도 별도 페이지로 개발(차시당 평균 2페이지)되었습니다.

        **시스템 구성:** 원격교육연수원 '사제동행'은 Web 서버(2대), Contents 서버, LMS 서버, DB 서버(1대, MS-SQL 2012)로 구성되어 있으며, 종합교육연수원은 Web 서버(1대), DB 서버(1대, ORACLE)로 구성되어 있습니다.

        **# 운영 체제 (Operating System):** Windows Server 2012 R2 Standard
        **웹 서버 (Web Server):** IIS 8.5 (Internet Information Services Version 8.5.9600.16384)
        **데이터베이스 (Database):** MS-SQL 2012, ORACLE
        **개발/스크립트 언어:** ASP, HTML5, JavaScript, CSS
        **기타 기술:** CDN, .NET Framework

        **2. 주요 모듈 및 연동 시스템 (Key Modules & Integrations)**
        *   **결제 모듈 (Payment Gateway, PG):** 이니시스 (INICIS) -> NHN KCP
        *   **문자메시지(SMS/LMS/MMS) 모듈:** KCT (한국케이블텔레콤) -> 와이즈캔 (WISECAN)

        **3. 주요 프로젝트 기술 과제 (Key Project Technical Tasks)**
        *   **웹 사이트 개편:** 반응형 웹 (Responsive Web): 원격교육연수원 '사제동행' 사이트 2차 전면 개편, 적응형 웹 (Adaptive Web): 종합교육연수원 사이트 전면 개편
        *   **컨텐츠 변환:** FLASH 컨텐츠를 HTML5 및 MP4 형식으로 변환, 사용자 상호작용 퀴즈 및 학습 자료 다운로드 페이지 추가 개발.
        *   **LMS 기능 개발:** KERIS 연수 이수 조건 변경에 따른 LMS 시스템 재개발 (의견 등록 신설, 온라인 시험 점수 변경, 진도율 기준 통일).

        **4. 기타 개발/개선 사항**
        *   검색엔진 최적화 (SEO): 기초 마련
        *   운영 자동화: 수강연기/취소/과목변경 자동화 처리, 관리자 페이지 구현, 자격증 발급 프로세스 개선, 단체 신청 관련 기능 강화.
        *   사용자 편의 기능: NICE 개인번호 자동 입력, 포인트 적립/차감 오류 개선, LMS 관리자 화면 개선.
      `,
      category: 'Web',
    }
  ];

  // Every public path on ai.marketlink.co.kr is a "station"; line = the machine it runs on.
  // `project` points at an allProjects title when a detailed write-up exists.
  const lines = {
    dgx1: { name: 'DGX-01', note: 'DGX-01에서 운영', color: 'var(--line-dgx1)' },
    dgx2: { name: 'DGX-02', note: 'DGX-02에서 운영', color: 'var(--line-dgx2)' },
    infra: { name: '추론 인프라', note: 'GPU 두 대를 묶는 LLM 추론 계층', color: 'var(--line-infra)' },
    office: { name: '사내 서버', note: '사내 서버에서 운영', color: 'var(--line-office)' },
  };

  const stations = [
    { route: '/lv10', line: 'dgx1', name: 'AI 패널 설문 에이전트', summary: 'LLM 페르소나가 브라우저를 직접 조작해 웹 설문에 응답합니다.', project: 'AI 패널 설문 에이전트 (LV10)' },
    { route: '/shorts', line: 'dgx1', name: 'OpenShorts', summary: '긴 영상을 바이럴 숏폼으로 잘라 주는 구독형 SaaS입니다.', project: '[SnapShorts] OpenShorts AI 숏폼 SaaS' },
    { route: '/lotte', line: 'dgx1', name: 'Lotte웰푸드 EAV System', live: 'https://ai.marketlink.co.kr/lotte/v2/dashboard.html', summary: '제과 · 제빵 상품 507,658셀의 속성을 정제하고 검수합니다.', project: 'Lotte웰푸드 EAV System' },
    { route: '/ocr', line: 'dgx1', name: '영수증 OCR', summary: '영수증 62,140건에서 상품 단위 구매 데이터를 뽑아냅니다.', detail: { image: '/images/stations/ocr.jpg', tech: 'Python, PaddleOCR PP-OCRv5, Ollama (gemma4), Next.js 15, React 19', facts: [['개요', '영수증 이미지에서 상품 단위 구매 데이터를 뽑아내는 배치 파이프라인과 검수 대시보드입니다.'], ['파이프라인', 'PaddleOCR(CPU) 스윕 → Ollama gemma4 텍스트 파싱 → 카테고리 분류 → 12컬럼 엑셀 리포트 → Next.js 검수 대시보드'], ['처리 규모', '영수증 62,140건 중 61,827건(99.5%)을 4일 만에 수록했습니다.'], ['운영', '단계별 결과를 파일로 남겨 중단해도 같은 명령으로 이어서 실행합니다.']] } },
    { route: '/biz', line: 'dgx1', name: '사업자정보 조회', summary: '사업자번호로 사업자 정보를 찾아 줍니다.', detail: { tech: 'React, Vite, Node.js, Gemini API', facts: [['개요', '상호명이나 사업자번호로 사업자 정보를 찾아 줍니다.'], ['구현', 'Gemini API로 검색 결과를 정리하고, 조회 결과를 캐시해 같은 요청을 다시 보내지 않습니다.']] } },
    { route: '/fish', line: 'dgx1', name: '수산물 챗봇', summary: '해양수산부 수산물 정보를 답하는 챗봇입니다.', detail: { tech: 'Python, Streamlit, Ollama (EXAONE 3.5 7.8B), GraphRAG', facts: [['개요', '수산물 데이터를 LLM과 GraphRAG로 묻고 답하는 챗봇입니다. 질문하면 차트와 설명을 함께 돌려줍니다.'], ['로컬 실행', '외부 API 없이 로컬 EXAONE 3.5 모델로 동작하고, 데이터와 코드를 폴더 하나로 묶어 Mac mini에서도 시연합니다.']] } },
    { route: '/sales', line: 'dgx1', name: 'Sales Lead Monitor', summary: '영업 리드를 한 화면에서 추적하는 대시보드입니다.', detail: { image: '/images/stations/sales.jpg', tech: 'React, Vite, Tailwind CSS 4, Python 크롤러', facts: [['개요', '정부·공공기관 지원사업 공고를 모아 영업 리드로 관리하는 대시보드입니다.'], ['수집', 'K-Startup, 기업마당, NIPA, KOCCA, SMTECH의 모집 공고를 키워드 대신 전수로 수집해 제목을 모두 검토합니다.'], ['분류', 'A/B/C 우선순위와 마감 임박(3일 이내)을 표시하고, 재조사 때는 신규·변경·종료 공고만 갱신합니다.'], ['접근성', 'WCAG 2.2 AA 기준으로 색만으로 상태를 전달하지 않습니다.']] } },
    { route: '/kiosk', line: 'dgx1', name: 'Kiosk MBTI', summary: '매장 키오스크에서 하는 MBTI 체험 앱입니다.', detail: { image: '/images/stations/kiosk.jpg', tech: 'React, FastAPI, MySQL 8, Docker, Nginx', facts: [['개요', '키오스크에서 설문에 답하면 MBTI 16유형으로 분류하고 유형별 설명을 보여 줍니다.'], ['현장', 'CES 2026 라이브 데모로 운영했고, 6개 언어(한국어, 영어, 중국어, 일본어, 스페인어, 러시아어)를 지원합니다.'], ['개인정보', '세션 UUID만 저장하고 개인을 식별하는 정보는 모으지 않습니다.']] } },
    { route: '/builder', line: 'dgx1', name: 'SurveyBuilder', summary: 'docx, hwp 설문지를 올리면 AI가 웹 설문으로 바로 만들어 줍니다.', live: 'https://ai.marketlink.co.kr/builder', detail: { image: '/images/stations/builder.jpg', tech: 'Next.js, TypeScript, LLM 문서 분석', facts: [['개요', '문서 한 장으로 완성하는 설문 빌더 SaaS(v2.0)입니다. docx나 hwp 설문지를 올리면 AI가 분석해 웹 설문으로 셋업합니다.'], ['자동 구성', '웹 화면 구성, 분기와 스킵 조건, 수집 쿼터를 한 번에 설정합니다.'], ['규칙', '한국어 설문지 표기 규칙과 18종 모듈을 정의하고, 파서와 리포트, 응답 화면이 같은 규칙 문서를 따르도록 맞췄습니다.'], ['운영', '실제 설문 3건이 이 빌더로 운영되고 있습니다.']] } },
    { route: '/ssm', line: 'dgx1', name: 'SSM Intelligence', summary: '카드사 빅데이터 349만 건으로 소형 슈퍼마켓 시장을 분석합니다.', detail: { image: '/images/stations/ssm.jpg', tech: 'Python, ECharts, Node.js, 로그인 인증', facts: [['개요', '카드사 빅데이터로 소형 슈퍼마켓 시장을 분석하는 SSM Intelligence Platform입니다.'], ['데이터', '카드사 6곳, 18개월(2025.01~2026.06), 349만 건, 가맹점 224,061곳의 거래를 집계했습니다.'], ['구성', '시장 대시보드, 브랜드 분석 리포트, AI 어시스턴트, 트렌드를 하나의 허브로 묶었습니다.']] } },
    { route: '/contacts', line: 'dgx1', name: '사내 주소록', summary: '마켓링크 구성원 연락처를 찾습니다.', detail: { facts: [['개요', '마켓링크 구성원 연락처를 찾는 사내 주소록입니다.']] } },
    { route: ':8080', line: 'dgx1', name: '클러스터 대시보드', summary: 'DGX 두 대의 상태를 한 화면에 보여 줍니다.', project: 'MARKETLINK-AX 온프레미스 AI 플랫폼 (NVIDIA DGX Spark ×2)' },
    { route: '/sosop', line: 'dgx2', name: 'SOSOP', summary: '설문 파일 한 장으로 HTML, PDF, PPTX 리포트를 만듭니다.', project: '[SOSOP] 소상공인 경쟁력 평가 리포트 자동화 시스템' },
    { route: '/studio', line: 'dgx2', name: 'AI Studio', summary: '프롬프트 최적화부터 이미지 생성, 갤러리, 결제까지 한곳에서 합니다.', detail: { tech: 'React, Vite, Node.js (Express, TypeScript), MySQL, JWT, Stripe', facts: [['개요', 'mLAB AI Studio. 프롬프트를 다듬고 번역해 이미지를 만들고, 갤러리로 관리하는 생성형 이미지 스튜디오입니다.'], ['기능', '프롬프트 최적화와 번역, 이미지 생성, 갤러리, 구독 결제, 관리자 대시보드를 갖췄습니다.']] } },
    { route: '/datalink', line: 'dgx2', name: 'DataLink', summary: '게임 이용자 리뷰 68,767건의 감성과 키워드를 분석합니다.', detail: { image: '/images/stations/datalink.jpg', tech: 'Python, React, Vite, 데이터 파이프라인', facts: [['개요', '게임 이용자 리뷰를 모아 감성과 키워드를 분석하는 리서치 포털입니다. 첫 화면은 PUBG Intelligence Dashboard입니다.'], ['분석', 'Steam과 Reddit 리뷰 68,767건으로 감성 점수, 키워드, 카테고리, 감정 분석, 요약 리포트를 만듭니다.'], ['기능', '데이터에 직접 질문하는 DataChat과 해외 한국 게임 이용자 조사 분석을 제공합니다.']] } },
    { route: '/research', line: 'dgx2', name: '친환경 제품 리서치', summary: '친환경 제품 조사 결과를 보는 대시보드입니다.', detail: { tech: 'Python, MySQL, Redis, Docker', facts: [['개요', 'SNS, 커뮤니티, 온라인몰 리뷰에서 친환경농산물에 대한 소비자 인식과 구매 경험을 분석합니다.']] } },
    { route: '/meatlink', line: 'dgx2', name: 'Meatlink AI Hub', summary: '축산물 구매 사진에서 18개 항목을 자동으로 판독합니다.', detail: { image: '/images/stations/meatlink.jpg', tech: 'React, FastAPI, MySQL, Docker, Ollama (로컬 비전 LLM)', facts: [['개요', '축산물 구매 사진을 자동으로 판독하고 메타데이터를 실시간으로 검수하는 SaaS입니다.'], ['판독', '영수증과 라벨 사진 1,370쌍(2,740장)에서 구매일, 부위, 등급, 원산지, 가격 등 18개 항목을 사진 1장당 0.3초에 추출합니다.'], ['검증', '정부 할인행사(농할대전 등)를 따로 분리하고, 축산물 이력제(mtrace)와 연동해 실시간으로 확인합니다.']] } },
    { route: '/master', line: 'dgx2', name: 'CategoryMaster Agents', summary: '카테고리 마스터 데이터를 정리하는 에이전트입니다.', detail: { image: '/images/stations/master.jpg', tech: 'FastAPI, SQLAlchemy, MySQL 8, React, Vite, TypeScript, Caddy', facts: [['개요', '바코드로 상품의 카테고리와 제조사를 분류하는 AI 파이프라인입니다. 엑셀로 하던 수작업을 대신합니다.'], ['분류 방식', '저렴하고 믿을 만한 조회부터 LLM까지 순서대로 시도하고, 신뢰도가 낮은 결과는 사람이 검수하도록 넘깁니다.'], ['학습', '검수에서 고친 결과를 다시 반영해 갈수록 LLM을 덜 씁니다. 배치 진행 상황을 실시간으로 보여 주고 중단할 수 있습니다.'], ['품질', '백엔드 테스트 273개, 프런트엔드 테스트 75개가 통과합니다.']] } },
    { route: '/nh', line: 'dgx2', name: '농협 주류 협력사 데이터 분석 포털', summary: '주류 협력사가 로그인해 자기 매출과 시장 흐름을 분석합니다.', live: 'https://ai.marketlink.co.kr/nh/login?next=%2Fdashboard', detail: { image: '/images/stations/nh.jpg', tech: 'Next.js 16 (App Router), MySQL 8, ECharts, systemd', facts: [['개요', '농협 하나로마트 주류 협력사가 로그인해 자기 매출과 시장 흐름을 보는 데이터 분석 포털입니다.'], ['기능', '대시보드, 매출, 분석, 인사이트, 트렌드, 리포트, 공지 화면을 제공하고, 주류 뉴스와 통계, 월간 Retail Spotlight 리포트를 함께 보여 줍니다.'], ['권한', '협력사와 관리자 역할을 나누고, 로그인한 사용자만 데이터를 볼 수 있습니다. 등급에 따라 열리는 분석 모듈이 다릅니다.'], ['데이터', '원천 데이터를 정규화해 분석용 마트로 쌓고, 화면에서는 집계 결과만 불러옵니다.'], ['배포', '배포 스크립트가 백업, 빌드, 재시작, 점검을 하고 실패하면 자동으로 이전 버전으로 되돌립니다.']] } },
    { route: ':8434', line: 'infra', name: 'Ollama 로드밸런서', summary: 'LLM 추론 요청을 GPU 서버 두 대에 나눠 보냅니다.', project: 'MARKETLINK-AX 온프레미스 AI 플랫폼 (NVIDIA DGX Spark ×2)' },
    { route: '/pms', line: 'office', name: 'PMS', summary: '프로젝트 일정과 진행 상황을 관리합니다.', detail: { facts: [['개요', '프로젝트 일정과 진행 상황을 관리하는 대시보드입니다.']] } },
  ];

  const stationId = (s) => 'st-' + s.route.replace(/\W/g, '');

  export { allProjects, stations, lines, stationId };