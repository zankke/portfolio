import { useEffect, useState } from 'react';
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

const SITE = 'https://ai.marketlink.co.kr';
// Path routes are public under the domain; port-only routes (:8080, :8434) are internal.
const liveUrl = (route) => (route.startsWith('/') ? `${SITE}${route}/` : null);
const same = (a, b) => a && b && a.replace(/\/$/, '') === b.replace(/\/$/, '');

function Media({ p, plate }) {
  if (p.video) {
    return (
      <video controls playsInline preload="none" poster={p.video.poster}>
        <source src={p.video.src} type="video/mp4" />
        {p.video.captions && <track kind="captions" srcLang="ko" label="한국어" src={p.video.captions} default />}
      </video>
    );
  }
  if (p.image) {
    return <Image src={p.image} alt={`${p.title} 화면`} fill sizes="(max-width: 900px) 100vw, 680px" style={{ objectFit: 'cover', objectPosition: 'top' }} />;
  }
  // No screenshot on record: show the station sign instead of borrowing someone else's picture.
  return <div className="st-plate" aria-hidden="true">{plate}</div>;
}

function Detail({ p, live, plate }) {
  const items = p.facts ? p.facts.map(([label, text]) => ({ label, text })) : facts(p.longDesc);
  return (
    <div className="st-detail">
      <div>
        <div className="st-detail-in">
          <div className="st-media">
            <Media p={p} plate={plate} />
          </div>
          <div>
            <ul className="st-facts">
              {items.map((f, i) => (
                <li key={i}>
                  {f.label && <b>{f.label}</b>}
                  <span style={{ whiteSpace: 'pre-line' }}>{f.text}</span>
                </li>
              ))}
            </ul>
            {p.tech && <p className="st-stack">{p.tech}</p>}
            <p className="st-links">
              {live && <a className="st-link" href={live} target="_blank" rel="noopener noreferrer">서비스 열기</a>}
              {p.link && !same(p.link, live) && (
                <a className="st-link" href={p.link} target="_blank" rel="noopener noreferrer">
                  {(p.linkLabel || '자세한 문서 보기').replace(/\s*↗$/, '')}
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ id, label, name, summary, project, live, open, toggle }) {
  const body = (
    <>
      <span className="st-dot" aria-hidden="true" />
      <span className="st-route">{label}</span>
      <span className="st-body">
        <span className="st-name">{name}</span>
        <span className="st-sum">{summary}</span>
      </span>
      {project ? <span className="st-more">{open ? '접기' : '자세히'}</span> : <span />}
    </>
  );
  return (
    <li id={id} className={`st ${open ? 'open' : ''}`}>
      {project ? (
        <button className="st-row" aria-expanded={open} aria-controls={`${id}-d`} onClick={() => toggle(id)}>
          {body}
        </button>
      ) : (
        <div className="st-row">{body}</div>
      )}
      {project && (
        <div id={`${id}-d`} aria-hidden={!open}>
          <Detail p={project} live={live} plate={label} />
        </div>
      )}
    </li>
  );
}

const byTitle = Object.fromEntries(allProjects.map((p) => [p.title, p]));
const linked = new Set(stations.map((s) => s.project).filter(Boolean));
const archive = allProjects.filter((p) => !linked.has(p.title));

export default function Projects() {
  const [open, setOpen] = useState(() => new Set());
  const toggle = (id) => setOpen((o) => {
    const n = new Set(o);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  // A station clicked on the map arrives as #st-...: open that row.
  useEffect(() => {
    const sync = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id) setOpen((o) => new Set(o).add(id));
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return (
    <>
      <section id="services" className="wrap sec">
        <h2 className="sec-h">운영 중인 서비스</h2>
        <p className="sec-lede">
          ai.marketlink.co.kr 아래 경로마다 서비스가 하나씩 있습니다. 노선 색은 그 서비스가 돌아가는 서버를 뜻합니다.
          기록이 남아 있는 서비스는 눌러서 자세히 볼 수 있습니다.
        </p>
        <div className="lineset">
          {Object.entries(lines).map(([k, l]) => (
            <div key={k} style={{ '--c': l.color }}>
              <div className="line-head">
                <span className="line-badge">{l.name}</span>
                <span className="line-note">{l.note}</span>
              </div>
              <ol className="stations">
                {stations.filter((s) => s.line === k).map((s) => (
                  <Row
                    key={s.route}
                    id={stationId(s)}
                    label={s.route}
                    name={s.name}
                    summary={s.summary}
                    project={byTitle[s.project] ?? (s.detail && { title: s.name, ...s.detail })}
                    live={liveUrl(s.route)}
                    open={open.has(stationId(s))}
                    toggle={toggle}
                  />
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="wrap sec" style={{ '--c': 'var(--line-past)' }}>
        <h2 className="sec-h">이전 프로젝트</h2>
        <p className="sec-lede">지금의 플랫폼 이전에 회사와 고객사에서 만든 시스템입니다.</p>
        <ol className="stations lineset">
          {archive.map((p, i) => (
            <Row
              key={p.title}
              id={`work-${i}`}
              label={p.category}
              name={p.title}
              summary={p.desc}
              project={p}
              open={open.has(`work-${i}`)}
              toggle={toggle}
            />
          ))}
        </ol>
      </section>
    </>
  );
}
