import {
  VuejsOriginalIcon, ReactOriginalIcon, Html5OriginalIcon, NodejsOriginalIcon, FastapiOriginalIcon, PythonOriginalIcon,
  PhpOriginalIcon, MysqlOriginalIcon, MariadbOriginalIcon, SqliteOriginalIcon, TensorflowOriginalIcon, NginxOriginalIcon,
  CentosOriginalIcon, DockerOriginalIcon, AmazonwebservicesOriginalWordmarkIcon, GooglecloudOriginalIcon, OpenapiOriginalIcon,
  ExpressOriginalIcon, RedisOriginalIcon, NextjsOriginalIcon, VitejsOriginalIcon, TailwindcssOriginalIcon, TypescriptOriginalIcon,
  PostgresqlOriginalIcon, PandasOriginalIcon, PlaywrightOriginalIcon, StreamlitOriginalIcon,
} from '@devicon/react';

// [name, devicon or null]. Only a skill's own logo is used; no stand-in logos for tools devicon lacks.
const groups = [
  ['AI · LLM', [['Claude API'], ['GPT-4'], ['Gemini'], ['Ollama'], ['EXAONE'], ['KoBERT'], ['TensorFlow', TensorflowOriginalIcon], ['YOLO'], ['Whisper']]],
  ['백엔드', [['Python', PythonOriginalIcon], ['FastAPI', FastapiOriginalIcon], ['Node.js', NodejsOriginalIcon], ['Express', ExpressOriginalIcon], ['PHP 7.4', PhpOriginalIcon], ['Celery'], ['Redis', RedisOriginalIcon]]],
  ['프런트엔드', [['React', ReactOriginalIcon], ['Next.js', NextjsOriginalIcon], ['Vue.js', VuejsOriginalIcon], ['Vite', VitejsOriginalIcon], ['Tailwind CSS', TailwindcssOriginalIcon], ['TypeScript', TypescriptOriginalIcon], ['HTML5', Html5OriginalIcon], ['HTMX']]],
  ['데이터', [['PostgreSQL', PostgresqlOriginalIcon], ['MySQL', MysqlOriginalIcon], ['MariaDB', MariadbOriginalIcon], ['SQLite', SqliteOriginalIcon], ['pandas', PandasOriginalIcon], ['Google Sheets API']]],
  ['인프라', [['NVIDIA DGX Spark'], ['Nginx', NginxOriginalIcon], ['Docker', DockerOriginalIcon], ['CentOS', CentosOriginalIcon], ['LoadBalancer'], ['AWS', AmazonwebservicesOriginalWordmarkIcon], ['Google Cloud', GooglecloudOriginalIcon], ['NCP']]],
  ['자동화', [['Playwright', PlaywrightOriginalIcon], ['n8n'], ['OpenAPI', OpenapiOriginalIcon], ['Streamlit', StreamlitOriginalIcon], ['python-pptx'], ['openpyxl']]],
];

export default function Skills() {
  return (
    <section id="skills" className="wrap sec">
      <h2 className="sec-h">다루는 기술</h2>
      <div className="skills">
        {groups.map(([h, items]) => (
          <div key={h}>
            <h3>{h}</h3>
            <ul className="skill-list">
              {items.map(([name, Icon]) => (
                <li key={name} className="skill">
                  {Icon && <span className="skill-ic" aria-hidden="true"><Icon size={22} /></span>}
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
