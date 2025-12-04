import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true, // Animation only triggers once
    threshold: 0.1,    // Percentage of the component visible to trigger
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const timelineEvents = [
    {
      year: "2021~현재",
      title: "베리타스커넥트 – 생성형 AI 플랫폼 및 LLM 인프라 구축",
      description: "AI 기술을 활용한 비즈니스 자동화 및 데이터 기반 서비스 구현 주도.",
    },
    {
      year: "2018~2021",
      title: "아이너스 – 고객소통플랫폼·LMS 시스템 PM",
      description: "고객 소통 및 학습 관리 시스템 전반의 프로젝트 관리 및 개발.",
    },
    {
      year: "2015~2018",
      title: "CJ E&M – 글로벌 디지털 스폰서십 및 미디어 솔루션",
      description: "글로벌 시장을 위한 디지털 스폰서십 전략 수립 및 미디어 솔루션 개발.",
    },
    {
      year: "2009~2015",
      title: "메조미디어 – 광고 플랫폼 및 데이터 분석 DMP 개발",
      description: "광고 플랫폼 개발 및 데이터 관리 플랫폼(DMP) 구축, 데이터 분석.",
    },
    {
      year: "2004~2009",
      title: "KT-Alpha(구. KT하이텔) IT예산심의관리, 프로젝트매니지먼트 플랫폼 구축",
      description: "IT예산분석,심의,관리. 프로젝트 관리 체계 구축",
    },
  ];

  return (
    <section id="about" className="bg-gray-900 py-16 px-4 text-white dark:bg-gray-800">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <motion.div
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-gray-800 p-8 rounded-lg shadow-xl dark:bg-gray-900"
        >
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            생성형 AI와 데이터 분석 중심의 풀스택 개발자로, Python, Node.js, React, Vue.js 등 다양한 최신 기술을 기반으로
            사용자 맞춤형 플랫폼을 개발하고 있습니다.
          </p>
          <h3 className="text-2xl font-semibold text-white mb-4">요약 주요 업적</h3>
          <ul className="list-disc list-inside text-md text-gray-300 leading-relaxed mb-8 pl-4">
            <li>
              <span className="font-semibold text-blue-300">AI 자동화 플랫폼 구축:</span> 
              생성형 AI 기반 영상‧콘텐츠 자동 생성, 광고 영상 자동화 프레임워크 등 다양한 산업 분야에 AI를 실전 도입하여, 
              <span className="font-bold text-green-400">콘텐츠 제작 효율 최대 200% 향상</span>.
            </li>
            <li>
              <span className="font-semibold text-blue-300">데이터 중심 서비스 설계:</span> 
              Google API, n8n, JSON Workflow 등으로 <span className="font-bold text-green-400">마케팅 업무 및 SNS 자동화 파이프라인</span> 구축, 
              <span className="font-bold text-green-400">팀 업무시간 70% 단축</span>.
            </li>
            <li>
              <span className="font-semibold text-blue-300">엔터테인먼트 & 음악+AI 플랫폼:</span>
              Kpop+AI 플랫폼(<span className="font-bold">MyouV</span>) 개발 리딩 및 
              <span className="font-bold text-green-400">Startup SeriesA 투자유치 성공</span>.
            </li>
            <li>
              <span className="font-semibold text-blue-300">전사 IT 시스템 고도화:</span> 
              대기업/공공기관 ERP, LMS, 고객 플랫폼, 광고 플랫폼 등 다수의
              <span className="font-bold text-green-400">대형 프로젝트 Technical PM 경험</span>.
            </li>
            <li>
              <span className="font-semibold text-blue-300">고가용성 인프라/DevOps:</span>
              실시간 EMR 연동 및 의료정보 통합, <span className="font-bold text-green-400">100% 무중단 및 장애 대응 구조</span> 설계/구축.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-white mb-4">기술 스택</h3>
          <ul className="list-disc list-inside text-md text-gray-400 leading-relaxed mb-6 pl-4">
            <li>
              <span className="font-semibold text-white">Backend:</span> Node.js, Python (FastAPI), PHP 7.4
            </li>
            <li>
              <span className="font-semibold text-white">Frontend:</span> Vue.js, React, HTML5, Vite
            </li>
            <li>
              <span className="font-semibold text-white">Database:</span> MySQL, MariaDB, SQLite
            </li>
            <li>
              <span className="font-semibold text-white">Infra/DevOps:</span> Nginx, CentOS, Docker, LoadBalancer, DNS, ACG
            </li>
            <li>
              <span className="font-semibold text-white">AI/ML Tools:</span> Ollama, KoBERT, GPT-4, Claude API, TensorFlow, Data Labeling, YOLO(Ultralytics)
            </li>
            <li>
              <span className="font-semibold text-white">Cloud Platform:</span> AWS, Google Cloud Run(CI/CD), NCP
            </li>
            <li>
              <span className="font-semibold text-white">Automation & Report:</span> Google AI Studio, n8n, OpenAPI, Claude API, 
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-white mb-4">핵심 역량</h3>
          <ul className="list-disc list-inside text-md text-gray-400 leading-relaxed mb-6 pl-4">
            <li>AI & LLM 활용 자동화 설계: ChatGPT, Claude, KoBERT 등 적용 경험</li>
            <li>데이터 파이프라인 구축: Google API, n8n, JSON Workflow 설계</li>
            <li>백엔드 및 프론트엔드 통합 역량: Python, Node.js, PHP, Vue.js</li>
            <li>시스템 아키텍처 설계: 고가용성 환경(Load Balancer, Replication) 구축</li>
          </ul>

          <h3 className="text-2xl font-semibold text-white mb-4">기술 리더십 경험</h3>
          <p className="text-md text-gray-400 leading-relaxed mb-6">
            다수의 프로젝트에서 AI 모델 개발부터 서비스 배포까지 전 과정(End-to-End)을 주도하며
            AI플랫폼개발본부를 리드했습니다. 팀원들의 성장을 지원하고 기술적 난관을 함께 극복하며 시너지를 창출하는 데 중점을 두었습니다.
          </p>
          <h3 className="text-2xl font-semibold text-white mb-4">비전</h3>
          <p className="text-md text-gray-400 leading-relaxed mb-12">
            AI 기술이 인간의 삶과 비즈니스에 긍정적인 영향을 미칠 수 있도록 끊임없이 연구하고
            구현하는 것이 저의 비전입니다. AI를 활용하여 비즈니스와 AI의 연결을 재정의하고, 데이터를 기반으로 새로운 가치를 창출하며, 미래 지향적 기술 생태계를 구축하는 데 기여하고자 합니다.
          </p>

          {/* New Summary of Achievements */}
          <h3 className="text-2xl font-semibold text-white mb-4 text-center">주요 성과 요약</h3>
          <ul className="list-disc list-inside text-md text-gray-400 leading-relaxed mb-8 pl-4">
            <li>AI 자동화 프로젝트 다수 수행 → 콘텐츠 생성/데이터 분석 효율 평균 150% 향상</li>
            <li>의료, 금융, 교육 등 B2B SaaS 플랫폼 구축 경험 풍부</li>
            <li>데이터 시각화 기반의 BI 시스템 설계 및 운영 역량 보유</li>
          </ul>

          {/* Timeline Section */}
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">경력 타임라인</h3>
          <div className="relative pl-8 sm:pl-32 py-6">
            <div className="absolute left-8 sm:left-20 top-0 bottom-0 w-1 bg-blue-500 rounded-full"></div>
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative mb-8 last:mb-0">
                <div className="flex items-center mb-2">
                  <div className="absolute -left-2 sm:-left-12 w-4 h-4 bg-blue-500 rounded-full z-10"></div>
                  <div className="absolute -left-8 sm:-left-32 text-gray-400 text-sm sm:text-base font-semibold w-20 text-right">
                    {event.year}
                  </div>
                  <h4 className="text-xl font-semibold text-white ml-6 sm:ml-12">{event.title}</h4>
                </div>
                <p className="text-gray-400 text-md ml-6 sm:ml-12">{event.description}</p>
              </div>
            ))}
          </div>

          {/* Future Goals Section */}
          <h3 className="text-2xl font-semibold text-white mb-4 mt-12 text-center">향후 목표</h3>
          <ul className="list-disc list-inside text-md text-gray-400 leading-relaxed pl-4">
            <li>LLM 기반 데이터 분석 & 시각화 자동화 역량 확장</li>
            <li>B2B SaaS 시스템의 고도화 및 AI Ops 통합 추진</li>
            <li>산업별 맞춤형 AI 플랫폼 컨설팅 및 고도화 지원</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
