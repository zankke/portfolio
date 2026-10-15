import {
  ReactOriginalIcon, Html5OriginalIcon, NodejsOriginalIcon, FastapiOriginalIcon, PythonOriginalIcon,
  PhpOriginalIcon, MysqlOriginalIcon, NginxOriginalIcon, CentosOriginalIcon, DockerOriginalIcon,
  ExpressOriginalIcon, RedisOriginalIcon, NextjsOriginalIcon, TailwindcssOriginalIcon, TypescriptOriginalIcon,
  PostgresqlOriginalIcon, PandasOriginalIcon, PlaywrightOriginalIcon, StreamlitOriginalIcon,
  GithubOriginalIcon, VercelOriginalIcon,
} from '@devicon/react';
import { Layers } from 'lucide-react';
import SectionHead from './SectionHead';
import { LAYER_ICON, Ic } from './icons';

// devicon has no n8n; its mark from Simple Icons (CC0) in n8n's brand color.
const N8nIcon = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#EA4B71"><path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632" /></svg>
);

// [name, devicon or null]. Only a skill's own logo is used; no stand-in logos for tools devicon lacks.
// Same layer names as the service stack, top (screen) to bottom (GPU).
// Every entry appears in at least one service or project on this page.
const groups = [
  ['Frontend', [['React', ReactOriginalIcon], ['Next.js', NextjsOriginalIcon], ['Vite'], ['Tailwind CSS', TailwindcssOriginalIcon], ['TypeScript', TypescriptOriginalIcon], ['HTML5', Html5OriginalIcon], ['HTMX'], ['ECharts']]],
  ['Backend', [['Python', PythonOriginalIcon], ['FastAPI', FastapiOriginalIcon], ['Node.js', NodejsOriginalIcon], ['Express', ExpressOriginalIcon], ['PHP 7.4', PhpOriginalIcon], ['Celery'], ['Redis', RedisOriginalIcon], ['Stripe']]],
  ['Data', [['PostgreSQL', PostgresqlOriginalIcon], ['MySQL', MysqlOriginalIcon], ['pandas', PandasOriginalIcon], ['SQLAlchemy'], ['Google Sheets API']]],
  ['AI Models', [['RAG'], ['RLHF'],['GraphRAG · Neo4j'], ['Embeddings'], ['Ollama'], ['vLLM'], ['EXAONE'], ['Qwen'], ['gemma'], ['Gemini'], ['GPT-4'], ['Claude API'], ['PaddleOCR'], ['faster-whisper'], ['KoBERT']]],
  ['Infrastructure', [['NVIDIA DGX Spark'], ['Nginx', NginxOriginalIcon], ['Docker', DockerOriginalIcon], ['Caddy'], ['systemd'], ['CentOS', CentosOriginalIcon]]],
  ['CI/CD', [['GitHub', GithubOriginalIcon], ['Vercel', VercelOriginalIcon], ['Preview 배포'], ['Production 자동 배포']]],
  ['Automation', [['Playwright', PlaywrightOriginalIcon], ['Streamlit', StreamlitOriginalIcon], ['n8n', N8nIcon], ['python-pptx'], ['openpyxl']]],
];

// From the 2003 entry that used to sit in Experience.
const certs = '정보처리기사 (한국산업인력공단, 2003)';

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
        <b className="font-semibold">Certification</b>
        <span className="text-muted">{certs}</span>
      </p>
    </section>
  );
}
