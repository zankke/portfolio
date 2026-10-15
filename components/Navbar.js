const links = [
  ['#services', '서비스'],
  ['#work', '이전 프로젝트'],
  ['#reel', '영상'],
  ['#about', '경력'],
];

export default function Navbar() {
  return (
    <div className="nav">
      <div className="wrap nav-in">
        <a href="/" className="nav-mark">이상훈</a>
        <nav aria-label="페이지 내 이동">
          {links.map(([href, label]) => (
            <a key={href} href={`/${href}`}>{label}</a>
          ))}
        </nav>
        <a className="btn btn-dark" href="/#contact">연락하기</a>
      </div>
    </div>
  );
}
