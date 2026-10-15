const links = [
  ['#services', '서비스'],
  ['#work', '이전 프로젝트'],
  ['#reel', '영상'],
  ['#about', '경력'],
];

export default function Navbar() {
  return (
    <div className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-8">
        <a href="/" className="inline-flex min-h-11 items-center text-lg font-semibold tracking-[-0.4px] text-ink no-underline">이상훈</a>
        <nav aria-label="페이지 내 이동" className="ml-auto hidden gap-6 text-[15px] md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={`/${href}`} className="inline-flex min-h-11 items-center text-ink/80 no-underline hover:underline hover:underline-offset-4">{label}</a>
          ))}
        </nav>
        <a className="btn-dark" href="/#contact">연락하기</a>
      </div>
    </div>
  );
}
