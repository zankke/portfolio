import { Network } from 'lucide-react';
import SectionHead from './SectionHead';
import { stations, lines, stationId } from './projectData';

// Surveyed on both nodes (docker ps, ollama list, fail2ban, df) on 2026-10-15. No hosts, IPs or ports.
const infra = {
  dgx1: { containers: 17, db: ['MySQL', 'PostgreSQL', 'Redis', 'ArangoDB'], runtime: 'Ollama · vLLM · Open WebUI' },
  dgx2: { containers: 17, db: ['MySQL', 'PostgreSQL', 'Redis', 'Neo4j'], runtime: 'Ollama · Docker Model Runner' },
};
const models = ['Qwen3.6 27B', 'EXAONE 3.5 32B', 'gpt-oss 20B', 'Gemma 4', 'Phi-4 Reasoning', 'Qwen2.5-VL', 'Llama 3.2 Vision', 'GLM-OCR', 'EmbeddingGemma'];

const decisions = [
  ['추론 분산', 'Ollama 요청을 두 노드에 random two least_conn 방식으로 나눠 보내고, 헬스체크로 노드 상태를 확인합니다.'],
  ['모델 동기화', '두 노드에 같은 로컬 모델 20종을 두어, 요청이 어느 노드로 가도 같은 결과를 냅니다.'],
  ['과부하 보호', 'GPU 동시 요청 수에 상한을 두고, 상한을 넘으면 바로 503을 돌려줍니다.'],
  ['컨테이너 격리', '서비스마다 Docker Compose 프로젝트와 전용 DB 컨테이너를 따로 두어, 한 서비스의 장애나 배포가 다른 서비스에 번지지 않습니다.'],
  ['LLM 폴백', 'OpenAI와 Gemini가 모두 실패하면 클러스터의 로컬 EXAONE으로 넘어갑니다(SOSOP).'],
];
const security = [
  ['경계 방화벽', '두 노드는 사내망 경계의 물리 방화벽 뒤에 있고, 외부 요청은 HTTPS 게이트웨이 한 곳으로만 들어옵니다.'],
  ['침입 차단', 'Fail2ban이 SSH 무차별 대입과 404 경로 스캔을 감지해 해당 IP를 자동 차단합니다. 차단 현황은 웹 UI로 관리합니다.'],
  ['전송 암호화', "Let's Encrypt 인증서로 HTTPS를 적용하고 보안 헤더를 붙입니다."],
];

const nodes = ['dgx1', 'dgx2'].map((k) => ({ ...lines[k], ...infra[k], services: stations.filter((s) => s.line === k) }));

const Wire = () => <div aria-hidden="true" className="mx-auto h-6 w-px bg-ink/40" />;
// Gateway fans out to the two node columns (md and up); below md the nodes stack and a plain wire is enough.
const Fork = ({ up }) => (
  <div aria-hidden="true" className={`mx-auto hidden h-5 w-[calc(50%+0.5rem)] border-x border-ink/40 md:block ${up ? 'border-b' : 'border-t'}`} />
);
const Chip = ({ children }) => <li className="rounded-full border border-line bg-off px-2.5 py-0.5 text-[13px] text-ink/85">{children}</li>;

function Rows({ title, items }) {
  return (
    <>
      <h3 className="mt-10 text-xl font-semibold tracking-[-0.3px]">{title}</h3>
      <dl className="mt-3 border-t border-line">
        {items.map(([k, v]) => (
          <div key={k} className="grid gap-x-8 gap-y-1 border-b border-line py-4 sm:grid-cols-[120px_minmax(0,1fr)]">
            <dt className="font-semibold">{k}</dt>
            <dd className="max-w-[44em] text-ink/85">{v}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export default function Platform() {
  return (
    <section id="platform" aria-labelledby="platform-h" className="wrap pt-8 md:pt-16">
      <SectionHead
        id="platform-h"
        icon={Network}
        title="Platform"
        lede={`NVIDIA DGX Spark 두 대로 만든 사내 GPU 클러스터입니다. 공개 도메인 하나에서 서비스 ${stations.length}개를 경로별로 연결하고, 로컬 LLM 추론은 두 노드에 나눠 처리합니다.`}
      />

      <figure className="mt-10 rounded-2xl border border-line bg-off p-4 sm:p-8">
        <figcaption className="sr-only">사용자 요청이 물리 방화벽과 HTTPS 게이트웨이를 거쳐 DGX 두 노드의 컨테이너 서비스로 가고, 서비스의 LLM 요청은 두 노드의 로컬 모델로 나눠 처리하는 구성도</figcaption>
        <p className="mx-auto w-fit rounded-full border border-line bg-cream px-4 py-1.5 text-sm text-muted">사용자 브라우저</p>
        <Wire />
        <div className="rounded-xl border-2 border-ink/70 px-5 py-3">
          <b className="block font-semibold">물리 방화벽</b>
          <span className="text-sm text-muted">사내망 경계 · 외부 요청은 게이트웨이로만 전달</span>
        </div>
        <Wire />
        <div className="rounded-xl bg-ink px-5 py-4 text-off shadow-inset">
          <b className="block font-semibold">HTTPS 게이트웨이</b>
          <span className="text-sm text-off/75">Nginx · Let&apos;s Encrypt · 보안 헤더 · Fail2ban · 경로별 라우팅</span>
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
              <dl className="mt-3 grid grid-cols-[88px_minmax(0,1fr)] gap-x-3 gap-y-2 text-sm">
                <dt className="text-muted">컨테이너</dt>
                <dd>Docker {n.containers}개</dd>
                <dt className="text-muted">데이터베이스</dt>
                <dd><ul className="flex flex-wrap gap-1">{n.db.map((d) => <Chip key={d}>{d}</Chip>)}</ul></dd>
                <dt className="text-muted">모델 저장소</dt>
                <dd>NVMe 3.7TB · 로컬 모델 20종</dd>
                <dt className="text-muted">런타임</dt>
                <dd>{n.runtime}</dd>
              </dl>
              <p className="mt-4 border-t border-line pt-3 text-sm text-muted">서비스 {n.services.length}개</p>
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
        <p className="mt-3 text-center text-sm text-muted">두 노드 간 200GbE 직결 · 같은 모델 세트 유지</p>
        <Fork up />
        <Wire />
        <div className="rounded-xl border border-dashed border-ink/50 px-5 py-4">
          <b className="block font-semibold">로컬 LLM 추론</b>
          <span className="text-sm text-muted">두 노드의 Ollama로 요청 분산 · 동시 요청 상한 · 헬스체크</span>
          <ul className="mt-3 flex flex-wrap gap-1.5">{models.map((m) => <Chip key={m}>{m}</Chip>)}</ul>
        </div>
      </figure>

      <Rows title="설계 결정" items={decisions} />
      <Rows title="보안" items={security} />
    </section>
  );
}
