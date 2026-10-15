import Link from 'next/link';
import { BrainCircuit, ArrowUpRight } from 'lucide-react';
import SectionHead from './SectionHead';

// AI capabilities, each backed by code that runs on the cluster (surveyed 2026-10-15). No claim without a service behind it.
const caps = [
  {
    k: 'GraphRAG',
    title: '숫자는 그래프가, 설명은 LLM이.',
    body: 'Neo4j 지식 그래프에 Cypher를 직접 실행하고, 로컬 EXAONE은 그 결과만 설명합니다. LLM이 숫자를 지어낼 틈이 없습니다.',
    proof: '질문 40문항 벤치마크로 GraphRAG 도입 전후를 측정',
    tags: ['Neo4j', 'Cypher', 'EXAONE 3.5', 'Streamlit'],
    href: '/services/fish', label: '수산물 챗봇',
  },
  {
    k: 'RAG',
    title: '리뷰 68,767건에게 묻는다.',
    body: '다국어 임베딩으로 리뷰를 벡터화하고, 가장 가까운 근거 5개로 로컬 gemma4가 답합니다.',
    proof: '임베딩 · 코사인 top-5 · 근거 기반 답변',
    tags: ['sentence-transformers', 'MiniLM 다국어', 'gemma4 12B'],
    href: '/services/datalink', label: 'DataLink',
  },
  {
    k: 'Local LLM',
    title: '외부 API 없이, 모델 20종.',
    body: 'DGX 두 대에 같은 로컬 모델 세트를 두고 Ollama 게이트웨이가 요청을 나눕니다. 이미지 생성 모델은 vLLM으로 서빙합니다.',
    proof: '데이터가 사내 GPU 밖으로 나가지 않음',
    tags: ['Ollama', 'vLLM', 'Qwen3.6 27B', 'EXAONE 3.5 32B', 'gpt-oss 20B'],
    href: '/#platform', label: '클러스터 구성',
  },
  {
    k: 'Vision · OCR',
    title: '사진 한 장, 0.3초.',
    body: '로컬 비전 LLM이 축산물 사진에서 18개 항목을 읽고, PaddleOCR과 gemma4가 영수증 62,140건을 구조화했습니다.',
    proof: '수록률 99.5% · 판독 2,740장',
    tags: ['비전 LLM', 'PaddleOCR', 'gemma4'],
    href: '/services/meatlink', label: 'Meatlink AI Hub',
  },
  {
    k: 'Agents',
    title: '쓸수록 LLM을 덜 쓴다.',
    body: '싸고 확실한 조회부터 LLM까지 순서대로 시도하고, 애매하면 사람에게 넘깁니다. 검수 결과가 다시 규칙이 됩니다.',
    proof: '테스트 348개 통과',
    tags: ['Agent Pipeline', 'Human-in-the-loop', 'FastAPI'],
    href: '/services/master', label: 'CategoryMaster Agents',
  },
  {
    k: 'LLM Ops',
    title: '모델이 죽어도 서비스는 산다.',
    body: 'OpenAI가 실패하면 Gemini로, 그다음 로컬 EXAONE으로 넘어갑니다. GPU가 꽉 차면 줄 세우지 않고 바로 503을 돌려줍니다.',
    proof: '폴백 체인 · 동시 요청 상한 · 헬스체크',
    tags: ['Fallback', 'Rate limit', 'Health check'],
    href: '/services/sosop', label: 'SOSOP',
  },
];

export default function AIEngineering() {
  return (
    <section id="ai" aria-labelledby="ai-h" className="pt-16 lg:pt-20">
      <SectionHead id="ai-h" icon={BrainCircuit} title="AI Engineering" lede="RAG부터 로컬 LLM 운영까지. 모두 지금 돌아가는 서비스에서 나온 이야기입니다." />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {caps.map((c, i) => (
          <li key={c.k} className={`flex flex-col rounded-2xl border p-6 ${i === 0 ? 'border-primary-strong bg-primary-strong text-off sm:col-span-2' : 'border-line bg-off'} ${i === caps.length - 1 ? 'sm:col-span-2' : ''}`}>
            <p className={`text-[13px] font-semibold tracking-wide ${i === 0 ? 'text-off/70' : 'text-primary'}`}>{c.k}</p>
            <h3 className={`mt-2 font-bold tracking-[-0.5px] ${i === 0 ? 'text-[28px] leading-tight md:text-[34px]' : 'text-[22px] leading-snug'}`}>{c.title}</h3>
            <p className={`mt-3 leading-relaxed ${i === 0 ? 'text-off/85 md:text-[17px]' : 'text-ink/80'}`}>{c.body}</p>
            <p className={`mt-4 border-t pt-3 text-sm font-semibold ${i === 0 ? 'border-off/20 text-off' : 'border-line text-primary-strong'}`}>{c.proof}</p>
            <div className="mt-4 flex flex-1 flex-wrap items-end justify-between gap-3">
              <ul aria-label="사용 기술" className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <li key={t} className={`rounded-full px-2.5 py-0.5 text-[12.5px] ${i === 0 ? 'bg-off/12 text-off' : 'bg-primary-tint text-primary-strong'}`}>{t}</li>
                ))}
              </ul>
              <Link href={c.href} className={`group inline-flex min-h-11 items-center gap-1 text-sm font-semibold no-underline ${i === 0 ? 'text-off' : 'text-primary'}`}>
                {c.label}
                <ArrowUpRight aria-hidden="true" strokeWidth={2} className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
