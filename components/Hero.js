import { stations } from './projectData';
import { EMAIL, RESUME } from './profile';
import Figures from './Figures';

// First career year is in About (KT-Alpha, 2004).
const YEARS = new Date().getFullYear() - 2004;

const proof = [
  [`${stations.length}개`, 'DGX 클러스터에서 운영 중인 AI 서비스'],
  ['2노드', 'NVIDIA DGX Spark 클러스터 직접 구축'],
  ['50만+ 셀', '롯데웰푸드 속성 정제, 평균 신뢰도 0.875'],
  ['2021–2025', '베리타스커넥트 AI 플랫폼개발본부장'],
];

export default function Hero() {
  return (
    <header className="wrap pt-12 pb-10 md:pt-24 md:pb-14">
      <p className="text-muted">이상훈 · Full Stack AI Engineer · IT 경력 {Math.floor(YEARS / 10) * 10}년+</p>
      <h1 className="mt-4 max-w-[15em] text-4xl leading-[1.1] font-display tracking-[-0.025em] sm:text-5xl lg:text-[64px]">
        AI 서비스를 기획부터 GPU 운영까지 직접 설계하고 구축합니다.
      </h1>
      <p className="mt-6 max-w-[38em] text-lg text-muted">
        마켓링크에서 NVIDIA DGX Spark 2대로 사내 GPU 클러스터를 구축하고, 그 위에서 AI 서비스 {stations.length}개를 개발해 운영하고 있습니다.
      </p>
      <Figures items={proof} className="mt-8 max-w-[1000px] grid-cols-2 md:grid-cols-4" />
      <p className="mt-8 flex flex-wrap gap-2">
        <a className="btn-dark" href="#services">서비스 둘러보기</a>
        <a className="btn-ghost" href={`mailto:${EMAIL}`}>이메일 보내기</a>
        {RESUME && <a className="btn-ghost" href={RESUME} download>이력서 PDF</a>}
      </p>
    </header>
  );
}
