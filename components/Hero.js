import { useEffect, useState } from 'react';
import { stations } from './projectData';
import { EMAIL, RESUME } from './profile';
import { links } from './Navbar';
import { CopyEmail } from './Contact';

// First career year is in About (KT-Alpha, 2004).
const YEARS = new Date().getFullYear() - 2004;

export const proof = [
  [`${stations.length}개`, 'DGX 클러스터에서 운영 중인 AI 서비스'],
  ['2노드', 'NVIDIA DGX Spark 클러스터 직접 구축'],
  ['67만+ 셀', '롯데웰푸드 속성 정제, 평균 신뢰도 0.866'],
  ['2021–2025', '베리타스커넥트 AI 플랫폼개발본부장'],
];

const railLinks = [...links, ['#contact', 'Contact']];

// The section whose top has crossed the upper third of the viewport is the current one.
function useActive(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -65% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}

// Desktop: a sticky left column with identity, proof, section nav and contact. Narrow screens: the page header.
export default function Hero() {
  const active = useActive(railLinks.map(([h]) => h.slice(1)));
  return (
    <header className="flex flex-col pt-10 pb-4 lg:sticky lg:top-0 lg:h-dvh lg:overflow-y-auto lg:py-11 lg:[scrollbar-width:thin]">
      <h1 className="text-[44px] leading-none font-display tracking-[-0.04em] lg:text-[52px]">이상훈</h1>
      <p className="mt-3 text-xl font-semibold tracking-[-0.4px]">Full Stack AI Engineer</p>
      <p className="mt-4 max-w-[34ch] text-[17px] leading-relaxed text-ink/75">
        AI 서비스를 기획부터 GPU 운영까지 직접 설계하고 구축합니다. IT 경력 {Math.floor(YEARS / 10) * 10}년+.
      </p>
      <p className="mt-5 inline-flex w-fit lg:[@media(max-height:820px)]:hidden items-center gap-2 rounded-full bg-primary-tint py-1 pr-3 pl-2.5 text-sm font-semibold text-primary-strong">
        <span aria-hidden="true" className="relative inline-flex size-2">
          <span className="absolute inset-0 rounded-full bg-primary-dot opacity-60 motion-safe:animate-ping" />
          <span className="relative size-2 rounded-full bg-primary-dot" />
        </span>
        AI 서비스 {stations.length}개 운영 중
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 border-t-2 border-primary pt-4 sm:grid-cols-4 lg:grid-cols-2">
        {proof.map(([value, label]) => (
          <div key={label} className="flex flex-col-reverse justify-end">
            <dt className="mt-1 text-[13px] leading-snug text-muted">{label}</dt>
            <dd className="text-2xl leading-none font-display tracking-[-0.03em] tabular-nums whitespace-nowrap">{value}</dd>
          </div>
        ))}
      </dl>

      <nav aria-label="섹션" className="mt-7 hidden lg:block">
        <ul>
          {railLinks.map(([href, label]) => {
            const on = active === href.slice(1);
            return (
              <li key={href}>
                <a
                  href={href}
                  aria-current={on ? 'location' : undefined}
                  className="group flex min-h-11 items-center gap-4 text-[15px] text-muted no-underline hover:text-ink aria-[current]:font-semibold aria-[current]:text-primary"
                >
                  <span aria-hidden="true" className="h-px w-8 bg-ink/30 transition-[width,background-color] duration-200 group-hover:w-14 group-hover:bg-ink group-aria-[current]:w-16 group-aria-[current]:h-0.5 group-aria-[current]:bg-primary motion-reduce:transition-none" />
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="mt-auto hidden items-center gap-1 pt-6 lg:flex lg:[@media(max-height:880px)]:hidden">
        <a href={`mailto:${EMAIL}`} className="inline-flex min-h-11 items-center text-[15px] text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">{EMAIL}</a>
        <CopyEmail compact className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-muted hover:bg-primary-tint hover:text-primary-strong" />
        {RESUME && <a className="btn-ghost ml-2" href={RESUME} download>이력서</a>}
      </p>
    </header>
  );
}

// The first thing in the content column: what was built, in one sentence, and where to go next.
export function Intro() {
  return (
    <div className="border-t border-line pt-8 lg:border-0 lg:pt-11">
      <p className="text-[22px] leading-[1.55] tracking-[-0.3px] text-ink md:text-[28px] md:leading-[1.5]">
        마켓링크에서 NVIDIA DGX Spark 2대로 사내 GPU 클러스터를 구축하고, 그 위에서 AI 서비스 {stations.length}개를 개발해 운영하고 있습니다.
        <span className="text-muted"> 데이터 정제, 비전 OCR, 분석 포털, 생성 자동화, 대화형 AI까지 서비스마다 처리 규모와 결과로 보여 드립니다.</span>
      </p>
      <p className="mt-8 flex flex-wrap gap-2">
        <a className="btn-dark" href="#services">서비스 둘러보기</a>
        <a className="btn-ghost lg:hidden" href={`mailto:${EMAIL}`}>이메일 보내기</a>
        <a className="btn-ghost" href="#platform">클러스터 구성 보기</a>
      </p>
    </div>
  );
}
