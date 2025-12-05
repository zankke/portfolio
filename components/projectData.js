const allProjects = [
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
    {
      title: "[MyouV] Kpop + AI Platform",
      tech: "RockyLinux, Nginx, React+Bite, FastAPI Backend, MySQL, Google Veo3 API, Docker, github, Google Cloud Run CI/CD,",
      desc: "Kpop Music 활용, Longform Video 생성 & Fandom Community 공유 플랫폼",
      image: "/images/prjMyouV.png",
      longDesc: `
        **핵심 역할:** 플랫폼 개발 총괄, System 구축(NCP, GCP), 백엔드 & 인증 구조 설계, Video 생성 Backend API 개발
        **주요 성과:** SeriesA 투자 유치 성공
      `,
      category: 'Web, PWA'
    },
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

  export { allProjects };