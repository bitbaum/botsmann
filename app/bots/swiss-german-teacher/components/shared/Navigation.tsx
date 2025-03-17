import React, { useState, useEffect } from 'react';
import { btnPrimary } from '../../utils/constants';

interface NavigationProps {
  getTryLink: () => string;
}

const Navigation = ({ getTryLink }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Language Learning', href: '#language-learning' },
    { name: 'Communication', href: '#communication' },
    { name: 'Social', href: '#integration' },
    { name: 'Swiss Content', href: '#swiss-content' }
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3C9.5 3 7.37 4.69 6.54 6.97C5.88 6.92 5.44 7.27 5.24 7.68C5.04 8.08 4.84 8.76 5.43 9.4C4.61 10.5 4 11.35 4 13C4 13.24 4.03 13.47 4.07 13.7L2 19L5 19.5L6.5 19L8 20H16L17.5 19L19 19.5L22 19L19.93 13.7C19.97 13.47 20 13.24 20 13C20 11.35 19.39 10.5 18.57 9.4C19.16 8.76 18.96 8.08 18.76 7.68C18.56 7.27 18.12 6.92 17.46 6.97C16.63 4.69 14.5 3 12 3Z" fill="currentColor" />
                <path d="M8.5 12.5C8.5 11.672 7.828 11 7 11C6.172 11 5.5 11.672 5.5 12.5C5.5 13.328 6.172 14 7 14C7.828 14 8.5 13.328 8.5 12.5Z" fill="white" />
                <path d="M18.5 12.5C18.5 11.672 17.828 11 17 11C16.172 11 15.5 11.672 15.5 12.5C15.5 13.328 16.172 14 17 14C17.828 14 18.5 13.328 18.5 12.5Z" fill="white" />
              </svg>
              <span className="ml-2 font-bold text-xl text-gray-900">Heidi</span>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-green-600 px-2 py-1 text-sm font-medium rounded-md transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.name}
              </a>
            ))}
            <a
              href={getTryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnPrimary} py-2 px-4`}
              aria-label="Try Heidi now"
            >
              Try Heidi
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              >
                {link.name}
              </a>
            ))}
            <a
              href={getTryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={`block ${btnPrimary} text-center mt-4 mx-3`}
              aria-label="Try Heidi now"
            >
              Try Heidi
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 