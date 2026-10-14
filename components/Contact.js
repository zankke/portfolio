import { useState } from 'react';

const EMAIL = 'itsme.kevin@icloud.com';

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
    <section id="contact" className="wrap contact">
      <h2 className="sec-h">새 서비스를 만들 차례라면, 메일 주세요.</h2>
      <p className="sec-lede">AI 도입 컨설팅, 플랫폼 개발, 사내 GPU 인프라 구축을 함께합니다.</p>
      <a className="contact-mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      <div className="contact-actions">
        <button type="button" className="btn btn-solid" onClick={copy} aria-live="polite">
          {copied ? '주소를 복사했습니다' : '메일 주소 복사'}
        </button>
        <a className="btn" href="https://github.com/zankke" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </section>
  );
}
