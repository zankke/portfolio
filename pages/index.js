import Hero from "../components/Hero";
import About from "../components/About";
import { Services, PastProjects } from "../components/Projects";
import Platform from "../components/Platform";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import Reel from "../components/Reel";
import { EMAIL, GITHUB } from '../components/profile';
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
      <Navbar />
      <main>
        <Hero />
        <Platform />
        <Services />
        <About />
        <PastProjects />
        <Skills />
        <Reel />
        <Contact />
      </main>
      <footer className="wrap mt-16 flex flex-wrap justify-between gap-4 border-t border-line pt-6 pb-10 text-sm text-muted md:mt-24">
        <span>© 2026 이상훈</span>
        <span className="flex gap-6">
          <a href={`mailto:${EMAIL}`} className="text-muted hover:text-ink">{EMAIL}</a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">GitHub</a>
        </span>
      </footer>
    </>
  );
}
