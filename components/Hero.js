import { stations } from './projectData';

export default function Hero() {
  return (
    <header className="wrap pt-14 pb-10 md:pt-28 md:pb-14">
      <p className="text-muted">이상훈, Full Stack AI Engineer</p>
      <h1 className="mt-4 max-w-[15em] text-4xl leading-[1.1] font-display tracking-[-0.025em] sm:text-5xl lg:text-[64px]">
        AI 서비스를 기획부터 GPU 운영까지 직접 설계하고 구축합니다.
      </h1>
      <p className="mt-6 max-w-[38em] text-lg text-muted">
        마켓링크에서 NVIDIA DGX Spark 2대로 사내 GPU 클러스터를 구축하고, 그 위에서 AI 서비스 {stations.length}개를 개발해 운영하고 있습니다.
        서비스를 선택하면 계층별 기술 구성을 확인할 수 있습니다.
      </p>
      <p className="mt-8 flex flex-wrap gap-2">
        <a className="btn-dark" href="#services">서비스 둘러보기</a>
        <a className="btn-ghost" href="mailto:itsme.kevin@icloud.com">이메일 보내기</a>
      </p>
    </header>
  );
}
