// Videos live on the platform itself, next to the services they show.
const BASE = 'https://ai.marketlink.co.kr/portfolio';

const reels = [
  { file: 'sanghoon-reel-services', title: '운영 중인 서비스 21개', note: '운영 중인 서비스와 플랫폼, 지난 성과를 30초에 담았습니다.' },
  { file: 'sanghoon-reel', title: '지난 프로젝트 하이라이트', note: '데이터 처리 속도 150배, 광고 영상 제작 효율 200% 같은 지난 성과를 30초에 담았습니다.' },
];

export default function Reel() {
  return (
    <section id="reel" className="wrap sec">
      <h2 className="sec-h">영상으로 보기</h2>
      <div className="reels">
        {reels.map((r) => (
          <figure key={r.file}>
            <video controls playsInline preload="none" poster={`${BASE}/${r.file}.jpg`}>
              <source src={`${BASE}/${r.file}.mp4`} type="video/mp4" />
            </video>
            <figcaption>
              <b>{r.title}</b>
              <span>{r.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
