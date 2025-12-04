import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import ThemeToggle from "../components/ThemeToggle";
import Navbar from "../components/Navbar";
import { generateNextSeo } from 'next-seo/pages';
import Head from 'next/head';
import ScrollToTopButton from "../components/ScrollToTopButton"; // Import ScrollToTopButton
import Certification from "../components/Certification";

export default function Home() {
  const seoTags = generateNextSeo({
    title: "SANG HOON, LEE - Full Stack AI Developer | AI Platform Director",
    description: "AI 기술로 비즈니스 자동화를 설계하고, 데이터 기반 서비스를 구현합니다. Data와 AI기술을 잘 쓰고 싶은 회사들에 컨설팅을 합니다. Commerce와 Marketing에 적용되는 여러 AI 서비스룰 만들고 있습니다. 기술과 비즈니스의 교차점에서 가치를 창출하는 데 열정적입니다..",
    canonical: "https://github.com/zankke", // Replace with your actual website URL
    openGraph: {
      url: 'https://github.com/zankke', // Replace with your actual website URL
      title: 'SANG HOON, LEE - Full Stack AI Developer | AI Platform Director',
      description: 'AI 기술로 비즈니스 자동화를 설계하고, 데이터 기반 서비스를 구현합니다. Data와 AI기술을 잘 쓰고 싶은 회사들에 컨설팅을 합니다. Commerce와 Marketing에 적용되는 여러 AI 서비스룰 만들고 있습니다. 기술과 비즈니스의 교차점에서 가치를 창출하는 데 열정적입니다.',
      images: [
        {
          url: 'https://v1.myouv.com/assets/images/Simg_250714_05:39:31.png', // Using a placeholder image from picsum.photos
          width: 800,
          height: 600,
          alt: '이상훈 Profile Picture',
          type: 'image/jpeg',
        },
      ],
      site_name: '이상훈 Portfolio',
    },
    twitter: {
      handle: '@yourtwitterhandle', // Replace with your Twitter handle
      site: '@yourtwitterhandle', // Replace with your Twitter site
      cardType: 'summary_large_image',
    },
  });

  return (
    <>
      <Head>
        {seoTags}
      </Head>
      <Navbar />
      <ThemeToggle />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Certification /> {/* Add the Certification component */}
      <Contact />
      <ScrollToTopButton /> {/* Add the ScrollToTopButton */}
    </>
  );
}
