import { Clapperboard } from 'lucide-react';
import SectionHead from './SectionHead';

// Videos live on the platform itself, next to the services they show.
const BASE = 'https://ai.marketlink.co.kr/portfolio';

const reels = [
  { file: 'sanghoon-reel-services', title: '운영 중인 서비스', note: 'ai.marketlink.co.kr의 서비스와 플랫폼을 30초로 소개합니다.' },
  { file: 'sanghoon-reel', title: '지난 프로젝트 하이라이트', note: '데이터 처리 속도 150배, 광고 영상 제작 효율 200% 등 주요 성과를 30초로 정리했습니다.' },
];

export default function Reel() {
  return (
    <section id="reel" className="wrap pt-16 md:pt-32">
      <SectionHead icon={Clapperboard} title="Showreel" />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {reels.map((r) => (
          <figure key={r.file}>
            <video controls playsInline preload="none" poster={`${BASE}/${r.file}.jpg`} className="block aspect-video w-full rounded-xl border border-line bg-ink">
              <source src={`${BASE}/${r.file}.mp4`} type="video/mp4" />
            </video>
            <figcaption className="mt-3">
              <b className="block text-lg font-semibold tracking-[-0.3px]">{r.title}</b>
              <span className="text-sm text-muted">{r.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
