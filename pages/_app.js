import { Noto_Sans_KR } from 'next/font/google';
import '../styles/globals.css'

// One family for everything; Korean glyphs are fetched per unicode-range, so nothing is preloaded.
const noto = Noto_Sans_KR({ subsets: ['latin'], variable: '--font-noto', display: 'swap', preload: false });

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${noto.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
