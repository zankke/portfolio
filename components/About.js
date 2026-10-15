import { BriefcaseBusiness } from 'lucide-react';
import SectionHead from './SectionHead';

const career = [
  { yr: '2026–', title: 'MarketLink', desc: '사내 GPU 클러스터(NVIDIA DGX Spark 2대)를 구축하고, ai.marketlink.co.kr의 AI 서비스를 개발하고 운영합니다.' },
  { yr: '2021–2025', title: '베리타스커넥트', desc: 'AI 플랫폼개발본부를 이끌며 생성형 AI 플랫폼과 LLM 인프라를 구축했습니다.' },
  { yr: '2018–2021', title: '아이너스', desc: '고객소통 플랫폼과 LMS 프로젝트의 PM을 맡아 개발까지 이끌었습니다.' },
  { yr: '2015–2018', title: 'CJ E&M', desc: 'KCON, MAMA, M Countdown, tvN IP 기반 글로벌 디지털 스폰서십을 기획하고 APAC 세일즈와 미디어 솔루션을 맡았습니다.' },
  { yr: '2009–2015', title: '메조미디어', desc: '광고 플랫폼과 데이터 관리 플랫폼(DMP)을 개발하고 데이터를 분석했습니다.' },
  { yr: '2004–2009', title: 'KT-Alpha (구 KT하이텔)', desc: 'IT 예산의 분석, 심의, 관리를 맡고 프로젝트 관리 체계를 수립했습니다.' },
  { yr: '2003', title: '정보처리기사', desc: '한국산업인력공단 국가기술자격을 취득했습니다.' },
];

export default function About() {
  return (
    <section id="about" className="wrap pt-16 md:pt-32">
      <SectionHead icon={BriefcaseBusiness} title="Experience" lede="IT 예산 관리로 시작해 광고 플랫폼, 글로벌 미디어, 교육 플랫폼을 거쳐 생성형 AI 플랫폼을 만들고 있습니다." />
      <ol className="mt-10 border-t border-line">
        {career.map((c) => (
          <li key={c.yr} className="grid gap-x-8 gap-y-1 border-b border-line py-5 sm:grid-cols-[120px_minmax(0,1fr)]">
            <span className="pt-0.5 text-[15px] text-muted tabular-nums">{c.yr}</span>
            <div>
              <h3 className="text-[19px] leading-snug font-semibold tracking-[-0.3px]">{c.title}</h3>
              <p className="mt-1 max-w-[44em] text-muted">{c.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
