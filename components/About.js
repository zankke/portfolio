import { BriefcaseBusiness } from 'lucide-react';
import SectionHead from './SectionHead';
import { stations } from './projectData';

// `role` is the title held there; left out where the repo has no record of one.
// `tags` come from the description and from that employer's projects in projectData (org field).
const career = [
  { yr: '2026–', title: 'MarketLink', role: 'Full Stack AI Engineer', desc: `사내 GPU 클러스터(NVIDIA DGX Spark 2대)를 구축하고, ai.marketlink.co.kr의 AI 서비스 ${stations.length}개를 개발하고 운영합니다.`, tags: ['NVIDIA DGX Spark', 'Ollama', 'Docker', 'FastAPI', 'Next.js', 'React'] },
  { yr: '2021–2025', title: '베리타스커넥트', role: 'AI 플랫폼개발본부장', desc: 'AI 플랫폼개발본부를 이끌며 생성형 AI 플랫폼과 LLM 인프라를 구축했습니다.', tags: ['생성형 AI 플랫폼', 'LLM 인프라', 'PHP 7.4', 'React', 'Apache-Tomcat'] },
  { yr: '2018–2021', title: '아이너스', role: 'PM', desc: '고객소통 플랫폼과 LMS 프로젝트의 PM을 맡아 개발까지 이끌었습니다.', tags: ['LMS', 'PHP', 'MS-SQL', 'IIS', 'HTML5'] },
  { yr: '2015–2018', title: 'CJ E&M', desc: 'KCON, MAMA, M Countdown, tvN IP 기반 글로벌 디지털 스폰서십을 기획하고 APAC 세일즈와 미디어 솔루션을 맡았습니다.', tags: ['글로벌 디지털 스폰서십', 'APAC 세일즈', '미디어 솔루션'] },
  { yr: '2009–2015', title: '메조미디어', desc: '광고 플랫폼과 데이터 관리 플랫폼(DMP)을 개발하고 데이터를 분석했습니다.', tags: ['광고 플랫폼', 'DMP', '데이터 분석'] },
  { yr: '2004–2009', title: 'KT-Alpha (구 KT하이텔)', role: 'PMO', desc: 'IT 예산의 분석, 심의, 관리를 맡고 프로젝트 관리 체계를 수립했습니다.', tags: ['IT 예산 관리', '프로젝트 관리 체계'] },
];

export default function About() {
  return (
    <section id="about" className="pt-20 md:pt-28">
      <SectionHead icon={BriefcaseBusiness} title="Experience" lede="IT 예산 관리로 시작해 광고 플랫폼, 글로벌 미디어, 교육 플랫폼을 거쳐 생성형 AI 플랫폼을 만들고 있습니다." />
      <ol className="rows mt-8 divide-y divide-line border-y border-line lg:divide-y-0 lg:border-0">
        {career.map((c) => (
          <li key={c.yr} className="row-hover grid gap-x-6 gap-y-1 py-5 sm:grid-cols-[176px_minmax(0,1fr)]">
            <span className="pt-0.5 text-sm text-muted tabular-nums">{c.yr}</span>
            <div className="min-w-0">
              <h3 className="flex flex-wrap items-baseline gap-x-3 text-lg leading-snug font-semibold tracking-[-0.3px]">
                {c.title}{c.role && <span className="text-[15px] font-normal tracking-normal text-primary">{c.role}</span>}
              </h3>
              <p className="mt-1 text-[15px] text-ink/75">{c.desc}</p>
              <ul aria-label="키워드" className="mt-3 flex flex-wrap gap-1.5">
                {c.tags.map((t) => <li key={t} className="rounded-full bg-primary-tint px-2.5 py-0.5 text-[12.5px] text-primary-strong">{t}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
