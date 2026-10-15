import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { allProjects, stations, lines, stationId } from './projectData';

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
  ['화면', /react|vue|vite|next|htmx|streamlit|echarts|tailwind|html|css|javascript|반응형|ux/i],
  ['API·백엔드', /fastapi|express|node|php|python|celery|sqlalchemy|jwt|rest|tomcat|apache|iis|\.net|stripe|portone|인증|크롤러|검색 api/i],
  ['데이터', /mysql|postgres|redis|sqlite|ms-sql|oracle|pandas|csv|openpyxl|eav|rapidfuzz|파이프라인/i],
  ['모델', /ollama|gpt|openai|gemini|claude|exaone|kobert|llm|ocr|whisper|graphrag|veo|비전/i],
  ['운영', /docker|nginx|caddy|systemd|dgx|linux|centos|cloud|ci\/cd|cdn|chromium|playwright|github/i],
];
// A token goes to the first layer that claims it, checked most-specific first.
const PRIORITY = ['모델', '데이터', '운영', '화면', 'API·백엔드'];

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
  if (!tech) return <p className="stack-none">기술 구성 기록이 없는 서비스입니다.</p>;
  const { rows, rest } = layerize(tech);
  return (
    <dl className="stack">
      {rows.map(([name, items]) => (
        <div key={name} className={items.length ? '' : 'off'}>
          <dt>{name}</dt>
          <dd>{items.length ? items.join(', ') : '쓰지 않음'}</dd>
        </div>
      ))}
      {rest.length > 0 && (
        <div className="rest"><dt>그 밖에</dt><dd>{rest.join(', ')}</dd></div>
      )}
    </dl>
  );
}

const SITE = 'https://ai.marketlink.co.kr';
// Path routes are public under the domain; port-only routes (:8080, :8434) are internal.
const liveUrl = (route) => (route.startsWith('/') ? `${SITE}${route}/` : null);
const same = (a, b) => a && b && a.replace(/\/$/, '') === b.replace(/\/$/, '');

const byTitle = Object.fromEntries(allProjects.map((p) => [p.title, p]));
const linked = new Set(stations.map((s) => s.project).filter(Boolean));

// One shape for both lists: {id, label, meta, name, summary, p (detail), live}
const services = stations.map((s) => {
  const p = byTitle[s.project] ?? { title: s.name, ...s.detail };
  return { id: stationId(s), label: s.route, meta: lines[s.line].name, name: s.name, summary: s.summary, p, live: s.live ?? liveUrl(s.route) };
});
const archive = allProjects
  .filter((p) => !linked.has(p.title))
  .map((p, i) => ({ id: `work-${i}`, label: p.category, meta: '', name: p.title, summary: p.desc, p }));

const haystack = (it) => [it.label, it.name, it.summary, it.p.tech, it.p.desc].join(' ').toLowerCase();

function Media({ p, plate, sizes, play }) {
  if (p.video && play) {
    return (
      <video controls playsInline preload="none" poster={p.video.poster}>
        <source src={p.video.src} type="video/mp4" />
        {p.video.captions && <track kind="captions" srcLang="ko" label="한국어" src={p.video.captions} default />}
      </video>
    );
  }
  const img = p.image ?? p.video?.poster;
  if (img) return <Image src={img} alt={`${p.title} 화면`} fill sizes={sizes} style={{ objectFit: 'cover', objectPosition: 'top' }} />;
  // No screenshot on record: show the route instead of borrowing someone else's picture.
  return <span className="plate" aria-hidden="true">{plate}</span>;
}

function Links({ it }) {
  const { p, live } = it;
  return (
    <>
      {live && <a className="btn btn-dark" href={live} target="_blank" rel="noopener noreferrer">서비스 열기</a>}
      {p.link && !same(p.link, live) && (
        <a className="btn btn-ghost" href={p.link} target="_blank" rel="noopener noreferrer">
          {(p.linkLabel || '자세한 문서 보기').replace(/\s*↗$/, '')}
        </a>
      )}
    </>
  );
}

function Head({ it, as: H = 'h3', id }) {
  return (
    <>
      <p className="meta"><span>{it.label}</span>{it.meta && <span>{it.meta}</span>}</p>
      <H id={id} className="panel-h">{it.name}</H>
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
      className="detail"
      aria-labelledby="detail-h"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}
    >
      <div className="detail-in">
        <div className="detail-head">
          <div><Head it={it} id="detail-h" /></div>
          <button type="button" className="btn btn-ghost" onClick={() => ref.current.close()}>닫기</button>
        </div>
        <div className="shot"><Media p={p} plate={it.label} sizes="(max-width: 900px) 100vw, 840px" play /></div>
        <Stack tech={p.tech} />
        <ul className="facts">
          {items.map((f, i) => (
            <li key={i}>
              {f.label && <b>{f.label}</b>}
              <span>{f.text}</span>
            </li>
          ))}
        </ul>
        <p className="actions"><Links it={it} /></p>
      </div>
    </dialog>
  );
}

function Row({ it, current, onPick }) {
  return (
    <li id={it.id}>
      <button type="button" className="row" aria-current={current || undefined} onClick={() => onPick(it)}>
        <span className="row-label">{it.label}</span>
        <span className="row-body">
          <span className="row-name">{it.name}</span>
          <span className="row-sum">{it.summary}</span>
        </span>
        {it.meta && <span className="row-meta">{it.meta}</span>}
      </button>
    </li>
  );
}

const narrow = () => window.matchMedia('(max-width: 900px)').matches;

export default function Projects() {
  const [query, setQuery] = useState('');
  const [cur, setCur] = useState(services[0]);
  const [open, setOpen] = useState(null);
  const q = query.trim().toLowerCase();
  const shown = q ? services.filter((it) => haystack(it).includes(q)) : services;

  // Wide screens preview beside the list; narrow screens have no room, so they open the dialog.
  const pick = (it) => (narrow() ? setOpen(it) : setCur(it));

  return (
    <>
      <section id="services" className="wrap explorer" aria-label="운영 중인 서비스">
        <div>
          <label className="find">
            <span className="sr-only">서비스 찾기</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="서비스 찾기: 설문, OCR, LLM" autoComplete="off" />
          </label>
          <p className="count" aria-live="polite">
            {q ? `‘${query.trim()}’ 관련 서비스 ${shown.length}개` : `운영 중인 서비스 ${shown.length}개`}
          </p>
          <ul className="rows">
            {shown.map((it) => <Row key={it.id} it={it} current={cur.id === it.id} onPick={pick} />)}
          </ul>
          {q && !shown.length && (
            <p className="empty">
              ‘{query.trim()}’와 맞는 서비스가 없습니다. <button type="button" className="link" onClick={() => setQuery('')}>전체 목록 보기</button>
            </p>
          )}
        </div>

        <aside className="panel" aria-live="polite">
          <div key={cur.id} className="panel-in">
          <Head it={cur} />
          <p className="panel-sum">{cur.summary}</p>
          <div className="shot"><Media p={cur.p} plate={cur.label} sizes="560px" /></div>
          <Stack tech={cur.p.tech} />
          <p className="actions">
            <Links it={cur} />
            <button type="button" className="btn btn-ghost" onClick={() => setOpen(cur)}>자세히 보기</button>
          </p>
          </div>
        </aside>
      </section>

      <section id="work" className="wrap sec">
        <h2 className="sec-h">이전 프로젝트</h2>
        <p className="sec-lede">지금의 플랫폼 이전에 회사와 고객사에서 만든 시스템입니다.</p>
        <ul className="rows rows-wide">
          {archive.map((it) => <Row key={it.id} it={it} onPick={setOpen} />)}
        </ul>
      </section>

      <Detail it={open} onClose={() => setOpen(null)} />
    </>
  );
}
