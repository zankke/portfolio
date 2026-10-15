import Hero, { Intro } from "../components/Hero";
import About from "../components/About";
import { Services, PastProjects } from "../components/Projects";
import Platform from "../components/Platform";
import AIEngineering from "../components/AIEngineering";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import Reel from "../components/Reel";
import { EMAIL } from '../components/profile';
import { generateNextSeo } from 'next-seo/pages';
import Head from 'next/head';

// Vercel exposes the production domain to Next.js builds; local builds fall back to relative URLs.
const SITE = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  : '';
const TITLE = '이상훈 | Full Stack AI Engineer';
const DESCRIPTION = 'Full Stack AI Engineer 이상훈의 포트폴리오. AI 서비스를 기획부터 GPU 운영까지 직접 설계하고 구축합니다.';

export default function Home() {
  const seoTags = generateNextSeo({
    title: TITLE,
    description: DESCRIPTION,
    ...(SITE && { canonical: `${SITE}/` }),
    openGraph: {
      ...(SITE && { url: `${SITE}/` }),
      title: TITLE,
      description: DESCRIPTION,
      images: [{ url: `${SITE}/og.png`, width: 1200, height: 630, alt: '이상훈, Full Stack AI Engineer', type: 'image/png' }],
      site_name: '이상훈 포트폴리오',
      locale: 'ko_KR',
    },
    twitter: { cardType: 'summary_large_image' },
  });

  return (
    <>
      <Head>
        {seoTags}
      </Head>
      <Navbar className="lg:hidden" />
      <div className="wrap lg:grid lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)] lg:gap-x-[clamp(48px,6vw,112px)]">
        <Hero />
        <div className="min-w-0">
          <main>
            <Intro />
            <AIEngineering />
            <Platform />
            <Services />
            <About />
            <PastProjects />
            <Skills />
            <Reel />
            <Contact />
          </main>
          <footer className="mt-16 border-t-2 border-primary pt-8 pb-10 md:mt-24">
            <p lang="en" className="font-display text-[clamp(40px,7vw,88px)] leading-[0.95] tracking-[-0.04em] text-primary-strong">SANG HOON, LEE</p>
            <p className="mt-3 text-ink/80">이상훈 · Full Stack AI Engineer</p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line pt-4 text-sm text-muted">
              <span>© 2026 SANG HOON, LEE</span>
              <span className="flex flex-wrap gap-x-5">
                <a href={`mailto:${EMAIL}`} className="inline-flex min-h-11 items-center text-muted hover:text-primary">{EMAIL}</a>
                <a href="#" className="inline-flex min-h-11 items-center text-muted hover:text-primary">맨 위로</a>
              </span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
