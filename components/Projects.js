import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { allProjects, stations, stationId, lines } from './projectData';
import { LayoutGrid, FolderClock } from 'lucide-react';
import SectionHead from './SectionHead';
import Figures from './Figures';
import { LAYER_ICON, Ic } from './icons';

// longDesc is "**label:** text" lines with "*   bullet" continuations -> [{label, text}]
function parse(longDesc) {
  const out = [];
  for (const raw of longDesc.split('\n')) {
    const l = raw.trim();
    if (!l) continue;
    const m = l.match(/^\*\*(.+?):?\*\*:?\s*(.*)$/);
    if (m) out.push({ label: m[1].replace(/^#\s*/, ''), text: m[2] });
    else if (out.length) out[out.length - 1].text += (out[out.length - 1].text ? '\n' : '') + l.replace(/^\*\s+/, '· ');
    else out.push({ label: '', text: l });
  }
  return out;
}
export const factsOf = (p) => (p.facts ? p.facts.map(([label, text]) => ({ label, text })) : parse(p.longDesc ?? ''));

// The stack, top (what users see) to bottom (the GPU). Same names as the skills section.
const LAYERS = [
  ['Frontend', /react|vue|vite|next|htmx|streamlit|echarts|tailwind|html|css|javascript|반응형|ux/i],
  ['Backend', /typescript|fastapi|express|node|php|python|celery|sqlalchemy|jwt|rest|tomcat|apache|iis|\.net|stripe|portone|인증|검색 api/i],
  ['Data', /mysql|postgres|redis|sqlite|ms-sql|oracle|pandas|csv|openpyxl|eav|rapidfuzz|파이프라인/i],
  ['AI Models', /ollama|gpt|openai|gemini|claude|exaone|kobert|llm|ocr|whisper|graphrag|veo|비전/i],
  ['Automation', /playwright|cdp|chromium|python-pptx|크롤러/i],
  ['Infrastructure', /docker|nginx|caddy|systemd|dgx|linux|centos|cloud|ci\/cd|cdn|github/i],
];
// A token goes to the first layer that claims it, checked most-specific first.
const PRIORITY = ['AI Models', 'Automation', 'Data', 'Infrastructure', 'Frontend', 'Backend'];

function layerize(tech) {
  const rows = Object.fromEntries(LAYERS.map(([n]) => [n, []]));
  const rest = [];
  for (const raw of tech.split(/[,·+](?![^()]*\))/)) {
    const t = raw.trim();
    if (!t) continue;
    const hit = PRIORITY.find((n) => LAYERS.find(([k]) => k === n)[1].test(t));
    (hit ? rows[hit] : rest).push(t);
  }
  return [...LAYERS.map(([n]) => [n, rows[n]]), ['Other', rest]].filter(([, items]) => items.length);
}

export function Stack({ tech }) {
  if (!tech) return null;
  return (
    <dl className="mt-6 border-t border-ink">
      {layerize(tech).map(([name, items]) => (
        <div key={name} className="grid grid-cols-[128px_minmax(0,1fr)] gap-4 border-b border-line py-2.5 sm:grid-cols-[136px_minmax(0,1fr)]">
          <dt className="flex items-center gap-1.5 text-sm font-semibold"><Ic as={LAYER_ICON[name]} />{name}</dt>
          <dd className="text-[15px] text-ink/85">{items.join(', ')}</dd>
        </div>
      ))}
    </dl>
  );
}

const SITE = 'https://ai.marketlink.co.kr';
const same = (a, b) => a && b && a.replace(/\/$/, '') === b.replace(/\/$/, '');
const joinMeta = (...xs) => xs.filter(Boolean).join(' · ');

const byTitle = Object.fromEntries(allProjects.map((p) => [p.title, p]));
const linked = new Set(stations.map((s) => s.project).filter(Boolean));

// What kind of work each service is; the filter chips are these, in this order.
export const DOMAINS = ['데이터 정제', '비전 · OCR', '분석 포털', '생성 · 자동화', '대화형 AI'];
const DOMAIN = {
  '/lotte': '데이터 정제', '/master': '데이터 정제', '/ocr': '비전 · OCR', '/meatlink': '비전 · OCR',
  '/ssm': '분석 포털', '/datalink': '분석 포털', '/nh': '분석 포털', '/sales': '분석 포털',
  '/sosop': '생성 · 자동화', '/builder': '생성 · 자동화', '/shorts': '생성 · 자동화', '/studio': '생성 · 자동화', '/level10': '생성 · 자동화',
  '/fish': '대화형 AI',
};

// One shape for both lists: {id, label, side, meta, name, summary, p (detail), results, live, access}
export const services = stations.map((s) => {
  const p = byTitle[s.project] ?? { title: s.name, ...s.detail };
  return {
    id: stationId(s), slug: s.route.slice(1), label: s.route, side: s.period || s.route, meta: joinMeta(s.period, s.team, s.role),
    domain: DOMAIN[s.route] ?? '기타', node: lines[s.line]?.name,
    name: s.name, summary: s.summary, p, results: s.results, access: s.access ?? 'public',
    live: s.access === 'internal' ? null : (s.live ?? `${SITE}${s.route}/`),
  };
});
// The platform write-up has its own section; everything else not behind a station is a past project.
const archive = allProjects
  .filter((p) => !linked.has(p.title) && !p.title.startsWith('MARKETLINK-AX'))
  .map((p, i) => ({ id: `work-${i}`, label: joinMeta(p.org, p.year) || p.category, meta: p.role, name: p.title, summary: p.desc, p }));

const haystack = (it) => [it.label, it.name, it.summary, it.p.tech, it.p.desc].join(' ').toLowerCase();

export function Media({ p, plate, sizes, play }) {
  if (p.video && play) {
    return (
      <video controls playsInline preload="none" poster={p.video.poster} className="size-full bg-ink object-contain">
        <source src={p.video.src} type="video/mp4" />
        {p.video.captions && <track kind="captions" srcLang="ko" label="한국어" src={p.video.captions} default />}
      </video>
    );
  }
  const img = p.image ?? p.video?.poster;
  if (img) return <Image src={img} alt={`${p.title} 화면`} fill sizes={sizes} style={{ objectFit: 'cover', objectPosition: 'left top' }} />;
  // No screenshot on record: show the route instead of borrowing someone else's picture.
  return (
    <span aria-hidden="true" className="absolute inset-0 flex items-end bg-ink/3 p-5 text-4xl leading-none font-semibold tracking-[-1.2px] break-all text-ink/30 lg:text-5xl">
      {plate}
    </span>
  );
}

export const Shot = ({ children }) => (
  <div className="relative mt-6 aspect-video overflow-hidden rounded-xl border border-line bg-ink/4">{children}</div>
);

export function Links({ it }) {
  const { p, live, access } = it;
  const login = access === 'login';
  return (
    <>
      {live && <a className="btn-dark" href={live} target="_blank" rel="noopener noreferrer">{login ? '로그인 화면 보기' : '서비스 열기'}</a>}
      {p.link && !same(p.link, live) && (
        <a className="btn-ghost" href={p.link} target="_blank" rel="noopener noreferrer">{p.linkLabel || '관련 문서'}</a>
      )}
    </>
  );
}

function Head({ it, id }) {
  return (
    <>
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        {it.label && <span>{it.label}</span>}
        {it.access === 'login' && <span className="rounded-full border border-line px-2 py-0.5 text-[13px]">로그인 필요{it.p.video ? ' · 데모 영상' : ''}</span>}
      </p>
      <h3 id={id} className="mt-1 text-2xl leading-tight font-semibold tracking-[-0.8px] lg:text-[32px]">{it.name}</h3>
      {it.meta && <p className="mt-1.5 text-[15px] text-ink/75">{it.meta}</p>}
    </>
  );
}

function Detail({ it, onClose }) {
  const ref = useRef(null);
  useEffect(() => { if (it) ref.current?.showModal(); }, [it]);
  if (!it) return null;
  const { p } = it;
  return (
    <dialog
      ref={ref}
      aria-labelledby="detail-h"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}
      className="m-auto max-h-[calc(100dvh-48px)] w-[min(880px,calc(100vw-32px))] rounded-2xl border border-line bg-cream p-0 text-ink shadow-soft backdrop:bg-ink/40 motion-safe:animate-rise"
    >
      <div className="p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div><Head it={it} id="detail-h" /></div>
          <button type="button" className="btn-ghost" onClick={() => ref.current.close()}>닫기</button>
        </div>
        <Figures items={it.results} className="mt-6 grid-cols-2 sm:grid-cols-3" size="text-[26px]" />
        <ul className="mt-6">
          {factsOf(p).map((f, i) => (
            <li key={i} className="border-t border-line py-3 text-[15px] leading-relaxed first:border-t-0">
              {f.label && <b className="block text-sm font-semibold text-muted">{f.label}</b>}
              <span className="whitespace-pre-line text-ink/85">{f.text}</span>
            </li>
          ))}
        </ul>
        <Shot><Media p={p} plate={it.label} sizes="(max-width: 900px) 100vw, 840px" play /></Shot>
        <Stack tech={p.tech} />
        <p className="mt-6 flex flex-wrap gap-2"><Links it={it} /></p>
      </div>
    </dialog>
  );
}

// Wide screens preview beside the list; narrow screens have no room, so they go to the service page.
const narrow = () => window.matchMedia('(max-width: 1023.98px)').matches;

// Status, field and node in one line; shared by the panel and the service page.
export function Status({ it }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e7f0e4] px-2.5 py-0.5 text-[13px] font-semibold text-[#24502a]">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-[#2f7a3a]" />운영 중
      </span>
      <span>{it.domain}</span>
      {it.node && <><span aria-hidden="true">·</span><span>{it.node}</span></>}
      {it.meta && <><span aria-hidden="true">·</span><span>{it.meta}</span></>}
      {it.access === 'login' && <span className="rounded-full border border-ink/20 px-2.5 py-0.5 text-[13px]">로그인 필요</span>}
    </p>
  );
}

export const techList = (tech) => (tech ? tech.split(/,(?![^()]*\))/).map((t) => t.trim()).filter(Boolean) : []);

// The panel leads with results, then the design calls behind them; the overview is already the summary.
function Panel({ it }) {
  const calls = factsOf(it.p).filter((f) => f.label && f.label !== '개요').slice(0, 2);
  return (
    <div key={it.id} className="motion-safe:animate-rise">
      <Status it={it} />
      <h3 className="mt-3 text-[32px] leading-tight font-semibold tracking-[-0.8px]">{it.name}</h3>
      <p className="mt-2 text-ink/80">{it.summary}</p>
      <Figures items={it.results} className="mt-6 grid-cols-3" />
      <Shot><Media p={it.p} plate={it.label} sizes="560px" /></Shot>
      {calls.length > 0 && (
        <dl className="mt-5">
          {calls.map((f) => (
            <div key={f.label} className="border-t border-line py-2.5 text-[15px] leading-relaxed">
              <dt className="text-sm font-semibold text-muted">{f.label}</dt>
              <dd className="text-ink/85">{f.text}</dd>
            </div>
          ))}
        </dl>
      )}
      <ul aria-label="기술 구성" className="mt-4 flex flex-wrap gap-1.5">
        {techList(it.p.tech).map((t) => <li key={t} className="rounded-full border border-line bg-cream px-2.5 py-0.5 text-[13px] text-ink/80">{t}</li>)}
      </ul>
      <p className="mt-6 flex flex-wrap gap-2">
        <Links it={it} />
        <Link className="btn-ghost" href={`/services/${it.slug}`}>구현 과정 보기</Link>
      </p>
    </div>
  );
}

const Chip = ({ on, children, ...rest }) => (
  <button
    type="button"
    aria-pressed={on}
    className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[15px] ${on ? 'border-ink bg-ink text-off' : 'border-ink/20 hover:border-ink/50'}`}
    {...rest}
  >
    {children}
  </button>
);

export function Services() {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState(null);
  const [cur, setCur] = useState(services[0]);
  const router = useRouter();
  const q = query.trim().toLowerCase();
  const shown = services.filter((it) => (!domain || it.domain === domain) && (!q || haystack(it).includes(q)));
  const choose = (it) => (narrow() ? router.push(`/services/${it.slug}`) : setCur(it));

  // Platform diagram links to #st-…: select it in the panel, or open its page on narrow screens.
  useEffect(() => {
    const pick = () => {
      const hit = services.find((it) => `#${it.id}` === window.location.hash);
      if (hit) choose(hit);
    };
    pick();
    window.addEventListener('hashchange', pick);
    return () => window.removeEventListener('hashchange', pick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="services" aria-labelledby="services-h" className="wrap pt-16 md:pt-32">
      <SectionHead
        id="services-h"
        icon={LayoutGrid}
        title="Live Services"
        lede={`사내 DGX Spark 클러스터에서 직접 개발하고 운영하는 서비스 ${services.length}개입니다. 각 서비스의 처리 규모와 결과를 먼저 보여 드립니다.`}
      />
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="분야로 거르기" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          <Chip on={!domain} onClick={() => setDomain(null)}>전체 <span className="text-[13px] opacity-70">{services.length}</span></Chip>
          {DOMAINS.map((d) => (
            <Chip key={d} on={domain === d} onClick={() => setDomain(d)}>
              {d} <span className="text-[13px] opacity-70">{services.filter((s) => s.domain === d).length}</span>
            </Chip>
          ))}
        </div>
        <label className="w-full sm:w-80">
          <span className="sr-only">서비스 검색</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="서비스 검색 (예: OCR, LLM, 설문)"
            autoComplete="off"
            className="h-12 w-full rounded-md border border-line bg-off px-4 text-base placeholder:text-muted focus-visible:border-ink/40"
          />
        </label>
      </div>
      <div className="mt-8 grid items-start gap-x-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div>
          <p className="text-sm text-muted" aria-live="polite">
            {q || domain ? `조건에 맞는 서비스 ${shown.length}개` : `전체 ${shown.length}개`}
          </p>
          <ul className="mt-2 border-t border-line">
            {shown.map((it) => {
              const [value, label] = it.results?.[0] ?? [];
              return (
                <li key={it.id} id={it.id}>
                  <button
                    type="button"
                    aria-current={cur.id === it.id || undefined}
                    onClick={() => choose(it)}
                    className="group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 border-b border-line py-4 text-left lg:rounded-lg lg:px-4 lg:hover:bg-ink/3 lg:aria-[current=true]:bg-ink lg:aria-[current=true]:text-off"
                  >
                    <span className="min-w-0">
                      <span className="block text-[13px] text-muted lg:group-aria-[current=true]:text-off/70">{it.domain}</span>
                      <span className="mt-0.5 block text-[17px] leading-snug font-semibold tracking-[-0.2px]">{it.name}</span>
                      <span className="mt-1 block text-sm text-muted lg:group-aria-[current=true]:text-off/75">{it.summary}</span>
                    </span>
                    <span className="min-w-20 text-right">
                      {value ? (
                        <>
                          <span className="block text-xl leading-none font-display tracking-[-0.03em] tabular-nums whitespace-nowrap lg:text-2xl">{value}</span>
                          <span className="mt-1 block text-xs whitespace-nowrap text-muted lg:group-aria-[current=true]:text-off/70">{label.replace(/ \(.*\)$/, '')}</span>
                        </>
                      ) : (
                        <span className="text-[13px] whitespace-nowrap text-muted lg:group-aria-[current=true]:text-off/70">{it.side}</span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {!shown.length && (
            <p className="mt-6 text-muted">
              조건에 맞는 서비스가 없습니다.{' '}
              <button type="button" className="underline underline-offset-3" onClick={() => { setQuery(''); setDomain(null); }}>전체 목록 보기</button>
            </p>
          )}
        </div>

        <aside aria-live="polite" className="sticky top-22 hidden max-h-[calc(100vh-112px)] overflow-y-auto rounded-2xl border border-line bg-off p-8 lg:block">
          <Panel it={cur} />
        </aside>
      </div>
    </section>
  );
}

export function PastProjects() {
  const [open, setOpen] = useState(null);
  return (
    <section id="work" className="wrap pt-16 md:pt-32">
      <SectionHead icon={FolderClock} title="Past Projects" lede="마켓링크 이전과 고객사 프로젝트에서 설계하고 개발한 시스템입니다." />
      <ul className="mt-10 border-t border-line">
        {archive.map((it) => (
          <li key={it.id} id={it.id}>
            <button
              type="button"
              onClick={() => setOpen(it)}
              className="grid w-full items-baseline gap-x-4 border-b border-line py-4.5 text-left hover:bg-ink/3 sm:grid-cols-[200px_minmax(0,1fr)] sm:px-3"
            >
              <span className="text-sm text-muted">{it.label}</span>
              <span>
                <span className="block text-[17px] leading-snug">{it.name}</span>
                <span className="mt-0.5 block text-sm text-muted">{it.summary}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Detail it={open} onClose={() => setOpen(null)} />
    </section>
  );
}
