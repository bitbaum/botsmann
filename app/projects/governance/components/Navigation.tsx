'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Define type for path objects
type PathWithHash = {
  pathname: string;
  hash?: string;
};

/**
 * Navigation component for Solon Governance
 * Structured around the core sections of the platform
 */
const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const productsDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Define static links to avoid type errors
  const projectsLink: PathWithHash = { pathname: '/projects' };
  const solonLink: PathWithHash = { pathname: '/projects/governance' };
  const demoLink: PathWithHash = { pathname: '/projects/governance', hash: 'request-demo' };
  const portalLink: PathWithHash = { pathname: '/projects/governance/portal' };
  const buildLink: PathWithHash = { pathname: '/projects/governance/build' };
  const citizenLink: PathWithHash = { pathname: '/projects/governance/citizen' };
  const transparencyLink: PathWithHash = { pathname: '/projects/governance/transparency' };

  // Product links with value-focused labels
  const productLinks = [
    { id: 'open-pay', label: 'Open Pay', path: { pathname: '/projects/governance/open-pay' } as PathWithHash },
    { id: 'open-law', label: 'Open Law', path: { pathname: '/projects/governance/open-law' } as PathWithHash },
    { id: 'open-service', label: 'Open Service', path: { pathname: '/projects/governance/open-service' } as PathWithHash },
    { id: 'open-vote', label: 'Open Vote', path: { pathname: '/projects/governance/open-vote' } as PathWithHash },
    { id: 'transparency', label: 'Transparency Suite', path: transparencyLink },
  ];

  // User profile related links
  const profileLinks = [
    { id: 'citizen-profile', label: 'My Profile', path: citizenLink },
    { id: 'tax-history', label: 'Tax History', path: { pathname: '/projects/governance/citizen', hash: 'tax' } as PathWithHash },
    { id: 'agency-contributions', label: 'My Contributions', path: { pathname: '/projects/governance/citizen', hash: 'advisory' } as PathWithHash },
    { id: 'benefits', label: 'My Benefits', path: { pathname: '/projects/governance/citizen', hash: 'benefits' } as PathWithHash },
  ];

  // Menu items organized by section
  type MenuItem = {
    id: string;
    label: string;
    icon?: string;
    path?: PathWithHash;
    section: string;
    hasDropdown?: boolean;
  };

  const menuItems: MenuItem[] = [
    { id: 'overview', label: 'Overview', icon: '📝', path: solonLink, section: 'overview' },
    { id: 'portal', label: 'Portal', icon: '📊', path: portalLink, section: 'portal' },
    { id: 'products', label: 'Products', icon: '🧩', section: 'products', hasDropdown: true },
    { id: 'build', label: 'Build', icon: '🛠️', path: buildLink, section: 'build' },
    { id: 'whitepaper', label: 'Whitepaper', icon: '📄', path: { pathname: '/projects/governance/whitepaper' }, section: 'whitepaper' },
  ];

  // Handle scroll events
  useEffect(() => {
    // Only run scroll detection on the main page
    if (pathname !== '/projects/governance') return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide/show based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      // Determine which section is active
      const sections = menuItems
        .filter(item => item.section)
        .map(item => item.section);
        
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.getBoundingClientRect().top <= 300) {
          setActiveSection(sections[i]);
          break;
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuItems, pathname]);

  // Click outside handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setIsProductsDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle smooth scrolling when clicking a menu item
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  // Handle menu item click
  const handleMenuItemClick = (menuItem: MenuItem) => {
    if (menuItem.hasDropdown) {
      setIsProductsDropdownOpen(!isProductsDropdownOpen);
    } else if (menuItem.path?.hash && pathname === '/projects/governance') {
      // If we're on the main page and the link has a hash, use smooth scrolling
      const sectionId = menuItem.path.hash.replace('#', '');
      scrollToSection(sectionId);
    } else if (menuItem.path) {
      // Otherwise, just navigate to the path
      window.location.href = menuItem.path.pathname + (menuItem.path.hash ? '#' + menuItem.path.hash : '');
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${lastScrollY > 100 ? 'shadow-md' : ''}`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={solonLink} className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full text-xl mr-3">
              🏛️
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-800">Solon</h2>
              <p className="text-xs text-gray-500 -mt-1">Decentralized Governance</p>
            </div>
          </Link>
          
          {/* Mobile menu button */}
          <div className="flex items-center gap-2">
            <Link
              href={projectsLink}
              className="text-sm text-gray-500 hidden md:inline-flex items-center hover:text-gray-700 mr-4"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              All Projects
            </Link>
            
            <button 
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-1 items-center overflow-x-auto no-scrollbar">
            {menuItems.map(item => (
              <div key={item.id} className="relative">
                {item.hasDropdown ? (
                  <button
                    onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex items-center ${
                      activeSection === item.section
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                    }`}
                  >
                    {item.icon && <span className="mr-1">{item.icon}</span>}
                    <span>{item.label}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link 
                    href={item.path || { pathname: '#' }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex items-center ${
                      (pathname === (item.path ? item.path.pathname : '') || activeSection === item.section)
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                    }`}
                    onClick={(e) => {
                      if (item.path?.hash && pathname === '/projects/governance') {
                        e.preventDefault();
                        const sectionId = item.path.hash.replace('#', '');
                        scrollToSection(sectionId);
                      }
                    }}
                  >
                    {item.icon && <span className="mr-1">{item.icon}</span>}
                    <span>{item.label}</span>
                  </Link>
                )}
                
                {/* Products dropdown */}
                {item.id === 'products' && isProductsDropdownOpen && (
                  <div 
                    ref={productsDropdownRef}
                    className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  >
                    <div className="py-1">
                      {productLinks.map((product) => (
                        <Link
                          key={product.id}
                          href={product.path}
                          className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                            pathname === (product.path && 'pathname' in product.path ? product.path.pathname : '')
                              ? 'text-green-700 bg-green-50' 
                              : 'text-gray-700'
                          }`}
                        >
                          {product.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* User Profile Dropdown */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium">
                AM
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isProfileDropdownOpen && (
              <div 
                ref={profileDropdownRef}
                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              >
                <div className="py-1">
                  {profileLinks.map((link) => (
                    <Link
                      key={link.id}
                      href={link.path}
                      className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                        pathname === (link.path && 'pathname' in link.path ? link.path.pathname : '')
                          ? 'text-green-700 bg-green-50' 
                          : 'text-gray-700'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Demo link */}
          <Link
            href={demoLink}
            className="hidden md:block px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm whitespace-nowrap ml-2"
          >
            Request Demo
          </Link>
        </div>
        
        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-2 bg-white border-t border-gray-100 space-y-1 max-h-[80vh] overflow-y-auto">
            {menuItems.map(item => (
              <div key={item.id}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                      className={`w-full text-left px-4 py-2 flex items-center justify-between text-sm font-medium transition-colors ${
                        activeSection === item.section
                          ? 'text-green-700 bg-green-50'
                          : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                      }`}
                    >
                      <div className="flex items-center">
                        {item.icon && <span className="mr-3 text-lg">{item.icon}</span>}
                        <span>{item.label}</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isProductsDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Product links for mobile */}
                    {isProductsDropdownOpen && (
                      <div className="pl-8 pt-1 pb-2 space-y-1">
                        {productLinks.map(product => (
                          <Link
                            key={product.id}
                            href={product.path}
                            className={`block px-4 py-2 text-sm hover:bg-green-50 rounded-md ${
                              pathname === (product.path && 'pathname' in product.path ? product.path.pathname : '')
                                ? 'text-green-700 bg-green-50' 
                                : 'text-gray-600 hover:text-green-700'
                            }`}
                          >
                            {product.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path || { pathname: '#' }}
                    className={`w-full text-left px-4 py-2 flex items-center text-sm font-medium transition-colors ${
                      (pathname === (item.path ? item.path.pathname : '') || activeSection === item.section)
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                    }`}
                    onClick={(e) => {
                      if (item.path?.hash && pathname === '/projects/governance') {
                        e.preventDefault();
                        const sectionId = item.path.hash.replace('#', '');
                        scrollToSection(sectionId);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.icon && <span className="mr-3 text-lg">{item.icon}</span>}
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile User Profile Links */}
            <div className="border-t border-gray-100 pt-3 mt-3">
              <div className="px-4 py-2 flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium mr-3">
                  AM
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Alex Morgan</div>
                  <div className="text-xs text-gray-500">Citizen ID: CIT-10045876</div>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                {profileLinks.map(link => (
                  <Link
                    key={link.id}
                    href={link.path}
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50"
                >
                  Sign Out
                </button>
              </div>
            </div>
            
            <Link
              href={demoLink}
              className="block w-full text-center mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Request Demo
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 