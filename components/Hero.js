import { useState } from 'react';
import { stations, lines, stationId } from './projectData';

// Map geometry (viewBox units). The interchange is the public domain; each line is a machine.
const HUB = { x: 200, y: 280 };
const TRACKS = {
  dgx1: { d: 'M200 280 H330 L450 160 H830', delay: 0.1 },
  dgx2: { d: 'M200 280 H330 L450 400 H830', delay: 0.25 },
  infra: { d: 'M200 280 V470 H340', delay: 0.4 },
  office: { d: 'M200 280 V90 H340', delay: 0.45 },
};

function place(line, i) {
  if (line === 'dgx1') return { x: 475 + i * 31, y: 160, lx: 4, ly: -14, rot: -45 };
  if (line === 'dgx2') return { x: 480 + i * 56, y: 400, lx: 4, ly: 18, rot: 45 };
  if (line === 'infra') return { x: 340, y: 470, lx: 16, ly: 6, rot: 0 };
  return { x: 340, y: 90, lx: 16, ly: 6, rot: 0 };
}

const IDLE = { name: 'ai.marketlink.co.kr', summary: '점에 마우스를 올리면 그 경로에서 돌아가는 서비스를 보여 줍니다.', color: null };

export default function Hero() {
  const [active, setActive] = useState(null);
  const count = {};
  const placed = stations.map((s) => {
    const i = (count[s.line] = (count[s.line] ?? -1) + 1);
    return { ...s, ...place(s.line, i), order: i };
  });
  const shown = active ? { name: `${active.name}  ${active.route}`, summary: active.summary, color: lines[active.line].color } : IDLE;

  return (
    <header className="wrap hero">
      <div>
        <h1 className="hero-name">이상훈</h1>
        <p className="hero-role">Full Stack AI Developer, AI Platform Director</p>
        <p className="hero-lede"><span>AI 서비스를 기획하고 만들고,</span><span>GPU 서버에서 직접 운영합니다.</span></p>
        <dl className="facts">
          <div><dt>운영 중인 서비스</dt><dd>{stations.length}</dd></div>
          <div><dt>직접 운영하는 GPU 서버</dt><dd>2</dd></div>
          <div><dt>개발 경력 시작</dt><dd>2004</dd></div>
        </dl>
        <div className="hero-cta">
          <a className="btn btn-solid" href="#services">운영 중인 서비스 보기</a>
          <a className="btn" href="#contact">연락하기</a>
        </div>
      </div>

      <div>
        <svg className="map" viewBox="0 0 900 560" role="group" aria-label="ai.marketlink.co.kr 서비스 노선도">
          {Object.entries(TRACKS).map(([k, t]) => (
            <path key={k} className="track" d={t.d} pathLength="1" stroke={lines[k].color} style={{ '--d': `${t.delay}s` }} />
          ))}
          <circle className="hub" cx={HUB.x} cy={HUB.y} r="18" />
          <text className="hub-lbl" x={HUB.x - 26} y={HUB.y - 22} textAnchor="end">
            <tspan>ai.marketlink</tspan>
            <tspan x={HUB.x - 26} dy="22">.co.kr</tspan>
          </text>
          {placed.map((s) => (
            <a
              key={s.route}
              href={`#${stationId(s)}`}
              className={`stn ${active === s ? 'on' : ''}`}
              style={{ '--d': `${0.6 + s.order * 0.04}s` }}
              aria-label={`${s.name}, ${s.route}`}
              onMouseEnter={() => setActive(s)}
              onFocus={() => setActive(s)}
              onMouseLeave={() => setActive(null)}
              onBlur={() => setActive(null)}
            >
              <circle className="stop" cx={s.x} cy={s.y} r="8" />
              <text className="lbl" transform={`translate(${s.x + s.lx} ${s.y + s.ly}) rotate(${s.rot})`}>
                {s.route}
              </text>
            </a>
          ))}
        </svg>
        <p className="readout" style={{ '--ro-c': shown.color ?? undefined }} aria-live="polite">
          <b>{shown.name}</b>
          <span>{shown.summary}</span>
        </p>
        <ul className="legend" aria-label="노선 색 설명">
          {Object.entries(lines).map(([k, l]) => (
            <li key={k}><i style={{ background: l.color }} />{l.note}</li>
          ))}
        </ul>
      </div>
    </header>
  );
}
