import {
  VuejsOriginalIcon, ReactOriginalIcon, Html5OriginalIcon, NodejsOriginalIcon, FastapiOriginalIcon, PythonOriginalIcon,
  PhpOriginalIcon, MysqlOriginalIcon, MariadbOriginalIcon, SqliteOriginalIcon, TensorflowOriginalIcon, NginxOriginalIcon,
  CentosOriginalIcon, DockerOriginalIcon, AmazonwebservicesOriginalWordmarkIcon, GooglecloudOriginalIcon, OpenapiOriginalIcon,
  ExpressOriginalIcon, RedisOriginalIcon, NextjsOriginalIcon, VitejsOriginalIcon, TailwindcssOriginalIcon, TypescriptOriginalIcon,
  PostgresqlOriginalIcon, PandasOriginalIcon, PlaywrightOriginalIcon, StreamlitOriginalIcon,
} from '@devicon/react';
import SectionHead from './SectionHead';

// [name, devicon or null]. Only a skill's own logo is used; no stand-in logos for tools devicon lacks.
// Same layer names as the service stack, top (screen) to bottom (GPU).
const groups = [
  ['프런트엔드', [['React', ReactOriginalIcon], ['Next.js', NextjsOriginalIcon], ['Vue.js', VuejsOriginalIcon], ['Vite', VitejsOriginalIcon], ['Tailwind CSS', TailwindcssOriginalIcon], ['TypeScript', TypescriptOriginalIcon], ['HTML5', Html5OriginalIcon], ['HTMX']]],
  ['백엔드', [['Python', PythonOriginalIcon], ['FastAPI', FastapiOriginalIcon], ['Node.js', NodejsOriginalIcon], ['Express', ExpressOriginalIcon], ['PHP 7.4', PhpOriginalIcon], ['Celery'], ['Redis', RedisOriginalIcon]]],
  ['데이터', [['PostgreSQL', PostgresqlOriginalIcon], ['MySQL', MysqlOriginalIcon], ['MariaDB', MariadbOriginalIcon], ['SQLite', SqliteOriginalIcon], ['pandas', PandasOriginalIcon], ['Google Sheets API']]],
  ['AI 모델', [['Claude API'], ['GPT-4'], ['Gemini'], ['Ollama'], ['EXAONE'], ['KoBERT'], ['TensorFlow', TensorflowOriginalIcon], ['YOLO'], ['Whisper']]],
  ['인프라', [['NVIDIA DGX Spark'], ['Nginx', NginxOriginalIcon], ['Docker', DockerOriginalIcon], ['CentOS', CentosOriginalIcon], ['LoadBalancer'], ['AWS', AmazonwebservicesOriginalWordmarkIcon], ['Google Cloud', GooglecloudOriginalIcon], ['NCP']]],
  ['자동화', [['Playwright', PlaywrightOriginalIcon], ['n8n'], ['OpenAPI', OpenapiOriginalIcon], ['Streamlit', StreamlitOriginalIcon], ['python-pptx'], ['openpyxl']]],
];

export default function Skills() {
  return (
    <section id="skills" className="wrap pt-16 md:pt-32">
      <SectionHead title="기술 스택" lede="프런트엔드부터 AI 모델과 인프라까지, 서비스의 전 계층을 직접 다룹니다." />
      <div className="mt-10 border-t border-ink">
        {groups.map(([h, items]) => (
          <div key={h} className="grid gap-4 border-b border-line py-5 sm:grid-cols-[120px_minmax(0,1fr)]">
            <h3 className="pt-1.5 font-semibold">{h}</h3>
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
    </section>
  );
}
