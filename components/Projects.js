import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { allProjects, stations, stationId, lines } from './projectData';
import { ArrowUpRight } from 'lucide-react';
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
    <dl className="mt-6 border-t-2 border-primary">
      {layerize(tech).map(([name, items]) => (
        <div key={name} className="grid grid-cols-[128px_minmax(0,1fr)] gap-4 border-b border-line py-2.5 sm:grid-cols-[136px_minmax(0,1fr)]">
          <dt className="flex items-center gap-1.5 text-small font-semibold"><Ic as={LAYER_ICON[name]} />{name}</dt>
          <dd className="text-small text-ink-2">{items.join(', ')}</dd>
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
  '/ssm': '분석 포털', '/datalink': '분석 포털', '/nh': '분석 포털', '/hpx': '분석 포털', '/sales': '분석 포털',
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
  .map((p, i) => ({ id: `work-${i}`, label: joinMeta(p.org, p.year), cat: p.category, meta: p.role, name: p.title, summary: p.desc, p }));

const haystack = (it) => [it.label, it.cat, it.name, it.summary, it.p.tech, it.p.desc].join(' ').toLowerCase();

export function Media({ p, plate, sizes, play, small }) {
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
    <span aria-hidden="true" className={`absolute inset-0 flex items-end bg-primary-tint/60 font-semibold break-all text-primary/40 ${small ? 'p-2 text-base leading-none' : 'p-5 text-4xl leading-none tracking-[-1.2px] lg:text-5xl'}`}>
      {plate}
    </span>
  );
}

export const Shot = ({ children }) => (
  <div className="relative mt-6 aspect-video overflow-hidden rounded-xl bg-ink/4 shadow-card">{children}</div>
);

export function Links({ it }) {
  const { p, live, access } = it;
  const login = access === 'login';
  return (
    <>
      {live && <a className="btn-dark" href={live} target="_blank" rel="noopener noreferrer">{login ? 'Link' : '서비스 열기'}</a>}
      {p.link && !same(p.link, live) && (
        <a className="btn-ghost" href={p.link} target="_blank" rel="noopener noreferrer">{p.linkLabel || '관련 문서'}</a>
      )}
    </>
  );
}

function Head({ it, id }) {
  const sub = joinMeta(it.label, it.meta);
  return (
    <>
      <h3 id={id} className="text-feature">{it.name}</h3>
      {sub && <p className="mt-2 text-meta text-muted">{sub}</p>}
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
      className="m-auto max-h-[calc(100dvh-48px)] w-[min(880px,calc(100vw-32px))] rounded-card bg-cream p-0 text-ink shadow-lift backdrop:bg-ink/40 motion-safe:animate-rise"
    >
      <div className="p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div><Head it={it} id="detail-h" /></div>
          <button type="button" className="btn-ghost" onClick={() => ref.current.close()}>닫기</button>
        </div>
        <Figures items={it.results} className="mt-6 grid-cols-2 sm:grid-cols-3" size="text-stat" />
        <ul className="mt-6">
          {factsOf(p).map((f, i) => (
            <li key={i} className="border-t border-line py-3 text-small first:border-t-0">
              {f.label && <b className="block text-meta font-semibold text-muted">{f.label}</b>}
              <span className="whitespace-pre-line text-ink-2">{f.text}</span>
            </li>
          ))}
        </ul>
        <Shot><Media p={p} plate={it.label || it.cat} sizes="(max-width: 900px) 100vw, 840px" play /></Shot>
        <Stack tech={p.tech} />
        <p className="mt-6 flex flex-wrap gap-2"><Links it={it} /></p>
      </div>
    </dialog>
  );
}

// Status, field and node in one line; shared by the panel and the service page.
export function Status({ it }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-meta text-muted">
      <span className="tag gap-1.5 font-semibold">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-primary-dot" />운영 중
      </span>
      <span>{it.domain}</span>
      {it.node && <><span aria-hidden="true">·</span><span>{it.node}</span></>}
      {it.meta && <><span aria-hidden="true">·</span><span>{it.meta}</span></>}    </p>
  );
}

export const techList = (tech) => (tech ? tech.split(/,(?![^()]*\))/).map((t) => t.trim()).filter(Boolean) : []);

const Chip = ({ on, children, ...rest }) => (
  <button
    type="button"
    aria-pressed={on}
    className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-small transition-[transform,background-color,color] duration-150 ease-[cubic-bezier(.23,1,.32,1)] active:scale-[0.97] motion-reduce:active:scale-100 ${on ? 'bg-primary text-off' : 'shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-primary-tint'}`}
    {...rest}
  >
    {children}
  </button>
);

// One service as a row: screenshot, what it is, the stack, and its headline number. The whole row opens the service page.
function ServiceRow({ it }) {
  const [value, label] = it.results?.[0] ?? [];
  return (
    <li id={it.id} className="scroll-mt-12">
      <Link
        href={`/services/${it.slug}`}
        className="group row-hover grid grid-cols-[96px_minmax(0,1fr)] gap-x-4 gap-y-2 py-5 text-ink no-underline sm:grid-cols-[208px_minmax(0,1fr)_auto] sm:gap-x-6"
      >
        <span className="relative mt-1 aspect-[16/10] overflow-hidden rounded-lg bg-ink/4 shadow-card">
          <Media p={it.p} plate={it.label} sizes="208px" small />
        </span>
        <span className="min-w-0">
          <span className="block text-h3 group-hover:text-primary">
            {it.name}
            <ArrowUpRight aria-hidden="true" strokeWidth={2} className="ml-1.5 inline-block size-4 align-[-0.1em] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-x-2 text-meta text-muted">
            {it.domain}<span aria-hidden="true">/</span>{it.node}
          </span>
          <span className="mt-2 block text-small text-ink-2">{it.summary}</span>
          <span className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
            {techList(it.p.tech).slice(0, 4).map((t) => <span key={t} className="tag">{t}</span>)}
          </span>
        </span>
        {value && (
          <span className="col-start-2 flex items-baseline gap-2 sm:col-start-auto sm:block sm:min-w-28 sm:pt-0.5 sm:text-right">
            <span className="block text-stat font-display text-primary tabular-nums whitespace-nowrap">{value}</span>
            <span className="block text-meta text-muted sm:mt-1.5 sm:whitespace-nowrap">{label.replace(/ \(.*\)$/, '')}</span>
          </span>
        )}
      </Link>
    </li>
  );
}

export function Services() {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState(null);
  // Rows ease in only after a chip click (not on first paint, not while typing in search).
  const [swapped, setSwapped] = useState(false);
  const pick = (d) => { setSwapped(true); setDomain(d); };
  const q = query.trim().toLowerCase();
  const shown = services.filter((it) => (!domain || it.domain === domain) && (!q || haystack(it).includes(q)));

  return (
    <section id="services" aria-labelledby="services-h" className="sec">
      <SectionHead
        id="services-h"
        title="Live Services"
        lede={`사내 DGX Spark 클러스터에서 직접 개발하고 운영하는 서비스 ${services.length}개입니다. 행을 누르면 서비스별 구현 과정을 볼 수 있습니다.`}
      />
      <div className="mt-8 flex flex-col gap-3">
        <div role="group" aria-label="분야로 거르기" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 lg:mx-0 lg:px-0 lg:pb-0">
          <Chip on={!domain} onClick={() => pick(null)}>전체 <span className="text-meta opacity-70">{services.length}</span></Chip>
          {DOMAINS.map((d) => (
            <Chip key={d} on={domain === d} onClick={() => pick(domain === d ? null : d)}>
              {d} <span className="text-meta opacity-70">{services.filter((s) => s.domain === d).length}</span>
            </Chip>
          ))}
        </div>
        <label className="w-full">
          <span className="sr-only">서비스 검색</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="서비스 검색 (예: OCR, LLM, 설문)"
            autoComplete="off"
            className="h-12 w-full surface px-4 text-base placeholder:text-muted"
          />
        </label>
      </div>
      <p className="mt-6 text-meta text-muted" aria-live="polite">
        {q || domain ? `조건에 맞는 서비스 ${shown.length}개` : `전체 ${shown.length}개`}
      </p>
      <ul
        key={domain ?? 'all'}
        className={`rows mt-2 divide-y divide-line border-y border-line lg:divide-y-0 lg:border-b-0 ${swapped ? '[&>li]:motion-safe:animate-[rise_180ms_cubic-bezier(.23,1,.32,1)_both] [&>li]:motion-reduce:animate-fade' : ''}`}
      >
        {shown.map((it) => <ServiceRow key={it.id} it={it} />)}
      </ul>
      {!shown.length && (
        <p className="mt-6 text-muted">
          조건에 맞는 서비스가 없습니다.{' '}
          <button type="button" className="inline-flex min-h-11 items-center text-primary underline underline-offset-3" onClick={() => { setQuery(''); setDomain(null); }}>전체 목록 보기</button>
        </p>
      )}
    </section>
  );
}

export function PastProjects() {
  const [open, setOpen] = useState(null);
  return (
    <section id="work" className="sec">
      <SectionHead title="Past Projects" lede="마켓링크 이전과 고객사 프로젝트에서 설계하고 개발한 시스템입니다." />
      <ul className="rows mt-8 divide-y divide-line border-y border-line lg:divide-y-0 lg:border-0">
        {archive.map((it) => (
          <li key={it.id} id={it.id}>
            <button
              type="button"
              onClick={() => setOpen(it)}
              className="group row-hover grid w-full items-baseline gap-x-6 gap-y-1 py-4 text-left sm:grid-cols-[176px_minmax(0,1fr)]"
            >
              <span className="text-small text-muted tabular-nums">{it.label}</span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-body font-semibold group-hover:text-primary">{it.name}{!it.label && it.cat && <span className="tag-line font-normal">{it.cat}</span>}</span>
                <span className="mt-0.5 block text-small text-ink-2">{it.summary}</span>
                <span className="mt-2.5 hidden flex-wrap gap-1.5 sm:flex">
                  {techList(it.p.tech).slice(0, 4).map((t) => <span key={t} className="tag">{t}</span>)}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Detail it={open} onClose={() => setOpen(null)} />
    </section>
  );
}
