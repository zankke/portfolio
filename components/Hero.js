import { stations } from './projectData';

export default function Hero() {
  return (
    <header className="wrap hero">
      <p className="hero-kicker">이상훈, Full Stack AI Engineer</p>
      <h1 className="hero-h">화면부터 GPU까지, AI 서비스를 혼자 만들고 운영합니다.</h1>
      <p className="hero-lede">
        ai.marketlink.co.kr에서 돌아가는 서비스 {stations.length}개를 모두 직접 기획하고 개발했습니다.
        서비스를 고르면 층마다 쓴 기술이 보입니다.
      </p>
    </header>
  );
}
