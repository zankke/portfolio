import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import Reel from "../components/Reel";
import { generateNextSeo } from 'next-seo/pages';
import Head from 'next/head';

// Vercel exposes the production domain to Next.js builds; local builds fall back to relative URLs.
const SITE = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  : '';
const TITLE = '이상훈 | Full Stack AI Developer, AI Platform Director';
const DESCRIPTION = 'AI 서비스를 기획하고 만들고, GPU 서버에서 직접 운영합니다. ai.marketlink.co.kr에서 21개 서비스를 운영 중입니다.';

export default function Home() {
  const seoTags = generateNextSeo({
    title: TITLE,
    description: DESCRIPTION,
    ...(SITE && { canonical: `${SITE}/` }),
    openGraph: {
      ...(SITE && { url: `${SITE}/` }),
      title: TITLE,
      description: DESCRIPTION,
      images: [{ url: `${SITE}/og.png`, width: 1200, height: 630, alt: '이상훈과 ai.marketlink.co.kr 서비스 노선도', type: 'image/png' }],
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
        <Reel />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
      <footer className="wrap foot">© 2026 이상훈. ai.marketlink.co.kr의 모든 서비스는 직접 설계하고 운영합니다.</footer>
    </>
  );
}
