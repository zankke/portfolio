import { useRef, useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import SectionHead from './SectionHead';
import { EMAIL, RESUME, LINKEDIN } from './profile';

// Copies the address and says so in place for 2s; the icon swap is the confirmation, the live region tells screen readers.
export function CopyEmail({ className }) {
  const [copied, setCopied] = useState(false);
  const t = useRef();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(t.current);
      t.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`; // clipboard blocked: fall back to the mail app
    }
  };
  const Icon = copied ? Check : Copy;
  return (
    <button type="button" className={`${className} gap-2`} onClick={copy}>
      <Icon key={String(copied)} aria-hidden="true" strokeWidth={2} className="size-4 motion-safe:animate-[pop_.25s_ease-out]" />
      <span aria-live="polite">{copied ? '복사했습니다' : '이메일 복사'}</span>
    </button>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="pt-20 md:pt-28">
      <div className="rounded-2xl bg-primary-strong p-8 text-off shadow-inset sm:p-12 [&_:focus-visible]:shadow-[0_0_0_2px_var(--color-primary-strong),0_0_0_4px_var(--color-off)]">
        <SectionHead icon={Mail} title="Contact" lede="채용 제안과 협업 문의 모두 환영합니다. 이메일로 연락 주세요." dark />
        <a href={`mailto:${EMAIL}`} className="mt-8 inline-block text-[26px] leading-tight font-display tracking-[-0.025em] break-all text-off underline decoration-off/40 decoration-1 underline-offset-8 hover:decoration-off sm:text-[44px]">
          {EMAIL}
        </a>
        <p className="mt-8 flex flex-wrap gap-2">
          <a className="btn bg-off text-primary-strong hover:bg-primary-tint" href={`mailto:${EMAIL}`}>메일 보내기</a>
          <CopyEmail className="btn border border-off/40 text-off hover:bg-off/10" />
          {RESUME && <a className="btn border border-off/40 text-off hover:bg-off/10" href={RESUME} download>이력서 다운로드</a>}
          {LINKEDIN && <a className="btn border border-off/40 text-off hover:bg-off/10" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
        </p>
      </div>
    </section>
  );
}
