import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

// Floating top/bottom jump on the left edge. Both stay visible; the one that would do nothing is dimmed and inert.
// On lg+ it sits in the page gutter (4vw) so it never covers the left rail; the ::after keeps a 44px hit area.
// Smooth scrolling comes from `html { scroll-behavior }` in globals.css, which already honours reduced motion.
const btn =
  "relative flex size-11 items-center justify-center rounded-full bg-primary text-off shadow-[var(--shadow-lift)] transition-[opacity,background-color] duration-200 hover:bg-primary-strong active:opacity-80 lg:size-10 lg:after:absolute lg:after:-inset-1 lg:after:content-[''] motion-reduce:transition-none";

export default function ScrollButtons() {
  const [at, setAt] = useState({ top: true, bottom: false });
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setAt({ top: window.scrollY < 240, bottom: window.scrollY > max - 240 });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const props = (off) => ({
    type: 'button',
    'aria-hidden': off,
    tabIndex: off ? -1 : 0,
    className: `${btn} ${off ? 'pointer-events-none opacity-35' : ''}`,
  });

  return (
    <nav aria-label="페이지 이동" className="fixed bottom-4 left-3 z-40 flex flex-col gap-2 lg:bottom-6 lg:left-0.5">
      <button {...props(at.top)} aria-label="맨 위로" onClick={() => window.scrollTo({ top: 0 })}>
        <ChevronUp aria-hidden="true" strokeWidth={1.75} className="size-5" />
      </button>
      <button {...props(at.bottom)} aria-label="맨 아래로" onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight })}>
        <ChevronDown aria-hidden="true" strokeWidth={1.75} className="size-5" />
      </button>
    </nav>
  );
}
