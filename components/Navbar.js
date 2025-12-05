import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-300 hover:text-blue-400 focus:outline-none focus:text-blue-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
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

      {/* Mobile menu (visible when isOpen is true) */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-800 bg-opacity-90 pt-2 pb-3 space-y-1 sm:px-3`}>
        <Link href="#about" className={`${getLinkClass('#about')} block px-3 py-2 rounded-md text-base font-medium`} onClick={toggleMenu}>
          About
        </Link>
        <Link href="#projects" className={`${getLinkClass('#projects')} block px-3 py-2 rounded-md text-base font-medium`} onClick={toggleMenu}>
          Projects
        </Link>
        <Link href="#skills" className={`${getLinkClass('#skills')} block px-3 py-2 rounded-md text-base font-medium`} onClick={toggleMenu}>
          Skills
        </Link>
        <Link href="#certification" className={`${getLinkClass('#certification')} block px-3 py-2 rounded-md text-base font-medium`} onClick={toggleMenu}>
            Certification
          </Link>
        <Link href="#contact" className={`${getLinkClass('#contact')} block px-3 py-2 rounded-md text-base font-medium`} onClick={toggleMenu}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
