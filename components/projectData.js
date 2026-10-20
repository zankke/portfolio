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
      desc: "한국어 페르소나를 입힌 LLM이 브라우저를 조작해 웹 설문을 처음부터 끝까지 진행합니다.",
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
      tech: "Python, RLHF, LLM, MySQL 8 (EAV), SQLAlchemy, pandas, RapidFuzz, EasyOCR, Playwright, Google/Naver 검색 API, openpyxl",
      desc: "상품 속성 673,122셀을 값 · 신뢰도 · 근거와 함께 저장하는 EAV 시스템입니다. 평균 신뢰도 0.866으로 계약 기준(0.85)을 넘기고 사람이 확정한 값으로 모델을 다시 학습시킵니다(RLHF).",
      image: "/images/prjLotteSKU.jpg",
      link: "https://ai.marketlink.co.kr/lotte/v2/v/34b6c4e135c5a187152b3b57103a83ab/eav_system_intro.html",
      linkLabel: "시스템 소개서",
      longDesc: `
        **파이프라인:** 원장 적재 → 정책 정의 → 근거 수집 → 값 결정 · 신뢰도 → 사람 검수 → 납품 · 검증
        **규모:** 마스터 55,546행, 정제 대상 SKU 53,102행, 납품 SKU 51,752행, 18개 카테고리(스낵, 비스킷, 캔디, 젤리, 초코, 빵, 빙과 등), 셀 673,122개
        **EAV 구조:** 상품 · 속성 · 값에 신뢰도(0~1)와 근거를 붙여 한 줄씩 저장합니다. 새 속성은 열 추가 없이 행만 늘어납니다. 정책은 카테고리 × 속성 133쌍, 허용값 781개입니다.
        **근거 채널 8종:** 규칙 · 상품명 키워드, 기존 분류, 학습 모델, LLM 판정, 웹 검색, 공개 데이터, 이미지 OCR, 사람 검수. 근거가 일치하고 검증된 근거일수록 신뢰도가 오르고, 충돌하면 낮춰 검수로 보냅니다.
        **품질:** 신뢰도 0.85 이상은 자동 확정, 미달 · 미채움은 Human QA 큐로 보냅니다. 확정 75.2%(AI 436,612 · 사람 69,904셀), 평균 신뢰도 0.866으로 계약 기준 0.85를 충족합니다.
        **RLHF:** 사람이 확정한 값(신뢰도 0.90 이상)이 정답이 되어 학습 모델을 다시 학습시키고, 강화된 모델이 다음 속성판단에 쓰입니다.
        **거버넌스:** 원본 원장과 이미지는 바꾸지 않습니다(원본 변경 0건). 일괄 반영은 기본이 미리보기이고 태그 단위로 되돌릴 수 있으며, 평균 신뢰도를 낮추는 변경은 사전 승인을 받습니다.
        **검증:** 매 갱신마다 정합성 검사 15개를 통과한 스냅샷만 대시보드에 게시합니다. 판정마다 값 · 메모 · 근거 URL · 검수자가 이벤트로 남고, 같은 요청은 중복 반영되지 않습니다.
      `,
      category: 'Automation',
    },
    {
      title: "MARKETLINK-AX 온프레미스 AI 플랫폼 (NVIDIA DGX Spark ×2)",
      tech: "NVIDIA DGX Spark(GB10) ×2, Nginx, Let's Encrypt, Docker, Ollama LB, FastAPI · Next.js · Vite",
      desc: "서비스 26개와 엔드포인트 132개를 도메인 하나로 묶은 사내 AI 플랫폼입니다. DGX 두 노드 클러스터에서 운영합니다.",
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
      title: "MarketLink Consumer Survey Center",
      tech: "KoBERT, GPT-4, 설문 응답 분류, CSV 처리",
      desc: "설문 주관식 응답에 코드를 자동으로 붙이는 분류 AI를 설계했습니다.",
      image: "/images/prjOpenSurvey.png",
      longDesc: `
        **맡은 일:** 설문 주관식 응답에 코드를 자동으로 붙이는 분류 AI를 설계했습니다.
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
      desc: "Claude API, 해시태그 생성, Google Sheet API를 연동한 파이프라인으로 SNS 포스트를 자동 생성합니다.",
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
      desc: "한국교총 종합교육연수원 웹사이트를 전면 개편했습니다. 반응형·적응형 웹을 만들고 FLASH 콘텐츠를 변환하고 LMS 기능을 고쳐 운영 효율을 높였습니다.",
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
    { route: '/lotte', line: 'dgx1', results: [['673,122셀', '속성 정제'], ['0.866', '평균 신뢰도 (계약 기준 0.85)'], ['75.2%', '확정 비율 (AI · 사람)']], name: 'Lotte웰푸드 EAV System', live: 'https://ai.marketlink.co.kr/lotte/v2/dashboard.html', summary: '상품 속성 673,122셀을 신뢰도 · 근거와 함께 정제합니다. 사람이 확정한 값으로 모델을 다시 학습시키는 RLHF 구조입니다.', project: 'Lotte웰푸드 EAV System' },
    { route: '/ocr', line: 'dgx1', access: 'login', live: 'https://ai.marketlink.co.kr/ocr/landing/', results: [['278,528건', '처리한 영수증'], ['97.1%', '수록률'], ['89만 행', '추출한 상품']], name: 'Receipt Intelligence (영수증 OCR)', summary: '영수증 278,528건에서 상품 단위 구매 데이터 89만 행을 뽑아냅니다.', detail: { image: '/images/stations/ocr.jpg', tech: 'Python, PaddleOCR PP-OCRv5, Ollama (gemma4, Qwen3.6 27B), rembg, scikit-learn (TF-IDF · LinearSVC), Next.js 15, React 19, SQLite', facts: [
      ['개요', 'Receipt Intelligence는 영수증 이미지에서 상품 단위 구매 데이터를 뽑아내는 배치 파이프라인과 OCR 결과 검수 대시보드입니다. 영수증 OCR, LLM 구조화, 품질 검증을 한 화면 흐름으로 묶었습니다.'],
      ['파이프라인', 'PaddleOCR(CPU) 스윕 → gemma4 텍스트 파싱 → Qwen3.6 · rembg 재시도 → 후처리 · 카테고리 분류 → 12컬럼 엑셀 · 검수 대시보드'],
      ['처리 규모', '월별 6개 배치에서 영수증 278,528건 중 270,341건(97.1%)을 수록하고 상품 893,137행을 뽑았습니다. 첫 배치 62,140건은 약 3일 만에 끝냈습니다(이미지 VLM 단독 추정 25일).'],
      ['OCR 튜닝', '방향 분류기를 끄고 검출 입력을 키웠습니다. 500장 A/B에서 브랜드 인식이 200건에서 351건으로 늘었습니다.'],
      ['LLM 구조화', 'gemma4가 OCR 텍스트를 JSON 스키마로만 답하게 하고 Pydantic으로 검증합니다. 실패한 영수증은 Qwen3.6 27B로 다시 파싱하고, 배경을 지운(rembg) 이미지로 다시 읽어 더 나은 쪽을 고릅니다.'],
      ['카테고리 분류', '라벨 387,593행으로 학습한 TF-IDF + LinearSVC가 134개 카테고리로 나눕니다. 홀드아웃 정확도는 91.5%(대분류 95.6%)입니다.'],
      ['검수', '대시보드에서 영수증 이미지와 추출 셀을 나란히 보고 바로 고칩니다. 수정 이력은 따로 기록하고, 미탐지 · 이상 · 저신뢰 행은 플래그 필터로 걸러 보고, 검수한 결과는 Excel · CSV로 내보냅니다.'],
      ['버린 방법', '이미지를 VLM에 바로 넣으면 영수증을 통째로 지어내 폐기했습니다. 이미지를 줄이면 날짜 정확도가 75%에서 42%로 떨어져 쓰지 않았습니다.'],
      ['운영', 'DGX 두 대와 MacBook이 목록의 양 끝에서 나눠 파싱하고, GPU 온도가 78°C를 넘으면 동시 처리 수를 줄입니다. 중단해도 영수증 단위로 이어서 실행합니다.'],
    ] } },
    { route: '/master', line: 'dgx2', results: [['348개', '통과한 테스트 (백엔드 273 · 프런트엔드 75)']], name: 'CategoryMaster Agents', summary: '카테고리 마스터 데이터를 정리하는 에이전트입니다.', detail: { image: '/images/stations/master.jpg', tech: 'FastAPI, SQLAlchemy, MySQL 8, React, Vite, TypeScript, Caddy', facts: [['개요', '바코드로 상품의 카테고리와 제조사를 분류하는 AI 파이프라인입니다. 엑셀로 하던 수작업을 대신합니다.'], ['분류 방식', '저렴하고 믿을 만한 조회부터 LLM까지 순서대로 시도하고 신뢰도가 낮은 결과는 사람이 검수하도록 넘깁니다.'], ['학습', '검수에서 고친 결과를 다시 반영해 갈수록 LLM을 덜 씁니다. 배치 진행 상황을 실시간으로 보여 주고 중단할 수 있습니다.'], ['품질', '백엔드 테스트 273개, 프런트엔드 테스트 75개가 통과합니다.']] } },
    { route: '/meatlink', line: 'dgx2', results: [['18개', '판독 항목'], ['0.3초', '사진 1장당 판독'], ['2,740장', '판독한 사진']], name: 'Meatlink AI Hub', summary: '축산물 구매 사진에서 18개 항목을 판독합니다.', detail: { image: '/images/stations/meatlink.jpg', tech: 'React, FastAPI, MySQL, Docker, Ollama (로컬 비전 LLM)', facts: [['개요', '축산물 구매 사진을 자동으로 판독하고 메타데이터를 실시간으로 검수하는 SaaS입니다.'], ['판독', '영수증과 라벨 사진 1,370쌍(2,740장)에서 구매일, 부위, 등급, 원산지, 가격 등 18개 항목을 사진 1장당 0.3초에 추출합니다.'], ['검증', '정부 할인행사(농할대전 등)를 따로 분리하고 축산물 이력제(mtrace)와 연동해 확인합니다.']] } },
    { route: '/ssm', line: 'dgx1', access: 'login', results: [['349만 건', '카드 거래'], ['224,061곳', '가맹점'], ['18개월', '분석 기간']], name: 'SSM Intelligence', summary: '카드사 빅데이터 349만 건으로 소형 슈퍼마켓 시장을 분석합니다.', detail: { image: '/images/stations/ssm.jpg', tech: 'Python, ECharts, Node.js, 로그인 인증', facts: [['개요', 'SSM Intelligence Platform에서 카드사 빅데이터로 소형 슈퍼마켓 시장을 분석합니다.'], ['데이터', '카드사 6곳, 18개월(2025.01~2026.06), 349만 건, 가맹점 224,061곳의 거래를 집계했습니다.'], ['구성', '시장 대시보드, 브랜드 분석 리포트, AI 어시스턴트, 트렌드를 하나의 허브로 묶었습니다.']] } },
    { route: '/sosop', line: 'dgx2', results: [['3종', '산출물 (HTML · PDF · PPTX)'], ['6단계', '단계별로 다시 실행하는 파이프라인']], name: 'SOSOP', summary: '설문 파일 한 장으로 HTML, PDF, PPTX 리포트를 만듭니다.', project: '[SOSOP] 소상공인 경쟁력 평가 리포트 자동화 시스템' },
    { route: '/builder', line: 'dgx1', results: [['18종 전부', '판단 가능한 모듈 (설문 구성 가이드 기준)'], ['10개', '정규화하는 문항 유형']], name: 'SurveyBuilder', summary: 'docx, hwp 설문지를 올리면 AI가 웹 설문으로 만들어 줍니다.', live: 'https://ai.marketlink.co.kr/builder', detail: { image: '/images/stations/builder.jpg', tech: 'Next.js, TypeScript, LLM 문서 분석', facts: [['개요', '설문 빌더 SaaS(v2.0)입니다. docx나 hwp 설문지를 올리면 AI가 분석해 웹 설문으로 셋업합니다.'], ['자동 구성', '웹 화면 구성, 분기와 스킵 조건, 수집 쿼터를 한 번에 설정합니다.'], ['규칙', '한국어 설문지 표기 규칙과 18종 모듈을 정의하고 파서와 리포트, 응답 화면이 같은 규칙 문서를 따르도록 맞췄습니다.'], ['모듈 판단', '설문 구성 가이드가 정의한 모듈 18종(Radio, CheckTable, SumValue, Recorder 등)을 모두 인식해 문항 유형 10개(단일 · 복수 선택, 척도, 그리드, 순위, 숫자, 상수합, 주관식, 설명, 숨김)로 바꿉니다. 처음 보는 모듈이 나와도 멈추지 않고 검수 대상으로 표시합니다.']] } },
    { route: '/datalink', line: 'dgx2', results: [['68,767건', '분석한 리뷰 (Steam · Reddit)']], name: 'DataLink', summary: '게임 이용자 리뷰 68,767건의 감성과 키워드를 분석합니다.', detail: { image: '/images/stations/datalink.jpg', tech: 'Python, React, Vite, sentence-transformers, RAG, Ollama (gemma4)', facts: [['RAG', '리뷰를 다국어 임베딩(MiniLM)으로 벡터화해 코사인 유사도 상위 5개를 근거로 찾고 로컬 gemma4가 답합니다. 실패하면 Gemini, Claude 순으로 넘어갑니다.'], ['개요', '게임 이용자 리뷰를 모아 감성과 키워드를 분석하는 리서치 포털입니다. 첫 화면은 PUBG Intelligence Dashboard입니다.'], ['분석', 'Steam과 Reddit 리뷰 68,767건으로 감성 점수, 키워드, 카테고리, 감정 분석, 요약 리포트를 뽑습니다.'], ['기능', 'DataChat으로 데이터에 질문하고 해외 한국 게임 이용자 조사 분석을 볼 수 있습니다.']] } },
    { route: '/shorts', line: 'dgx1', results: [['약 21원', '클립 1편 원가'], ['88.5%', '클립 매출총이익률']], name: 'OpenShorts', summary: '긴 영상을 바이럴 숏폼으로 잘라 주는 구독형 SaaS입니다.', project: '[SnapShorts] OpenShorts AI 숏폼 SaaS' },
    { route: '/nh', line: 'dgx2', access: 'login', results: [['564만 행', '실제 판매 자료 (91순기)'], ['30개', '메뉴 (6개 그룹)'], ['4개 등급', '등급별 화면 · API 잠금']], name: '농협 주류 협력사 데이터 분석 포털', summary: '주류 협력사가 로그인해 등급에 맞는 매출과 시장 흐름을 분석합니다.', live: 'https://ai.marketlink.co.kr/nh/login?next=%2Fdashboard', detail: { image: '/images/stations/nh.jpg', tech: 'Next.js 16 (App Router), MySQL 8, ECharts, SQL Server 동기화(ETL), systemd', facts: [
      ['개요', '농협 하나로마트 주류 협력사용 데이터 분석 포털입니다. 협력사는 로그인해 자기 등급과 권한 범위의 매출 · 시장 자료를 보고, 관리자는 자료와 계정을 운영합니다.'],
      ['자동 동기화', '원격 DB 비교 → 바뀐 순기만 가져오기 → 원본 확인 → 앱 반영 → 검증 · 기록'],
      ['데이터', '순기(10일) 단위 실제 판매 자료 5,641,909행(91순기, 매장 2,081 · 상품 902)과 대형마트 · 체인슈퍼 시장 자료 636,090행으로 움직입니다. 가상 자료는 모두 걷어냈습니다.'],
      ['동기화 안전장치', '매일 새벽 원격 DB에서 바뀐 순기만 읽기 전용으로 가져옵니다. 순기별 건수와 숫자 열 합계가 원격과 일치할 때만 반영하고, 반영 뒤 16가지를 검증합니다. 새 자료가 없는 날은 31초, 한 순기가 바뀐 날은 약 6분 걸립니다.'],
      ['등급', '라이트 · 베이직 · 스탠다드 · 프리미엄 4개 등급이 열 수 있는 기능을 관리자가 한 표에서 정합니다. 못 여는 화면은 메뉴와 화면에 같은 방식으로 잠금을 표시하고, 조회 API도 서버에서 403으로 막습니다.'],
      ['화면', '메뉴 30개(6개 그룹)에서 순기별 매출 · 매입, 시도 · 시군구 매출 지도, 카테고리 · 제조사 성장 요인, 경쟁점 실적 추이, 가격대 트렌드, 주류 뉴스 · 통계를 봅니다. 협력사용 화면은 업체 · 상품 · 매장 이름 없이 집계만 보여 줍니다.'],
      ['AI 분석 보고서', '공개 통계 · 뉴스 · 검색 트렌드로 월간 시장 보고서 초안을 매월 자동으로 만들고, 관리자가 검토한 것만 게시합니다. 해외 주류 기사는 자동으로 모아 한국어 제목으로 보여 줍니다.'],
      ['품질', '자동 테스트 367개를 통과하고 타입 오류는 0건입니다. 등급별 임시 계정으로 메뉴 잠금, 화면 잠금, API 차단을 확인했습니다.'],
      ['배포', '배포 스크립트가 빌드 전 이전 빌드를 백업하고 실패하면 자동으로 되돌립니다. 배포 뒤에는 로그인 화면과 보호 페이지 응답을 자동으로 확인합니다.'],
    ] } },
    { route: '/hpx', line: 'dgx2', access: 'login', results: [['324개', '점포 마스터'], ['349만 행', '카드 매출 (18개월)'], ['277만 개', '반경 분석 시설']], name: 'HPX 상권 분석 플랫폼', summary: '홈플러스 익스프레스 점포의 상권과 경쟁점, 카테고리를 반경별로 분석합니다.', live: 'https://ai.marketlink.co.kr/hpx/login', detail: { image: '/images/stations/hpx.jpg', tech: 'Python, FastAPI, PostgreSQL 16 + PostGIS 3.4, MapLibre GL JS, ECharts, Tailwind CSS, Ollama (gemma4, embeddinggemma), Headless Chromium', facts: [
      ['개요', '홈플러스 익스프레스 점포의 상권 · 카테고리 분석 플랫폼입니다. 본사 운영 · MD · 점포개발 팀이 점포를 찾아 반경별 지표를 읽고, 점포끼리 비교하고, 보고서로 내보냅니다.'],
      ['분석 흐름', '점포 검색 → 기준월 · 반경 설정 → 지도 · 핵심 지표 → 카테고리 진단 · 점포 비교 → PDF 보고서'],
      ['상권 분석', '반경 100m · 300m · 500m · 1km를 누적이나 링으로 바꿔 보며 경쟁점 브랜드 구성, 주변 시설, 카드 관측 매출과 전년 대비 추이, 인구 · 가구 추정을 봅니다. 2~5개 점포를 같은 조건으로 비교할 수 있습니다.'],
      ['데이터', '카드 매출 3,494,543행(18개월, 가맹점 224,061곳), 소상공인 상가정보 시설 2,772,484개, SGIS 집계구 108,510개를 PostGIS에 적재했습니다. 점포는 이름 정규화와 500m 좌표 군집으로 묶어 324개 마스터를 만들었습니다.'],
      ['인구 추정', '반경 원과 집계구가 겹치는 면적 비율로 인구와 가구를 나누고, 비공개 값 비중이 5%를 넘으면 숨깁니다.'],
      ['인텔리전스 챗', '로컬 Ollama(gemma4)만 쓰는 RAG 챗봇입니다. 점포 검색, 상권 요약, 경쟁점, 점포 비교 등 도구 11개를 호출해 답하고, 임베딩(embeddinggemma)과 pg_trgm 키워드 검색을 섞어 근거를 찾습니다.'],
      ['검증 원칙', '종합 점수와 매출 예측은 검증을 마칠 때까지 끄고, 운영 개선 제안은 규칙 기반으로만 보여 줍니다.'],
      ['보고서 · 관리', '비동기 작업으로 PDF · CSV · XLSX 보고서를 만들고(헤드리스 Chromium), 관리자 화면에서 데이터셋 업로드, 릴리스 게이트와 롤백, 검수 큐, MFA를 다룹니다. 접속 · 조회 · 다운로드는 감사 로그로 남깁니다.'],
      ['지도', 'MapLibre GL에 쓰는 벡터 타일을 서버에서 직접 만들어 내보냅니다.'],
    ] } },
    { route: '/sales', line: 'dgx1', name: 'Sales Lead Monitor', summary: '영업 리드를 한 화면에서 추적하는 대시보드입니다.', detail: { image: '/images/stations/sales.jpg', tech: 'React, Vite, Tailwind CSS 4, Python 크롤러', facts: [['개요', '대시보드에서 정부·공공기관 지원사업 공고를 모아 영업 리드로 관리합니다.'], ['수집', 'K-Startup, 기업마당, NIPA, KOCCA, SMTECH의 모집 공고를 키워드 대신 전수로 수집해 제목을 모두 검토합니다.'], ['분류', 'A/B/C 우선순위와 마감 임박(3일 이내)을 표시하고, 재조사 때는 신규·변경·종료 공고만 갱신합니다.'], ['접근성', 'WCAG 2.2 AA 기준으로 색만으로 상태를 전달하지 않습니다.']] } },
    { route: '/studio', line: 'dgx2', name: 'AI Studio', summary: '이미지 · 영상 생성, 프롬프트 도구, 갤러리, 크레딧 결제를 한 워크스페이스에서 합니다.', detail: { image: '/images/stations/studio.jpg', tech: 'React 19, Vite, TypeScript, Tailwind CSS, Node.js (Express 5), Sequelize, MySQL, JWT, Stripe, OpenAI GPT-4o, Gemini, Replicate (Veo 3), sharp', facts: [
      ['개요', 'mLAB AI Studio는 생성형 크리에이티브 워크스페이스입니다. 텍스트 · 이미지로 이미지와 영상을 만들고 프롬프트를 다듬어 갤러리에서 관리합니다.'],
      ['생성 흐름', '프롬프트 작성 → GPT-4o 최적화 · 한영 번역 → 이미지 · 영상 생성 → 갤러리 저장'],
      ['생성 도구', 'Text → Image, Image → Image(상품 · 패션 · 캐릭터 모드, 스타일 · 조명 · 렌즈 프리셋), 이미지 편집, Text/Image → Video(드론 · 오빗 · FPV 등 카메라 무빙 6종)를 쓸 수 있습니다.'],
      ['모델 라우팅', '이미지는 사내 GPU 생성 서비스를 먼저 쓰고 실패하면 Gemini 이미지 모델로 넘어갑니다. 영상은 Replicate의 Veo 3 · Veo 2 · Stable Video Diffusion을 씁니다.'],
      ['한글 정확도', '이미지 안에 들어갈 한글 문구가 입력한 그대로 나오도록 생성 프롬프트에 텍스트 보호 규칙을 붙입니다.'],
      ['프롬프트 도구', '이미지 · 영상 프롬프트 생성기, 스트리밍 최적화, 참고 이미지를 분석해 프롬프트로 바꾸는 기능이 있습니다.'],
      ['갤러리', '메이슨리 그리드, 좋아요, 워터마크, sharp로 만든 서버 썸네일을 갖췄습니다.'],
      ['결제 · 계정', 'Stripe 결제와 웹훅으로 크레딧을 충전하고 작업별로 크레딧을 차감합니다(이미지 1 · 변환 2 · 편집 3 · 영상 3). JWT 로그인과 역할(사용자 · 관리자)을 둡니다.'],
      ['운영', '관리자 대시보드에서 사용자, 기능 플래그, 업데이트 공지, 헬스 · 로그 · 실시간 통계를 관리합니다.'],
    ] } },
    { route: '/fish', line: 'dgx1', name: '수산물 챗봇', summary: 'GraphRAG 챗봇. 로컬 EXAONE은 Neo4j가 계산한 숫자를 설명만 합니다.', detail: { image: '/images/stations/fish.jpg', tech: 'Python, Streamlit, Neo4j, Cypher, Ollama (EXAONE 3.5), GraphRAG', facts: [['GraphRAG', '질문을 분석으로 라우팅하고 Neo4j 지식 그래프에 Cypher를 실제로 실행합니다. 화면에 보이는 Cypher가 그 숫자를 낸 질의 그대로입니다.'], ['환각 방지', 'LLM에는 계산이 끝난 집계값만 넘깁니다. 원본 행 데이터는 서버 밖으로 나가지 않습니다.'], ['검증', '질문 40문항 벤치마크로 정답 · 오답 · 폴백을 나눠 GraphRAG 도입 전후를 비교합니다.'], ['개요', '수산물 데이터를 LLM과 GraphRAG로 묻고 답하는 챗봇입니다. 질문하면 차트와 설명을 함께 돌려줍니다.'], ['로컬 실행', '외부 API 없이 로컬 EXAONE 3.5 모델로 동작하고 데이터와 코드를 폴더 하나로 묶어 Mac mini에서도 시연합니다.']] } },
    { route: '/level10', line: 'dgx1', name: 'AI 패널 설문 에이전트', live: 'https://ai.marketlink.co.kr/level10', summary: '한국어 페르소나를 입힌 LLM이 브라우저로 웹 설문을 끝까지 진행합니다.', project: 'AI 패널 설문 에이전트 (LV10)' },
  ];

  const stationId = (s) => 'st-' + s.route.replace(/\W/g, '');

  export { allProjects, stations, lines, stationId };