import { Network } from 'lucide-react';
import SectionHead from './SectionHead';
import { stations, lines, stationId } from './projectData';

// Design decisions, from the MARKETLINK-AX write-up and the SOSOP fallback chain. No hosts, IPs or ports.
const decisions = [
  ['추론 분산', 'Ollama 요청을 두 노드에 random two least_conn 방식으로 나눠 보내고, 헬스체크로 노드 상태를 확인합니다.'],
  ['과부하 보호', 'GPU 동시 요청 수에 상한을 두고, 상한을 넘으면 바로 503을 돌려줍니다.'],
  ['격리', '공개 서비스만 도메인 하나 아래 경로로 연결하고, 내부 전용 서비스는 게이트웨이 밖으로 공개하지 않습니다.'],
  ['LLM 폴백', '외부 API가 실패하면 OpenAI, Gemini, 클러스터의 로컬 EXAONE 순서로 넘어갑니다(SOSOP).'],
];

const nodes = ['dgx1', 'dgx2'].map((k) => ({ ...lines[k], services: stations.filter((s) => s.line === k) }));

const Wire = () => <div aria-hidden="true" className="mx-auto h-6 w-px bg-ink/40" />;
// Gateway fans out to the two node columns (md and up); below md the nodes stack and a plain wire is enough.
const Fork = ({ up }) => (
  <div aria-hidden="true" className={`mx-auto hidden h-5 w-[calc(50%+0.5rem)] border-x border-ink/40 md:block ${up ? 'border-b' : 'border-t'}`} />
);

export default function Platform() {
  return (
    <section id="platform" aria-labelledby="platform-h" className="wrap pt-8 md:pt-16">
      <SectionHead
        id="platform-h"
        icon={Network}
        title="Platform"
        lede={`NVIDIA DGX Spark 두 대로 만든 사내 GPU 클러스터입니다. 공개 도메인 하나에서 서비스 ${stations.length}개를 경로별로 연결하고, LLM 추론은 두 노드에 나눠 처리합니다.`}
      />

      <figure className="mt-10 rounded-2xl border border-line bg-off p-4 sm:p-8">
        <figcaption className="sr-only">사용자 요청이 HTTPS 게이트웨이를 거쳐 DGX 두 노드의 서비스로 가고, 서비스의 LLM 요청은 Ollama 추론 게이트웨이가 두 노드에 나눠 처리하는 구성도</figcaption>
        <p className="mx-auto w-fit rounded-full border border-line bg-cream px-4 py-1.5 text-sm text-muted">사용자 브라우저</p>
        <Wire />
        <div className="rounded-xl bg-ink px-5 py-4 text-off shadow-inset">
          <b className="block font-semibold">HTTPS 게이트웨이</b>
          <span className="text-sm text-off/75">Nginx · Let&apos;s Encrypt · 보안 헤더 · 도메인 하나에서 경로별 라우팅</span>
        </div>
        <Wire />
        <Fork />
        <div className="grid gap-4 md:grid-cols-2">
          {nodes.map((n) => (
            <div key={n.name} className="rounded-xl border border-ink/40 bg-cream p-5">
              <p className="flex flex-wrap items-baseline justify-between gap-x-3">
                <b className="text-lg font-semibold tracking-[-0.3px]">{n.name}</b>
                <span className="text-sm text-muted">GB10 · 128GB 통합 메모리</span>
              </p>
              <p className="mt-3 text-sm text-muted">서비스 {n.services.length}개</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {n.services.map((s) => (
                  <li key={s.route}>
                    <a href={`#${stationId(s)}`} className="inline-flex min-h-8 items-center rounded-full border border-line bg-off px-3 text-sm text-ink/85 no-underline hover:border-ink/40">{s.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Fork up />
        <Wire />
        <div className="rounded-xl border border-dashed border-ink/50 px-5 py-4">
          <b className="block font-semibold">Ollama 추론 게이트웨이</b>
          <span className="text-sm text-muted">두 노드의 Ollama로 요청 분산 · 동시 요청 상한 · 헬스체크</span>
        </div>
      </figure>

      <dl className="mt-8 border-t border-line">
        {decisions.map(([k, v]) => (
          <div key={k} className="grid gap-x-8 gap-y-1 border-b border-line py-4 sm:grid-cols-[120px_minmax(0,1fr)]">
            <dt className="font-semibold">{k}</dt>
            <dd className="max-w-[44em] text-ink/85">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
