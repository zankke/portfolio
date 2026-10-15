const career = [
  { yr: '2026–', title: 'MarketLink', desc: 'ai.marketlink.co.kr의 AI 서비스와 사내 GPU 인프라(NVIDIA DGX Spark 2대)를 만들고 운영합니다.' },
  { yr: '2021–2025', title: '베리타스커넥트', desc: '생성형 AI 플랫폼과 LLM 인프라를 만들고, AI 플랫폼개발본부를 이끌었습니다.' },
  { yr: '2018–2021', title: '아이너스', desc: '고객소통 플랫폼과 LMS 프로젝트를 PM으로 이끌고 개발했습니다.' },
  { yr: '2015–2018', title: 'CJ E&M', desc: 'KCON, MAMA, M Countdown, tvN IP 기반 글로벌 디지털 스폰서십을 기획하고 APAC 세일즈와 미디어 솔루션을 맡았습니다.' },
  { yr: '2009–2015', title: '메조미디어', desc: '광고 플랫폼과 데이터 관리 플랫폼(DMP)을 개발하고 데이터를 분석했습니다.' },
  { yr: '2004–2009', title: 'KT-Alpha (구 KT하이텔)', desc: 'IT 예산을 분석, 심의, 관리하고 프로젝트 관리 체계를 만들었습니다.' },
  { yr: '2003', title: '정보처리기사', desc: '한국산업인력공단 국가기술자격을 취득했습니다.' },
];

export default function About() {
  return (
    <section id="about" className="wrap sec">
      <h2 className="sec-h">경력</h2>
      <p className="sec-lede">
        IT 예산 관리에서 시작해 광고 플랫폼, 글로벌 미디어, 교육 플랫폼을 거쳐 지금은 생성형 AI 플랫폼을 만듭니다.
      </p>
      <ol className="career">
        {career.map((c) => (
          <li key={c.yr}>
            <span className="yr">{c.yr}</span>
            <div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
