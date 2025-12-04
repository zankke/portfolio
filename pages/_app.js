import '../styles/globals.css'
import { ThemeProvider } from '../context/ThemeContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black dark:from-gray-900 dark:to-gray-900">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp

