import { useState } from 'react';
import { Mail } from 'lucide-react';
import SectionHead from './SectionHead';
import { EMAIL, RESUME, LINKEDIN } from './profile';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`; // clipboard blocked: fall back to the mail app
    }
  };

  return (
    <section id="contact" className="wrap pt-16 md:pt-32">
      <div className="rounded-2xl border border-line bg-off p-8 sm:p-12 lg:p-18">
        <SectionHead icon={Mail} title="Contact" lede="채용 제안과 협업 문의 모두 환영합니다. 이메일로 연락 주세요." />
        <a href={`mailto:${EMAIL}`} className="mt-8 inline-block text-[26px] leading-tight font-display tracking-[-0.025em] break-all text-ink underline decoration-1 underline-offset-8 hover:decoration-2 sm:text-5xl">
          {EMAIL}
        </a>
        <p className="mt-8 flex flex-wrap gap-2">
          {RESUME && <a className="btn-dark" href={RESUME} download>이력서 다운로드</a>}
          <button type="button" className={RESUME ? 'btn-ghost' : 'btn-dark'} onClick={copy} aria-live="polite">
            {copied ? '주소를 복사했습니다' : '이메일 주소 복사'}
          </button>
          {LINKEDIN && <a className="btn-ghost" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
        </p>
      </div>
    </section>
  );
}
