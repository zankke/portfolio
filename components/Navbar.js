import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const getLinkClass = (href) => {
    let isActive = false;
    if (href.startsWith('#')) {
      // For hash links, check both pathname and hash
      isActive = router.pathname === '/' && router.asPath === href;
    } else {
      // For page links, check only pathname
      isActive = router.pathname === href;
    }
    return `text-gray-300 hover:text-blue-400 transition-colors duration-300 ${isActive ? 'text-blue-400 font-bold border-b-2 border-blue-400' : ''}`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 bg-opacity-70 backdrop-blur-md z-40 shadow-lg p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo Placeholder */}
        <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-300">
          MyPortfolio
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link href="#about" className={getLinkClass('#about')}>
            About
          </Link>
          <Link href="#projects" className={getLinkClass('#projects')}>
            Projects
          </Link>
          <Link href="#skills" className={getLinkClass('#skills')}>
            Skills
          </Link>
          <Link href="#certification" className={getLinkClass('#certification')}> {/* New Certification Link */}
            Certification
          </Link>
          <Link href="#contact" className={getLinkClass('#contact')}>
            Contact
          </Link>
          {/* <Link href="/admin" className={getLinkClass('/admin')}>
            Admin
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
