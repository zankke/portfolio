import {
  ReactOriginalIcon, Html5OriginalIcon, NodejsOriginalIcon, FastapiOriginalIcon, PythonOriginalIcon,
  PhpOriginalIcon, MysqlOriginalIcon, NginxOriginalIcon, CentosOriginalIcon, DockerOriginalIcon,
  ExpressOriginalIcon, RedisOriginalIcon, NextjsOriginalIcon, TailwindcssOriginalIcon, TypescriptOriginalIcon,
  PostgresqlOriginalIcon, PandasOriginalIcon, PlaywrightOriginalIcon, StreamlitOriginalIcon,
} from '@devicon/react';
import { Layers } from 'lucide-react';
import SectionHead from './SectionHead';
import { LAYER_ICON, Ic } from './icons';

// [name, devicon or null]. Only a skill's own logo is used; no stand-in logos for tools devicon lacks.
// Same layer names as the service stack, top (screen) to bottom (GPU).
// Every entry appears in at least one service or project on this page.
const groups = [
  ['Frontend', [['React', ReactOriginalIcon], ['Next.js', NextjsOriginalIcon], ['Vite'], ['Tailwind CSS', TailwindcssOriginalIcon], ['TypeScript', TypescriptOriginalIcon], ['HTML5', Html5OriginalIcon], ['HTMX'], ['ECharts']]],
  ['Backend', [['Python', PythonOriginalIcon], ['FastAPI', FastapiOriginalIcon], ['Node.js', NodejsOriginalIcon], ['Express', ExpressOriginalIcon], ['PHP 7.4', PhpOriginalIcon], ['Celery'], ['Redis', RedisOriginalIcon], ['Stripe']]],
  ['Data', [['PostgreSQL', PostgresqlOriginalIcon], ['MySQL', MysqlOriginalIcon], ['pandas', PandasOriginalIcon], ['SQLAlchemy'], ['Google Sheets API']]],
  ['AI Models', [['Ollama'], ['EXAONE'], ['Gemini'], ['GPT-4'], ['Claude API'], ['PaddleOCR'], ['faster-whisper'], ['GraphRAG'], ['KoBERT']]],
  ['Infrastructure', [['NVIDIA DGX Spark'], ['Nginx', NginxOriginalIcon], ['Docker', DockerOriginalIcon], ['Caddy'], ['systemd'], ['CentOS', CentosOriginalIcon]]],
  ['Automation', [['Playwright', PlaywrightOriginalIcon], ['Streamlit', StreamlitOriginalIcon], ['python-pptx'], ['openpyxl']]],
];

// From the 2003 entry that used to sit in Experience, and the awards in the IT portfolio summary deck.
const certs = '정보처리기사 (한국산업인력공단, 2003) · 우수 프로젝트상 (메조미디어, 2014) · 기술리더상 (아이너스, 2019)';

export default function Skills() {
  return (
    <section id="skills" className="pt-20 md:pt-28">
      <SectionHead icon={Layers} title="Tech Stack" lede="프런트엔드부터 AI 모델과 인프라까지, 서비스의 전 계층을 직접 다룹니다." />
      <div className="mt-8 border-t-2 border-primary">
        {groups.map(([h, items]) => (
          <div key={h} className="grid gap-4 border-b border-line py-5 sm:grid-cols-[176px_minmax(0,1fr)]">
            <h3 className="flex items-center gap-2 self-start pt-1.5 font-semibold"><Ic as={LAYER_ICON[h]} />{h}</h3>
            <ul className="flex flex-wrap gap-2">
              {items.map(([name, Icon]) => (
                <li key={name} className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border border-line bg-off py-1 pr-3 text-sm text-ink/85 ${Icon ? 'pl-1.5' : 'pl-3'}`}>
                  {Icon && <span aria-hidden="true" className="inline-grid size-[22px] place-items-center [&_svg]:size-[18px]"><Icon size={18} /></span>}
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-5 grid gap-1 text-[15px] sm:grid-cols-[176px_minmax(0,1fr)] sm:gap-4">
        <b className="font-semibold">Certification · Awards</b>
        <span className="text-muted">{certs}</span>
      </p>
    </section>
  );
}
