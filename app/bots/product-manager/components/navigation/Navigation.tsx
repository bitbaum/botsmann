'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Navigation component for Trident - AI Product Manager
 * Structured around the core value propositions and sections
 */
const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define links
  const botPageLink = '/bots';
  const chatLink = '/chat?bot=product-manager';

  // Menu items organized by value proposition
  const menuItems = [
    { id: 'features', label: 'Features', icon: '🛠️', section: 'features' },
    { id: 'examples', label: 'Examples', icon: '📝', section: 'examples' },
    { id: 'showcase', label: 'Showcase', icon: '🔍', section: 'showcase' },
    { id: 'try-it', label: 'Try It', icon: '🚀', section: 'try-it' },
    { id: 'integrations', label: 'Integrations', icon: '🔄', section: 'integrations' },
    { id: 'benefits', label: 'Benefits', icon: '✅', section: 'benefits' },
    { id: 'roadmap', label: '2025 Roadmap', icon: '📊', section: 'roadmap' },
    { id: 'vision', label: 'Vision', icon: '🔮', section: 'vision' },
    { id: 'join', label: 'Join Us', icon: '👥', section: 'join' }
  ];

  // Handle scroll events to show/hide navigation and highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide navigation based on scroll direction
      if (currentScrollY > 100) {
        setIsVisible(lastScrollY > currentScrollY || currentScrollY < 200);
      } else {
        setIsVisible(true);
      }
      
      // Determine active section
      const sectionIds = menuItems.map(item => item.section);
      // Find which section is currently in view
      const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.getBoundingClientRect().top <= 300) {
          setActiveSection(section.id);
          break;
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuItems]);

  // Handle smooth scrolling when clicking a menu item
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, 
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
      // Close mobile menu after clicking
      setIsMobileMenuOpen(false);
    }
  };

  // Scroll to top function for logo click
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMobileMenuOpen(false);
  };

  const navClasses = lastScrollY > 100 
    ? 'bg-white shadow-md border-b border-gray-200' 
    : 'bg-white border-b border-gray-200';

  return (
    <nav 
      className={`transition-all duration-300 w-full py-3 fixed top-0 left-0 right-0 z-50 ${navClasses} ${
        isVisible ? 'transform-none' : 'transform -translate-y-full'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Clickable logo that scrolls to top */}
          <button 
            onClick={scrollToTop} 
            className="flex items-center focus:outline-none hover:opacity-90 transition-opacity"
            aria-label="Back to top"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-xl">🔱</span>
            </div>
            <h2 className="text-xl font-bold text-blue-900">Trident</h2>
            <span className="text-sm text-gray-500 ml-2 hidden sm:inline-block">AI Product Manager</span>
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-700 hover:bg-blue-50 focus:outline-none"
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
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:space-x-1 items-center overflow-x-auto no-scrollbar">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.section)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex items-center ${
                  activeSection === item.section
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                } ${item.id === 'roadmap' ? 'border border-blue-300' : ''}`}
              >
                <span className="mr-1">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          
          {/* Call-to-action button */}
          <Link
            href={{ pathname: '/chat', query: { bot: 'product-manager' } }}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap ml-2"
          >
            Open Chat
          </Link>
        </div>
        
        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-2 bg-white border-t border-gray-100 space-y-1 max-h-[80vh] overflow-y-auto">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.section)}
                className={`w-full text-left px-4 py-2 flex items-center text-sm font-medium transition-colors ${
                  activeSection === item.section
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}

            <hr className="my-2 border-gray-200" />
            
            <Link 
              href={{ pathname: '/chat', query: { bot: 'product-manager' } }}
              className="w-full block text-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors mt-2"
            >
              Open Chat
            </Link>
            
            <Link 
              href={{ pathname: botPageLink }}
              className="w-full block text-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors mt-2"
            >
              Back to Bots
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 