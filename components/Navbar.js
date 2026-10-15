import { RESUME } from './profile';

// Same order as the page.
export const links = [
  ['#ai', 'AI'],
  ['#platform', 'Platform'],
  ['#services', 'Services'],
  ['#about', 'Experience'],
  ['#work', 'Projects'],
  ['#skills', 'Stack'],
  ['#reel', 'Showreel'],
];

const linkCls = 'inline-flex min-h-11 shrink-0 items-center text-ink/80 no-underline hover:underline hover:underline-offset-4';

// `className` lets the home page hide it on wide screens, where the left rail takes over.
export default function Navbar({ className = '' }) {
  return (
    <div className={`sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-md ${className}`}>
      <div className="wrap flex h-16 items-center justify-between gap-8">
        <a href="/" className="inline-flex min-h-11 items-center text-lg font-semibold tracking-[-0.4px] text-ink no-underline">이상훈</a>
        <nav aria-label="페이지 내 이동" className="ml-auto hidden gap-6 text-[15px] lg:flex">
          {links.map(([href, label]) => <a key={href} href={`/${href}`} className={linkCls}>{label}</a>)}
        </nav>
        <span className="flex items-center gap-4">
          {RESUME && <a href={RESUME} download className={`${linkCls} hidden text-[15px] lg:inline-flex`}>이력서</a>}
          <a className="btn-dark" href="/#contact">Contact</a>
        </span>
      </div>
      {/* Narrow screens: the same links as a scrollable row, no menu button. */}
      <nav aria-label="페이지 내 이동" className="wrap -mt-2 flex gap-5 overflow-x-auto text-[15px] [scrollbar-width:none] lg:hidden">
        {links.map(([href, label]) => <a key={href} href={`/${href}`} className={linkCls}>{label}</a>)}
      </nav>
    </div>
  );
}
