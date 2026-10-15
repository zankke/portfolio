import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { allProjects, stations, lines, stationId } from './projectData';
import { LayoutGrid, FolderClock } from 'lucide-react';
import SectionHead from './SectionHead';
import { LAYER_ICON, Ic } from './icons';

// longDesc is "**label:** text" lines with "*   bullet" continuations -> [{label, text}]
function facts(longDesc) {
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

// The stack, top (what users see) to bottom (the GPU). Same names as the skills section.
const LAYERS = [
  ['Frontend', /react|vue|vite|next|htmx|streamlit|echarts|tailwind|html|css|javascript|반응형|ux/i],
  ['Backend', /fastapi|express|node|php|python|celery|sqlalchemy|jwt|rest|tomcat|apache|iis|\.net|stripe|portone|인증|크롤러|검색 api/i],
  ['Data', /mysql|postgres|redis|sqlite|ms-sql|oracle|pandas|csv|openpyxl|eav|rapidfuzz|파이프라인/i],
  ['AI Models', /ollama|gpt|openai|gemini|claude|exaone|kobert|llm|ocr|whisper|graphrag|veo|비전/i],
  ['Infrastructure', /docker|nginx|caddy|systemd|dgx|linux|centos|cloud|ci\/cd|cdn|chromium|playwright|github/i],
];
// A token goes to the first layer that claims it, checked most-specific first.
const PRIORITY = ['AI Models', 'Data', 'Infrastructure', 'Frontend', 'Backend'];

function layerize(tech) {
  const rows = Object.fromEntries(LAYERS.map(([n]) => [n, []]));
  const rest = [];
  for (const raw of tech.split(/[,·+](?![^()]*\))/)) {
    const t = raw.trim();
    if (!t) continue;
    const hit = PRIORITY.find((n) => LAYERS.find(([k]) => k === n)[1].test(t));
    (hit ? rows[hit] : rest).push(t);
  }
  return { rows: LAYERS.map(([n]) => [n, rows[n]]), rest };
}

function Stack({ tech }) {
  if (!tech) return <p className="mt-5 border-t border-ink pt-3 text-[15px] text-muted">기술 구성 기록이 없는 서비스입니다.</p>;
  const { rows, rest } = layerize(tech);
  const all = rest.length ? [...rows, ['Other', rest]] : rows;
  return (
    <dl className="mt-5 border-t border-ink">
      {all.map(([name, items]) => (
        <div key={name} className="grid grid-cols-[128px_minmax(0,1fr)] gap-4 border-b border-line py-2.5 sm:grid-cols-[136px_minmax(0,1fr)]">
          <dt className={`flex items-center gap-1.5 text-sm ${items.length && name !== 'Other' ? 'font-semibold' : 'text-muted'}`}><Ic as={LAYER_ICON[name]} />{name}</dt>
          <dd className={`text-[15px] ${items.length ? 'text-ink/85' : 'text-muted'}`}>{items.length ? items.join(', ') : '해당 없음'}</dd>
        </div>
      ))}
    </dl>
  );
}

const SITE = 'https://ai.marketlink.co.kr';
const same = (a, b) => a && b && a.replace(/\/$/, '') === b.replace(/\/$/, '');

const byTitle = Object.fromEntries(allProjects.map((p) => [p.title, p]));
const linked = new Set(stations.map((s) => s.project).filter(Boolean));

// One shape for both lists: {id, label, meta, name, summary, p (detail), live}
const services = stations.map((s) => {
  const p = byTitle[s.project] ?? { title: s.name, ...s.detail };
  return { id: stationId(s), label: s.route, meta: lines[s.line].name, name: s.name, summary: s.summary, p, live: s.live ?? `${SITE}${s.route}/` };
});
// The platform write-up describes the cluster itself, not a past project.
const archive = allProjects
  .filter((p) => !linked.has(p.title) && !p.title.startsWith('MARKETLINK-AX'))
  .map((p, i) => ({ id: `work-${i}`, label: p.category, meta: '', name: p.title, summary: p.desc, p }));

const haystack = (it) => [it.label, it.name, it.summary, it.p.tech, it.p.desc].join(' ').toLowerCase();

function Media({ p, plate, sizes, play }) {
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

const Shot = ({ children }) => (
  <div className="relative mt-5 aspect-video overflow-hidden rounded-xl border border-line bg-ink/4">{children}</div>
);

function Links({ it }) {
  const { p, live } = it;
  return (
    <>
      {live && <a className="btn-dark" href={live} target="_blank" rel="noopener noreferrer">서비스 열기</a>}
      {p.link && !same(p.link, live) && (
        <a className="btn-ghost" href={p.link} target="_blank" rel="noopener noreferrer">{p.linkLabel || '관련 문서'}</a>
      )}
    </>
  );
}

function Head({ it, id }) {
  return (
    <>
      <p className="flex gap-4 text-sm text-muted"><span>{it.label}</span>{it.meta && <span>{it.meta}</span>}</p>
      <h3 id={id} className="mt-1 text-2xl leading-tight font-semibold tracking-[-0.8px] lg:text-[32px]">{it.name}</h3>
    </>
  );
}

function Detail({ it, onClose }) {
  const ref = useRef(null);
  useEffect(() => { if (it) ref.current?.showModal(); }, [it]);
  if (!it) return null;
  const { p } = it;
  const items = p.facts ? p.facts.map(([label, text]) => ({ label, text })) : facts(p.longDesc ?? '');
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
        <Shot><Media p={p} plate={it.label} sizes="(max-width: 900px) 100vw, 840px" play /></Shot>
        <Stack tech={p.tech} />
        <ul className="mt-6">
          {items.map((f, i) => (
            <li key={i} className="border-t border-line py-3 text-[15px] leading-relaxed first:border-t-0">
              {f.label && <b className="block text-sm font-semibold text-muted">{f.label}</b>}
              <span className="whitespace-pre-line text-ink/85">{f.text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex flex-wrap gap-2"><Links it={it} /></p>
      </div>
    </dialog>
  );
}

function Row({ it, current, onPick, wide }) {
  return (
    <li id={it.id}>
      <button
        type="button"
        aria-current={current || undefined}
        onClick={() => onPick(it)}
        className={`group grid w-full items-baseline gap-x-4 border-b border-line py-3.5 text-left ${
          wide
            ? 'grid-cols-1 py-4.5 sm:grid-cols-[120px_minmax(0,1fr)] hover:bg-ink/3 sm:px-3'
            : 'grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[96px_minmax(0,1fr)_auto] lg:px-3 lg:hover:bg-ink/3 lg:aria-[current=true]:bg-ink lg:aria-[current=true]:text-off'
        }`}
      >
        <span className={`text-sm text-muted break-all ${wide ? '' : 'col-span-full lg:col-span-1 lg:group-aria-[current=true]:text-off/70'}`}>{it.label}</span>
        <span>
          <span className="block text-[17px] leading-snug">{it.name}</span>
          <span className={`mt-0.5 block text-sm text-muted ${wide ? '' : 'lg:hidden'}`}>{it.summary}</span>
        </span>
        {it.meta && <span className="text-[13px] whitespace-nowrap text-muted lg:group-aria-[current=true]:text-off/70">{it.meta}</span>}
      </button>
    </li>
  );
}

// Wide screens preview beside the list; narrow screens have no room, so they open the dialog.
const narrow = () => window.matchMedia('(max-width: 1023.98px)').matches;

export default function Projects() {
  const [query, setQuery] = useState('');
  const [cur, setCur] = useState(services[0]);
  const [open, setOpen] = useState(null);
  const q = query.trim().toLowerCase();
  const shown = q ? services.filter((it) => haystack(it).includes(q)) : services;

  return (
    <>
      <section id="services" aria-labelledby="services-h" className="wrap grid items-start gap-x-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div>
          <h2 id="services-h" className="mb-4 flex items-center gap-2 text-2xl font-semibold tracking-[-0.6px]"><Ic as={LayoutGrid} />Live Services</h2>
          <label>
            <span className="sr-only">서비스 검색</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="서비스 검색 (예: 설문, OCR, LLM)"
              autoComplete="off"
              className="h-12 w-full rounded-md border border-line bg-off px-4 text-base placeholder:text-muted focus-visible:border-ink/40"
            />
          </label>
          <p className="mt-4 text-sm text-muted" aria-live="polite">
            {q ? `‘${query.trim()}’ 검색 결과 ${shown.length}개` : `전체 ${shown.length}개`}
          </p>
          <ul className="mt-2 border-t border-line">
            {shown.map((it) => (
              <Row key={it.id} it={it} current={cur.id === it.id} onPick={(x) => (narrow() ? setOpen(x) : setCur(x))} />
            ))}
          </ul>
          {q && !shown.length && (
            <p className="mt-6 text-muted">
              ‘{query.trim()}’에 해당하는 서비스가 없습니다.{' '}
              <button type="button" className="underline underline-offset-3" onClick={() => setQuery('')}>전체 목록 보기</button>
            </p>
          )}
        </div>

        <aside aria-live="polite" className="sticky top-22 hidden max-h-[calc(100vh-112px)] overflow-y-auto rounded-2xl border border-line bg-off p-8 lg:block">
          <div key={cur.id} className="motion-safe:animate-rise">
            <Head it={cur} />
            <p className="mt-2 text-muted">{cur.summary}</p>
            <Shot><Media p={cur.p} plate={cur.label} sizes="560px" /></Shot>
            <Stack tech={cur.p.tech} />
            <p className="mt-5 flex flex-wrap gap-2">
              <Links it={cur} />
              <button type="button" className="btn-ghost" onClick={() => setOpen(cur)}>상세 정보</button>
            </p>
          </div>
        </aside>
      </section>

      <section id="work" className="wrap pt-16 md:pt-32">
        <SectionHead icon={FolderClock} title="Past Projects" lede="마켓링크 합류 전, 기업과 고객사 프로젝트에서 설계하고 개발한 시스템입니다." />
        <ul className="mt-10 border-t border-line">
          {archive.map((it) => <Row key={it.id} it={it} onPick={setOpen} wide />)}
        </ul>
      </section>

      <Detail it={open} onClose={() => setOpen(null)} />
    </>
  );
}
