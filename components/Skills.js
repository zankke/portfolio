const groups = [
  ['AI · LLM', 'Claude API, GPT-4, Gemini, Ollama, EXAONE, KoBERT, TensorFlow, YOLO, Whisper'],
  ['백엔드', 'Python (FastAPI), Node.js (Express), PHP, Celery, Redis'],
  ['프런트엔드', 'React, Next.js, Vue.js, Vite, Tailwind CSS, HTMX'],
  ['데이터', 'PostgreSQL, MySQL, MariaDB, SQLite, Google Sheets API'],
  ['인프라', 'NVIDIA DGX Spark, Nginx, Docker, AWS, Google Cloud Run, NCP'],
  ['자동화', 'Playwright, n8n, OpenAPI, python-pptx, openpyxl'],
];

export default function Skills() {
  return (
    <section id="skills" className="wrap sec">
      <h2 className="sec-h">다루는 기술</h2>
      <div className="skills">
        {groups.map(([h, list]) => (
          <div key={h}>
            <h3>{h}</h3>
            <p>{list}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
