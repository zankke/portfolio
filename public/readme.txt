#### [한국교총]'반응형 웹 개편/컨텐츠 변환/운영 유지보수 사업'
과업 수행 목표: 'TOP 교원 연수 사이트로 Re-Positioning'을 목표로 하며, 2020 KERIS 연수원 평가 대비 요구조건 반영, 모바일 대응 사이트 개편, FLASH 지원 종료에 따른 대응, LMS/LCMS 기능 개선, 이용자 유입 확대를 위한 UX/UI 개선 등을 포함합니다.
주요 과제 및 진행 결과 요약 (2020.11.05일 기준):
종합교육연수원 반응형 웹 전면 개편 (www.kftaedu.or.kr): 5월 31일 완료되었으며, 운영 지원이 진행 중입니다.
원격교육연수원 "사제동행" 1차 개편 (리뉴얼): 3월 30일 완료되었으며, 교육 이수 조건 변경 반영 및 디자인 전면 리뉴얼 등이 이루어졌습니다.
원격교육연수원 "사제동행" 2차 개편 (반응형 웹): 개발 진척율 90%로, 연내(12월 2주 이내) 완료를 목표로 진행 중입니다.
FLASH 컨텐츠 변환: 계획된 1,800차시(80개 과정 이내) 대비 실제 1,802차시(75개 과정)가 진행되었으며, 진행율은 93%입니다.
원격교육연수원 사제동행 1차 리뉴얼 개편 (2020.01.02~2020.3.28): 디자인 리뉴얼 전면 개편, PC 가로 폭 가변 확대, LMS 연수 이수 조건 변경 개발이 수행되었고, 완료 후 운영 유지 보수가 지원 중입니다.
LMS 연수 이수 조건 변경 개발 (1차 개편 관련):
1, 2학점 과정의 경우, 기존의 '학습 참여(20점)'와 '설문(20점)'이 삭제되고, '의견 등록(신설, 40점)'이 추가되었으며, 온라인 시험은 60점으로 유지되었습니다.
4학점 과정의 경우, 기존의 '진도 점수(10점)'가 삭제되고, '온라인 시험'이 10점에서 20점으로 변경되었습니다. 진도율은 80% 이상에서 90% 이상으로 변경되었습니다.
이수 기준은 '총점 60점 이상 / 진도율 90% 이상'으로 명시되었습니다.
종합교육연수원 적응형 웹 전면 개편 (2020.03.02~2020.05.31): 적응형 웹으로 전면 개편이 완료(100%)되었으며, 운영 지원이 진행 중입니다.
FLASH 교육 과정 변환 (2020.02.01~2020.12.31): FLASH 컨텐츠를 HTML5 및 MP4 형식으로 변환하는 작업이 진행되었으며, 연내 완료 예정(93%)입니다.
외부 연동 모듈 변경: 결제 모듈이 이니시스(INICIS)에서 NHN KCP로, 문자메시지(SMS) 모듈이 KCT(한국케이블텔레콤)에서 와이즈캔(WISECAN)으로 변경되었습니다.
추가 개발 사항: 당초 FLASH 원본 퀴즈를 MP4로 변환했으나, 사용자 상호작용이 필요한 별도 포맷으로 과정 평가(퀴즈) 기능이 추가 개발(차시당 평균 3페이지)되었고, 학습 자료 다운로드 링크도 별도 페이지로 개발(차시당 평균 2페이지)되었습니다.
시스템 구성: 원격교육연수원 '사제동행'은 Web 서버(2대), Contents 서버, LMS 서버, DB 서버(1대, MS-SQL 2012)로 구성되어 있으며, 종합교육연수원은 Web 서버(1대), DB 서버(1대, ORACLE)로 구성되어 있습니다.

# 운영 체제 (Operating System):
Windows Server 2012 R2 Standard
웹 서버 (Web Server):
IIS 8.5 (Internet Information Services Version 8.5.9600.16384)
원격교육연수원 '사제동행': Web 서버 2대 (Active-Active, Load Balancing 적용)
종합교육연수원: Web 서버 1대
데이터베이스 (Database):
원격교육연수원 '사제동행': MS-SQL 2012 (DB 서버 1대)
종합교육연수원: ORACLE (DB 서버 1대)
개발/스크립트 언어:
ASP (Active Server Pages) (주요 파일명에 .asp 확인)
HTML5 (FLASH 컨텐츠 변환 결과)
JavaScript (다양한 .js 파일 확인: common.js, function.js, mobile.js, quiz.js, vControl.js, jquery.js 등)
CSS (스타일링: common.css, navi.css, quiz.css 등)
기타 기술:
CDN (Contents Delivery Network)
.NET Framework (버전 4.0.30319.42000)
2. 주요 모듈 및 연동 시스템 (Key Modules & Integrations)
결제 모듈 (Payment Gateway, PG):
변경 전: 이니시스 (INICIS)
변경 후: NHN KCP
문자메시지(SMS/LMS/MMS) 모듈:
변경 전: KCT (한국케이블텔레콤)
변경 후: 와이즈캔 (WISECAN)
3. 주요 프로젝트 기술 과제 (Key Project Technical Tasks)
웹 사이트 개편:
반응형 웹 (Responsive Web): 원격교육연수원 '사제동행' 사이트 2차 전면 개편
적응형 웹 (Adaptive Web): 종합교육연수원 사이트 전면 개편
컨텐츠 변환:
FLASH 기반 교육 과정 컨텐츠를 HTML5 및 MP4 형식으로 변환
추가 개발: FLASH 원본 퀴즈를 사용자 상호작용이 필요한 별도 포맷으로 재개발 (차시당 평균 3페이지) 및 학습 자료 다운로드 링크 별도 페이지 개발 (차시당 평균 2페이지).
LMS 기능 개발 (연수 이수 조건 변경):
KERIS 연수 이수 조건 변경에 따른 LMS 시스템 재개발.
1, 2학점 과정: '학습 참여', '설문' 항목 삭제, '의견 등록' (40점) 항목 신설.
4학점 과정: '진도 점수' 삭제, '온라인 시험' 점수 10점에서 20점으로 변경.
이수 기준: 총점 60점 이상 / 진도율 90% 이상으로 통일.
학습 진도 체크 로직 개발 및 적용.
4. 기타 개발/개선 사항
검색엔진 최적화 (SEO): 기초 마련
운영 자동화: 수강연기/취소/과목변경 자동화 처리 및 관리자 페이지 구현, 자격증 발급 프로세스 개선 (회원 직접 발급/관리자 발급 후 전송 2-Way), 단체 신청 시 자동 견적서 출력 및 실시간 단체 결제 DB 관리.
사용자 편의 기능: NICE 개인번호 자동 입력 (수강신청 시 재입력 불필요), 포인트 적립/차감 오류 개선, LMS 관리자 화면 개선.



보유 자격
정보처리기사 (한국산업인력공단, 2003년)
IT 엔지니어링 및 시스템 설계 역량을 공인받은 국가기술자격.
💡 주요 프로젝트 및 역할
1️⃣ AI Video Generation Framework
기여 영역: AI 기반 영상 자동 생성 플랫폼 기획 및 아키텍처 설계
주요 기능: 시놉시스 → 시나리오 → 콘셉트 → 영상/오디오 생성까지 End-to-End Workflow 구현
성과: 콘텐츠 생성 자동화로 약 생산성 60% 이상 향상
기술 스택: Python, Node.js, REST API, JSON 파이프라인
2️⃣ Edge&Next 의료정보 통합 플랫폼
역할: 시스템 설계 및 백엔드 통합
주요 업무:
병원 EMR(전자차트) 연동 및 신약정보 조회 UI 개발
Proxy 기반 다단 인증 구조 설계 (CentOS / Apache2 / Nginx / PHP 7.4)
특징: 실시간 DB 복제(Replication) 구조로 고가용성 확보
3️⃣ Sales Admin System v3.0
기여도: SaaS형 영업관리 시스템 (Sales Dashboard)
주요 기능:
매출 및 목표 실적, 수익률 시각화
팀별, 광고주별 리포트 자동 생성
AI 캠페인 성과 분석 시스템 탑재 (자연어 질의 기반 분석)
성과: 분석 효율 193% 향상, 데이터 분석 자동화 구축
4️⃣ MarketLink Consumer Survey Center
역할: 조사자동화 AI 시스템 설계 및 구현
기술 요소:
KoBERT + GPT-4 기반 설문 응답 분류 자동화
CSV → Code 분류 → Keyword 통계/시각화 자동 처리
성과: 기존 인력 대비 데이터 처리 속도 150배 향상
5️⃣ Kakaopay Securities Dashboard
기여도: 데이터 로그 분석 및 트래픽 모니터링 시스템 구축
주요 성과:
Apache-Tomcat 기반 로그 파이프라인 구축
실시간 서비스 상태 모니터링 및 장애 예측 모델 도입
6️⃣ 교육연수원 및 e-Learning 플랫폼 개발
주요 기능:
모바일 반응형 웹 구현 (교육신청, 이수증 발급, 커뮤니티)
네이티브 UX를 고려한 국공립 연수관리 UI 설계
성과: 월간 사용자 수 30% 증가, 서버 부하 25% 감소
7️⃣ AI 기반 콘텐츠 자동 생성 워크플로우
주요 기술:
Claude API, Hashtag Generation, Google Sheet API 연동
이미지/텍스트 자동화 기반 SNS 콘텐츠 생성
성과:
포스트 생성 자동화 파이프라인 구축 (기획 → 해시태그 → 이미지 → 업로드)
마케팅팀 작업시간 70% 단축
🧠 핵심 역량
AI & LLM 활용 자동화 설계: ChatGPT, Claude, KoBERT 등 적용 경험
데이터 파이프라인 구축: Google API, n8n, JSON Workflow 설계
백엔드 및 프론트엔드 통합 역량: Python, Node.js, PHP, Vue.js
시스템 아키텍처 설계: 고가용성 환경(Load Balancer, Replication) 구축
🏆 성과 요약
AI 자동화 프로젝트 다수 수행 → 콘텐츠 생성/데이터 분석 효율 평균 150% 향상
의료, 금융, 교육 등 B2B SaaS 플랫폼 구축 경험 풍부
데이터 시각화 기반의 BI 시스템 설계 및 운영 역량 보유

1. 소개 (Intro)
이름 / 주요 경력 요약
정보처리기사 자격 보유 (한국산업인력공단 인증)
핵심 역량: AI 기반 자동화, 데이터 파이프라인, 백엔드 + 프론트 통합 설계
💼 2. 주요 프로젝트 하이라이트
프로젝트명
핵심 역할
주요 성과
AI Video Generation Framework
AI 영상 자동 생성 플랫폼 기획 및 설계
콘텐츠 제작 효율 60% ↑
Edge&Next 의료정보 통합 플랫폼
백엔드 & 인증 구조 설계
실시간 EMR 연동, 고가용성 확보
Sales Admin v3.0
BI + AI Dashboard 구축
데이터 분석 효율 193% 향상
MarketLink Survey Center
설문 코드 자동 분류 AI 설계
데이터 처리 속도 150배 향상
Kakaopay Securities Dashboard
시스템 운영 로그 분석 및 시각화
서비스 안정성 100% 유지
교육연수원 e-Learning 시스템
반응형 웹/UX 설계
월간 사용자 30% 증가

⚙️ 3. 기술 스택
Backend: Node.js, Python (FastAPI), PHP 7.4
Frontend: Vue.js, React, HTML5
Database: MySQL, MariaDB, SQLite
Infra/DevOps: Nginx, CentOS, Docker, LoadBalancer
AI/ML Tools: KoBERT, GPT-4, Claude API, TensorFlow
Cloud Platform: AWS, Google Cloud
Automation & Report: Google Sheets API, n8n, OpenAPI
📊 4. 성과 기반 데이터
프로젝트 자동화로 작업시간 평균 70% 단축
데이터 기반 마케팅 리포트 실행 정확도 95% 달성
SaaS형 AI 시스템 구축 → 반복 업무 자동화율 80%
🧩 5. 향후 목표
LLM 기반 데이터 분석 & 시각화 자동화 역량 확장
B2B SaaS 시스템의 고도화 및 AI Ops 통합 추진
산업별 맞춤형 AI 플랫폼 컨설팅 및 고도화 지원