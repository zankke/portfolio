const allProjects = [
    {
      title: "[SOSOP] 소상공인 경쟁력 평가 리포트 자동화 시스템",
      tech: "FastAPI, Celery, PostgreSQL, Redis, python-pptx, Chromium, HTMX, OpenAI·Gemini·Ollama, Docker Compose",
      desc: "설문 파일 한 장을 올리면 HTML, PDF, PPTX 리포트가 나옵니다. Windows에서만 돌던 기존 도구를 웹 시스템으로 다시 만들었습니다.",
      image: "/videos/sosop/poster.jpg",
      video: {
        src: "https://ai.marketlink.co.kr/portfolio/sosop-intro.mp4",
        poster: "/videos/sosop/poster.jpg",
        captions: "/videos/sosop/sosop-intro.ko.vtt",
      },
      link: "https://ai.marketlink.co.kr/sosop",
      longDesc: `
        **배경:** 기존 도구는 Tkinter와 PowerPoint COM으로 만들어 Windows에서만 돌았고, 다른 환경으로 옮길 수 없었습니다. 그래서 웹 시스템으로 다시 만들었습니다.
        **파이프라인:** 6단계로 나뉩니다. 집계, 정제, 인사이트를 거쳐 PPT→PDF와 HTML을 나란히 만듭니다. 단계마다 결과를 엑셀 시트에 쌓고, 실패하면 그 단계부터 다시 돌립니다.
        **LLM 폴백:** OpenAI가 실패하면 Gemini, 그다음 Ollama(EXAONE 3.5 32B)로 넘어갑니다. 기록에는 마지막으로 성공한 모델만 남깁니다.
        **산출물:** HTML 덱 하나에서 HTML, PDF, PPTX를 함께 만듭니다. PPTX는 편집할 수 있고, PDF는 만든 뒤 스스로 점검합니다. 로그인 없이 볼 수 있는 공유 링크도 발급합니다.
        **수치 조정:** 문항별 응답 건수를 고치면 Top3 비율과 등급을 바로 다시 계산합니다. 원본 응답은 그대로 둡니다.
        **배포와 운영:** Docker Compose로 서비스 5개를 띄우고, web과 worker는 같은 이미지를 씁니다. 관리자는 로그인과 OTP로 들어오고, 결과는 Google Drive와 동기화합니다.
      `,
      category: 'AI',
    },
    {
      title: "AI 패널 설문 에이전트 (LV10)",
      tech: "Node.js, Express 5, TypeScript, Playwright + CDP, React 19, Vite 8, MySQL, Gemini·OpenAI·EXAONE",
      desc: "한국어 페르소나를 입힌 LLM이 브라우저를 직접 조작해 웹 설문을 처음부터 끝까지 진행합니다.",
      image: "/images/prjLV10_SurveyAgent.jpg",
      longDesc: `
        **개요:** Nemotron 한국어 패널 페르소나를 입힌 LLM이 Playwright(CDP)로 설문을 읽고, 판단하고, 답을 표시합니다.
        **실행 순서:** URL을 받으면 쿼터에 맞는 페르소나를 배정하고, DOM과 접근성 트리를 파싱해 질문 유형을 알아냅니다. LLM이 답을 정하면 입력해서 제출하고, 완료인지 스크린아웃인지 판정합니다. 이 8단계를 설문이 끝날 때까지 반복합니다.
        **문항 처리:** SPA 화면 멈춤 감지, 스크리너 문항 처리, 매트릭스 체크박스와 리커트 척도 대응 등 6가지 장치를 넣었습니다. 진행 상황은 SSE와 WebSocket으로 관제 대시보드에서 실시간으로 봅니다.
        **LLM:** Gemini, OpenAI, 로컬 EXAONE 3 계열 중에서 추론 엔진을 고를 수 있습니다.
      `,
      category: 'AI',
    },
    {
      title: "[SnapShorts] OpenShorts AI 숏폼 SaaS",
      tech: "FastAPI, Celery + Redis, PostgreSQL(RLS), faster-whisper, Gemini, Stripe·PortOne, NVIDIA DGX GPU",
      desc: "긴 영상을 바이럴 숏폼으로 잘라 주는 SaaS입니다. 클립 1편 원가는 약 21원, 클립 매출총이익률은 88.5%입니다.",
      image: "/images/prjOpenShorts.jpg",
      longDesc: `
        **기능:** AI 클립 생성기, 쿠팡 핫딜 쇼츠, AI 블로그 포스팅, 유튜브 스튜디오, UGC 가상 크리에이터와 아바타 갤러리가 있습니다.
        **아키텍처:** JWT 멀티테넌트 구조에 PostgreSQL 행 단위 보안(RLS)을 걸었습니다. Celery GPU 워커를 DGX 두 노드에 나눠 돌리고, 로컬 GPU를 먼저 쓰다가 안 되면 클라우드로 넘깁니다.
        **원가:** 클립 1편 원가는 $0.016(약 21.4원), 판매가는 $0.15로 매출총이익률이 88.5%입니다. 설계 기준으로 DGX 온프레미스를 쓰면 원가가 78% 줄어듭니다.
        **결제:** 정기결제는 Stripe로, 국내 간편결제는 PortOne/Toss로 받습니다.
      `,
      category: 'AI',
    },
    {
      title: "Lotte웰푸드 EAV System",
      tech: "Python, MySQL 8 (EAV), SQLAlchemy, pandas, RapidFuzz, EasyOCR, Playwright, Google/Naver 검색 API, openpyxl",
      desc: "제과 · 제빵 18개 카테고리 507,658셀의 속성을 정제하고, 평균 신뢰도 0.875로 계약 기준(0.85)을 넘겼습니다.",
      image: "/images/prjLotteSKU.jpg",
      longDesc: `
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
      desc: "DGX 두 노드 클러스터에서 서비스 26개와 엔드포인트 132개를 도메인 하나로 운영하는 사내 AI 플랫폼입니다.",
      image: "/images/prjDGXPlatform.jpg",
      longDesc: `
        **인프라:** NVIDIA DGX Spark 두 노드(GB10, 128GB 통합 메모리)를 씁니다. 공개 도메인 하나에 HTTPS 게이트웨이(Let's Encrypt, 보안 헤더)를 두고, 경로마다 서비스를 연결합니다.
        **LLM 추론 게이트웨이:** Ollama 요청을 두 노드에 나눠 보냅니다(random two least_conn). GPU 동시 요청 수에 상한을 두어 꽉 차면 503을 돌려주고, 헬스체크를 합니다.
        **도입해 운영하는 오픈소스:** Open WebUI(RAG 챗봇), Mattermost, Termix, GoAccess
        **운영:** GoAccess로 트래픽 리포트를 만들고, 로그는 서비스별로 나눠 둡니다. 내부 전용 서비스는 외부에 공개하지 않습니다.
      `,
      category: 'AI',
    },
    {
      title: "AI 광고 영상 자동 생성 프레임워크 (숏폼·롱폼, 8단계 파이프라인)",
      tech: "Python, Node.js, REST API, JSON Pipeline",
      desc: "숏폼과 롱폼 AI 광고 영상을 8단계 파이프라인으로 자동 생성하는 프레임워크를 기획, 설계, 개발했습니다.",
      image: "/images/prjVideoAI.png",
      longDesc: `
        **맡은 일:** AI 영상 자동 생성 플랫폼을 기획하고 설계했습니다.
        **범위:** 숏폼과 롱폼 광고 영상을 8단계 파이프라인으로 만듭니다.
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
      desc: "백엔드와 인증 구조를 설계했습니다. EMR과 실시간으로 연동하고 고가용성을 확보했습니다.",
      image: "/images/prjAutomation_01_social.png",
      longDesc: `
        **맡은 일:** 백엔드와 인증 구조를 설계했습니다.
        **성과:** EMR과 실시간으로 연동하고 고가용성을 확보했습니다.
      `,
      category: 'Web',
      org: '베리타스커넥트',
      year: '2023',
    },
    {
      title: "Sales Admin System v3.0",
      tech: "SaaS, BI, AI Dashboard, Python, Node.js",
      desc: "영업 데이터를 보는 BI와 AI 대시보드를 만들었습니다.",
      image: "/images/prjInfra_SalesMgmt.png",
      longDesc: `
        **맡은 일:** BI와 AI 대시보드를 만들었습니다.
      `,
      category: 'Automation',
    },
    {
      title: "MarketLink Consumer Survey Center",
      tech: "KoBERT, GPT-4, 설문 응답 분류, CSV 처리",
      desc: "설문 코드를 자동으로 분류하는 AI를 설계했습니다. 데이터 처리 속도가 150배 빨라졌습니다.",
      image: "/images/prjOpenSurvey.png",
      longDesc: `
        **맡은 일:** 설문 코드를 자동으로 분류하는 AI를 설계했습니다.
        **성과:** 데이터 처리 속도가 150배 빨라졌습니다.
      `,
      category: 'AI',
    },
    {
      title: "Kakaopay Securities Dashboard",
      tech: "Apache-Tomcat, 데이터 로그 분석, 트래픽 모니터링",
      desc: "시스템 운영 로그와 트래픽을 분석하고 시각화하는 대시보드를 만들었습니다.",
      image: "/images/prjKakaopaysec_Monitoring.png",
      longDesc: `
        **맡은 일:** 시스템 운영 로그를 분석하고 시각화했습니다.
      `,
      category: 'Web',
      org: '베리타스커넥트',
      year: '2024–2025',
    },
    {
      title: "AI 기반 콘텐츠 자동 생성 워크플로우",
      tech: "Claude API, Google Sheet API, Hashtag Generation",
      desc: "Claude API, 해시태그 생성, Google Sheet API를 연동해 SNS 포스트를 자동으로 만드는 파이프라인입니다.",
      image: "/images/prjWorkflowAutomation.png",
      longDesc: `
        **사용 기술:** Claude API, 해시태그 생성, Google Sheet API를 연동해 이미지와 텍스트를 자동으로 만들고 SNS 콘텐츠를 생성합니다.
        **성과:** 기획, 해시태그, 이미지, 업로드로 이어지는 포스트 생성 과정을 자동화했습니다.
      `,
      category: 'AI',
    },
    {
      title: "한국교총 종합교육연수원 웹 개편 및 LMS 시스템 개선",
      tech: "PHP, MS-SQL, IIS, HTML5, JavaScript, CSS, CDN, .NET Framework",
      desc: "한국교총 종합교육연수원 웹사이트를 전면 개편했습니다. 반응형·적응형 웹을 만들고, FLASH 콘텐츠를 변환하고, LMS 기능을 고쳐 운영 효율을 높였습니다.",
      image: "/images/prjKFTA_main.png",
      longDesc: `
        **목표:** 2020 KERIS 연수원 평가에 맞춰 사이트를 모바일 대응으로 바꾸고, FLASH 지원 종료에 대비하는 일이었습니다.
        **결과:** 종합교육연수원을 반응형·적응형 웹으로 전면 개편하고, 원격교육연수원 "사제동행"을 두 차례 개편했습니다. FLASH 콘텐츠 1,802차시(75개 과정)를 HTML5와 MP4로 변환했습니다.
        **LMS:** KERIS 기준에 맞춰 이수 조건(총점 60점 이상, 진도율 90% 이상)과 평가 항목을 다시 개발했습니다.
        **연동:** 결제 모듈을 이니시스에서 NHN KCP로, 문자 모듈을 KCT에서 와이즈캔으로 바꿨습니다.
        **환경:** Windows Server 2012 R2, IIS 8.5, MS-SQL 2012와 ORACLE, ASP
      `,
      category: 'Web',
      org: '아이너스',
      year: '2020',
    }
  ];

  // Every public path on ai.marketlink.co.kr is a "station"; line = the machine it runs on.
  // `project` points at an allProjects title when a detailed write-up exists.
  const lines = {
    dgx1: { name: 'DGX-01', note: 'DGX-01에서 운영' },
    dgx2: { name: 'DGX-02', note: 'DGX-02에서 운영' },
    office: { name: '사내 서버', note: '사내 서버에서 운영' },
  };

  // Optional: `results` [[value, label]] shown first in the panel; `access` 'login' | 'internal'
  // (default public); `period`, `team`, `role` render as one meta line and stay hidden while empty.
  // Ordered by strength of evidence: the first one is selected on load.
  const stations = [
    { route: '/lotte', line: 'dgx1', results: [['507,658셀', '속성 정제'], ['0.875', '평균 신뢰도 (계약 기준 0.85)'], ['73.9%', 'AI 자동 확정 비율']], name: 'Lotte웰푸드 EAV System', live: 'https://ai.marketlink.co.kr/lotte/v2/dashboard.html', summary: '제과 · 제빵 상품 507,658셀의 속성을 정제하고 검수합니다.', project: 'Lotte웰푸드 EAV System' },
    { route: '/ocr', line: 'dgx1', results: [['62,140건', '처리한 영수증'], ['99.5%', '수록률'], ['4일', '처리 기간']], name: '영수증 OCR', summary: '영수증 62,140건에서 상품 단위 구매 데이터를 뽑아냅니다.', detail: { image: '/images/stations/ocr.jpg', tech: 'Python, PaddleOCR PP-OCRv5, Ollama (gemma4), Next.js 15, React 19', facts: [['개요', '영수증 이미지에서 상품 단위 구매 데이터를 뽑아내는 배치 파이프라인과 검수 대시보드입니다.'], ['파이프라인', 'PaddleOCR(CPU) 스윕 → Ollama gemma4 텍스트 파싱 → 카테고리 분류 → 12컬럼 엑셀 리포트 → Next.js 검수 대시보드'], ['처리 규모', '영수증 62,140건 중 61,827건(99.5%)을 4일 만에 수록했습니다.'], ['운영', '단계별 결과를 파일로 남겨 중단해도 같은 명령으로 이어서 실행합니다.']] } },
    { route: '/master', line: 'dgx2', results: [['348개', '통과한 테스트 (백엔드 273 · 프런트엔드 75)']], name: 'CategoryMaster Agents', summary: '카테고리 마스터 데이터를 정리하는 에이전트입니다.', detail: { image: '/images/stations/master.jpg', tech: 'FastAPI, SQLAlchemy, MySQL 8, React, Vite, TypeScript, Caddy', facts: [['개요', '바코드로 상품의 카테고리와 제조사를 분류하는 AI 파이프라인입니다. 엑셀로 하던 수작업을 대신합니다.'], ['분류 방식', '저렴하고 믿을 만한 조회부터 LLM까지 순서대로 시도하고, 신뢰도가 낮은 결과는 사람이 검수하도록 넘깁니다.'], ['학습', '검수에서 고친 결과를 다시 반영해 갈수록 LLM을 덜 씁니다. 배치 진행 상황을 실시간으로 보여 주고 중단할 수 있습니다.'], ['품질', '백엔드 테스트 273개, 프런트엔드 테스트 75개가 통과합니다.']] } },
    { route: '/meatlink', line: 'dgx2', results: [['18개', '판독 항목'], ['0.3초', '사진 1장당 판독'], ['2,740장', '판독한 사진']], name: 'Meatlink AI Hub', summary: '축산물 구매 사진에서 18개 항목을 자동으로 판독합니다.', detail: { image: '/images/stations/meatlink.jpg', tech: 'React, FastAPI, MySQL, Docker, Ollama (로컬 비전 LLM)', facts: [['개요', '축산물 구매 사진을 자동으로 판독하고 메타데이터를 실시간으로 검수하는 SaaS입니다.'], ['판독', '영수증과 라벨 사진 1,370쌍(2,740장)에서 구매일, 부위, 등급, 원산지, 가격 등 18개 항목을 사진 1장당 0.3초에 추출합니다.'], ['검증', '정부 할인행사(농할대전 등)를 따로 분리하고, 축산물 이력제(mtrace)와 연동해 실시간으로 확인합니다.']] } },
    { route: '/ssm', line: 'dgx1', access: 'login', results: [['349만 건', '카드 거래'], ['224,061곳', '가맹점'], ['18개월', '분석 기간']], name: 'SSM Intelligence', summary: '카드사 빅데이터 349만 건으로 소형 슈퍼마켓 시장을 분석합니다.', detail: { image: '/images/stations/ssm.jpg', tech: 'Python, ECharts, Node.js, 로그인 인증', facts: [['개요', '카드사 빅데이터로 소형 슈퍼마켓 시장을 분석하는 SSM Intelligence Platform입니다.'], ['데이터', '카드사 6곳, 18개월(2025.01~2026.06), 349만 건, 가맹점 224,061곳의 거래를 집계했습니다.'], ['구성', '시장 대시보드, 브랜드 분석 리포트, AI 어시스턴트, 트렌드를 하나의 허브로 묶었습니다.']] } },
    { route: '/sosop', line: 'dgx2', results: [['3종', '산출물 (HTML · PDF · PPTX)'], ['6단계', '단계별로 다시 실행하는 파이프라인']], name: 'SOSOP', summary: '설문 파일 한 장으로 HTML, PDF, PPTX 리포트를 만듭니다.', project: '[SOSOP] 소상공인 경쟁력 평가 리포트 자동화 시스템' },
    { route: '/builder', line: 'dgx1', results: [['3건', '운영 중인 실제 설문'], ['18종', '설문 모듈']], name: 'SurveyBuilder', summary: 'docx, hwp 설문지를 올리면 AI가 웹 설문으로 바로 만들어 줍니다.', live: 'https://ai.marketlink.co.kr/builder', detail: { image: '/images/stations/builder.jpg', tech: 'Next.js, TypeScript, LLM 문서 분석', facts: [['개요', '설문 빌더 SaaS(v2.0)입니다. docx나 hwp 설문지를 올리면 AI가 분석해 웹 설문으로 셋업합니다.'], ['자동 구성', '웹 화면 구성, 분기와 스킵 조건, 수집 쿼터를 한 번에 설정합니다.'], ['규칙', '한국어 설문지 표기 규칙과 18종 모듈을 정의하고, 파서와 리포트, 응답 화면이 같은 규칙 문서를 따르도록 맞췄습니다.'], ['운영', '실제 설문 3건이 이 빌더로 운영되고 있습니다.']] } },
    { route: '/datalink', line: 'dgx2', results: [['68,767건', '분석한 리뷰 (Steam · Reddit)']], name: 'DataLink', summary: '게임 이용자 리뷰 68,767건의 감성과 키워드를 분석합니다.', detail: { image: '/images/stations/datalink.jpg', tech: 'Python, React, Vite, 데이터 파이프라인', facts: [['개요', '게임 이용자 리뷰를 모아 감성과 키워드를 분석하는 리서치 포털입니다. 첫 화면은 PUBG Intelligence Dashboard입니다.'], ['분석', 'Steam과 Reddit 리뷰 68,767건으로 감성 점수, 키워드, 카테고리, 감정 분석, 요약 리포트를 만듭니다.'], ['기능', '데이터에 직접 질문하는 DataChat과 해외 한국 게임 이용자 조사 분석을 제공합니다.']] } },
    { route: '/shorts', line: 'dgx1', results: [['약 21원', '클립 1편 원가'], ['88.5%', '클립 매출총이익률']], name: 'OpenShorts', summary: '긴 영상을 바이럴 숏폼으로 잘라 주는 구독형 SaaS입니다.', project: '[SnapShorts] OpenShorts AI 숏폼 SaaS' },
    { route: '/nh', line: 'dgx2', access: 'login', name: '농협 주류 협력사 데이터 분석 포털', summary: '주류 협력사가 로그인해 자기 매출과 시장 흐름을 분석합니다.', live: 'https://ai.marketlink.co.kr/nh/login?next=%2Fdashboard', detail: { image: '/images/stations/nh.jpg', tech: 'Next.js 16 (App Router), MySQL 8, ECharts, systemd', facts: [['개요', '농협 하나로마트 주류 협력사가 로그인해 자기 매출과 시장 흐름을 보는 데이터 분석 포털입니다.'], ['기능', '대시보드, 매출, 분석, 인사이트, 트렌드, 리포트, 공지 화면을 제공하고, 주류 뉴스와 통계, 월간 Retail Spotlight 리포트를 함께 보여 줍니다.'], ['권한', '협력사와 관리자 역할을 나누고, 로그인한 사용자만 데이터를 볼 수 있습니다. 등급에 따라 열리는 분석 모듈이 다릅니다.'], ['데이터', '원천 데이터를 정규화해 분석용 마트로 쌓고, 화면에서는 집계 결과만 불러옵니다.'], ['배포', '배포 스크립트가 백업, 빌드, 재시작, 점검을 하고 실패하면 자동으로 이전 버전으로 되돌립니다.']] } },
    { route: '/sales', line: 'dgx1', name: 'Sales Lead Monitor', summary: '영업 리드를 한 화면에서 추적하는 대시보드입니다.', detail: { image: '/images/stations/sales.jpg', tech: 'React, Vite, Tailwind CSS 4, Python 크롤러', facts: [['개요', '정부·공공기관 지원사업 공고를 모아 영업 리드로 관리하는 대시보드입니다.'], ['수집', 'K-Startup, 기업마당, NIPA, KOCCA, SMTECH의 모집 공고를 키워드 대신 전수로 수집해 제목을 모두 검토합니다.'], ['분류', 'A/B/C 우선순위와 마감 임박(3일 이내)을 표시하고, 재조사 때는 신규·변경·종료 공고만 갱신합니다.'], ['접근성', 'WCAG 2.2 AA 기준으로 색만으로 상태를 전달하지 않습니다.']] } },
    { route: '/studio', line: 'dgx2', name: 'AI Studio', summary: '프롬프트 최적화부터 이미지 생성, 갤러리, 결제까지 한곳에서 합니다.', detail: { image: '/images/stations/studio.jpg', tech: 'React, Vite, Node.js (Express, TypeScript), MySQL, JWT, Stripe', facts: [['개요', 'mLAB AI Studio. 프롬프트를 다듬고 번역해 이미지를 만들고, 갤러리로 관리하는 생성형 이미지 스튜디오입니다.'], ['기능', '프롬프트 최적화와 번역, 이미지 생성, 갤러리, 구독 결제, 관리자 대시보드를 갖췄습니다.']] } },
    { route: '/fish', line: 'dgx1', name: '수산물 챗봇', summary: '해양수산부 수산물 정보를 답하는 챗봇입니다.', detail: { image: '/images/stations/fish.jpg', tech: 'Python, Streamlit, Ollama (EXAONE 3.5 7.8B), GraphRAG', facts: [['개요', '수산물 데이터를 LLM과 GraphRAG로 묻고 답하는 챗봇입니다. 질문하면 차트와 설명을 함께 돌려줍니다.'], ['로컬 실행', '외부 API 없이 로컬 EXAONE 3.5 모델로 동작하고, 데이터와 코드를 폴더 하나로 묶어 Mac mini에서도 시연합니다.']] } },
    { route: '/level10', line: 'dgx1', name: 'AI 패널 설문 에이전트', live: 'https://ai.marketlink.co.kr/level10', summary: '한국어 페르소나를 입힌 LLM이 브라우저로 웹 설문을 끝까지 진행합니다.', project: 'AI 패널 설문 에이전트 (LV10)' },
  ];

  const stationId = (s) => 'st-' + s.route.replace(/\W/g, '');

  export { allProjects, stations, lines, stationId };