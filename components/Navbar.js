import Link from 'next/link';

const links = [
  ['#reel', '영상'],
  ['#services', '서비스'],
  ['#work', '이전 프로젝트'],
  ['#about', '경력'],
  ['#contact', '연락'],
];

export default function Navbar() {
  return (
    <div className="topbar">
      <div className="wrap topbar-in">
        <Link href="/" className="topbar-name">이상훈</Link>
        <nav aria-label="페이지 내 이동">
          {links.map(([href, label]) => (
            <a key={href} href={`/${href}`}>{label}</a>
          ))}
        </nav>
      </div>
    </div>
  );
}
