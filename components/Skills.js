import {
  ReactOriginalIcon, Html5OriginalIcon, NodejsOriginalIcon, FastapiOriginalIcon, PythonOriginalIcon,
  PhpOriginalIcon, MysqlOriginalIcon, NginxOriginalIcon, CentosOriginalIcon, DockerOriginalIcon,
  ExpressOriginalIcon, RedisOriginalIcon, NextjsOriginalIcon, TailwindcssOriginalIcon, TypescriptOriginalIcon,
  PostgresqlOriginalIcon, PandasOriginalIcon, PlaywrightOriginalIcon, StreamlitOriginalIcon,
  GithubOriginalIcon, VercelOriginalIcon, UbuntuOriginalIcon, SqlalchemyOriginalIcon,
  Neo4jOriginalIcon, SupabaseOriginalIcon, AmazonwebservicesOriginalWordmarkIcon, GooglecloudOriginalIcon,
} from '@devicon/react';
import { Layers, Award } from 'lucide-react';
import SectionHead from './SectionHead';
import { LAYER_ICON, Ic } from './icons';

// devicon has no n8n or NAVER; their marks from Simple Icons (CC0) in each brand's color.
const N8nIcon = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#EA4B71"><path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632" /></svg>
);
const NaverIcon = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#03C75A"><path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z" /></svg>
);

// devicon's Vite mark with its gradient ids renamed: its bare id="a" collides with other inline SVGs on the page.
const ViteIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="vite-a" gradientTransform="translate(0 .937) scale(.3122)" gradientUnits="userSpaceOnUse" x1="6" x2="235" y1="33" y2="344"><stop offset="0" stop-color="#41d1ff"></stop><stop offset="1" stop-color="#bd34fe"></stop></linearGradient><linearGradient id="vite-b" gradientTransform="translate(0 .937) scale(.3122)" gradientUnits="userSpaceOnUse" x1="194.651" x2="236.076" y1="8.818" y2="292.989"><stop offset="0" stop-color="#ffea83"></stop><stop offset=".083" stop-color="#ffdd35"></stop><stop offset="1" stop-color="#ffa800"></stop></linearGradient></defs><path d="M124.766 19.52 67.324 122.238c-1.187 2.121-4.234 2.133-5.437.024L3.305 19.532c-1.313-2.302.652-5.087 3.261-4.622L64.07 25.187a3.09 3.09 0 0 0 1.11 0l56.3-10.261c2.598-.473 4.575 2.289 3.286 4.594Zm0 0" fill="url(#vite-a)"></path><path d="M91.46 1.43 48.954 9.758a1.56 1.56 0 0 0-1.258 1.437l-2.617 44.168a1.563 1.563 0 0 0 1.91 1.614l11.836-2.735a1.562 1.562 0 0 1 1.88 1.836l-3.517 17.219a1.562 1.562 0 0 0 1.985 1.805l7.308-2.223c1.133-.344 2.223.652 1.985 1.812l-5.59 27.047c-.348 1.692 1.902 2.614 2.84 1.164l.625-.968 34.64-69.13c.582-1.16-.421-2.48-1.69-2.234l-12.185 2.352a1.558 1.558 0 0 1-1.793-1.965l7.95-27.562A1.56 1.56 0 0 0 91.46 1.43Zm0 0" fill="url(#vite-b)"></path></svg>
);

// [name, devicon or null]. Only a skill's own logo is used; no stand-in logos for tools devicon lacks.
// Layers run like stops on one line, screen first. The service panels use the same layer names.
const groups = [
  ['Frontend', [['React', ReactOriginalIcon], ['Next.js', NextjsOriginalIcon], ['Vite', ViteIcon], ['Tailwind CSS', TailwindcssOriginalIcon], ['TypeScript', TypescriptOriginalIcon], ['HTML5', Html5OriginalIcon], ['HTMX'], ['ECharts']]],
  ['Backend', [['Python', PythonOriginalIcon], ['FastAPI', FastapiOriginalIcon], ['Node.js', NodejsOriginalIcon], ['Express', ExpressOriginalIcon], ['PHP 7.4', PhpOriginalIcon], ['Celery'], ['Redis', RedisOriginalIcon], ['Stripe']]],
  ['Data', [['PostgreSQL', PostgresqlOriginalIcon], ['MySQL', MysqlOriginalIcon], ['Supabase', SupabaseOriginalIcon], ['pandas', PandasOriginalIcon], ['SQLAlchemy', SqlalchemyOriginalIcon], ['Google Sheets API']]],
  ['AI Models', [['RAG'], ['RLHF'], ['GraphRAG · Neo4j', Neo4jOriginalIcon], ['Embeddings'], ['Ollama'], ['vLLM'], ['EXAONE'], ['Qwen'], ['gemma'], ['Gemini'], ['GPT-4'], ['Claude API'], ['PaddleOCR'], ['faster-whisper'], ['KoBERT']]],
  ['Infrastructure', [['NVIDIA DGX Spark'], ['Nginx', NginxOriginalIcon], ['Docker', DockerOriginalIcon], ['Caddy'], ['systemd'], ['Ubuntu', UbuntuOriginalIcon], ['CentOS', CentosOriginalIcon]]],
  ['Cloud', [['AWS', AmazonwebservicesOriginalWordmarkIcon], ['Google Cloud (GCP)', GooglecloudOriginalIcon], ['NAVER Cloud Platform (NBP)', NaverIcon]]],
  ['CI/CD', [['GitHub', GithubOriginalIcon], ['Vercel', VercelOriginalIcon], ['Preview 배포'], ['Production 자동 배포']]],
  ['Automation', [['Playwright', PlaywrightOriginalIcon], ['Streamlit', StreamlitOriginalIcon], ['n8n', N8nIcon], ['python-pptx'], ['openpyxl']]],
];
const total = groups.reduce((n, [, items]) => n + items.length, 0);

// From the 2003 entry that used to sit in Experience.
const certs = '정보처리기사 (한국산업인력공단, 2003)';

// A stop on the line: hollow for each layer (fills on hover), filled for the terminus.
const Stop = ({ end }) => (
  <span aria-hidden="true" className={`absolute top-[22px] left-[7px] size-[19px] rounded-full border-[3px] border-primary transition-colors motion-reduce:transition-none ${end ? 'bg-primary' : 'bg-cream group-hover:bg-primary'}`} />
);

export default function Skills() {
  return (
    <section id="skills" className="pt-20 md:pt-28">
      <SectionHead icon={Layers} title="Tech Stack" lede="화면부터 GPU, 클라우드와 배포까지 서비스의 모든 계층을 직접 다룹니다." />
      <p className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-1 text-muted">
        <span><b className="text-[28px] font-bold tracking-[-0.5px] text-primary-strong tabular-nums">{groups.length}</b> 계층</span>
        <span><b className="text-[28px] font-bold tracking-[-0.5px] text-primary-strong tabular-nums">{total}</b> 기술</span>
      </p>
      <ol className="relative mt-6">
        <span aria-hidden="true" className="absolute top-8 bottom-8 left-[15px] w-[3px] rounded-full bg-primary" />
        {groups.map(([h, items], i) => (
          <li key={h} className="group relative grid gap-3 border-b border-line py-4 pl-11 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-4 sm:pl-12">
            <Stop />
            <h3 className="flex items-center gap-2 self-start pt-1.5">
              <span className="text-xs font-semibold text-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <span className="flex items-center gap-1.5 font-semibold"><Ic as={LAYER_ICON[h]} className="text-primary" />{h}</span>
              <span className="text-xs text-muted">{items.length}</span>
            </h3>
            <ul className="flex flex-wrap gap-2">
              {items.map(([name, Icon]) => (
                <li key={name} className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-off py-1 pr-3.5 text-sm text-ink/85 transition duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:text-ink hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${Icon ? 'pl-1.5' : 'pl-3.5'}`}>
                  {Icon && <span aria-hidden="true" className="inline-grid size-[24px] place-items-center [&_svg]:size-[19px]"><Icon size={19} /></span>}
                  {name}
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li className="relative grid gap-1 py-4 pl-11 text-[15px] sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-4 sm:pl-12">
          <Stop end />
          <b className="flex items-center gap-2 pt-0.5 font-semibold"><Ic as={Award} className="text-primary" />Certification</b>
          <span className="pt-0.5 text-muted">{certs}</span>
        </li>
      </ol>
    </section>
  );
}
