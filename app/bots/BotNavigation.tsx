'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  section?: string;
}

interface BotNavigationProps {
  botTitle: string;
  botEmoji: string;
  botDescription?: string;
  accentColor?: string;
  menuItems: MenuItem[];
  chatLink?: string;
  sections?: boolean;
}

/**
 * Reusable navigation component for bot detail pages
 */
const BotNavigation: React.FC<BotNavigationProps> = ({
  botTitle,
  botEmoji,
  botDescription = '',
  accentColor = 'blue',
  menuItems,
  chatLink,
  sections = true,
}) => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll events to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine active section when sections are enabled
      if (sections) {
        const sectionIds = menuItems
          .filter(item => item.section)
          .map(item => item.section as string);
          
        // Find which section is currently in view
        const sectionElements = sectionIds
          .map(id => document.getElementById(id))
          .filter(Boolean);
        
        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i];
          if (section && section.getBoundingClientRect().top <= 300) {
            setActiveSection(section.id);
            break;
          }
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuItems, sections]);

  // Handle smooth scrolling when clicking a menu item
  const scrollToSection = (sectionId: string | undefined) => {
    if (!sectionId) return;
    
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

  const colorClasses = {
    blue: {
      logo: 'bg-blue-100',
      title: 'text-blue-900',
      active: 'text-blue-700 bg-blue-50',
      hover: 'hover:text-blue-700 hover:bg-blue-50',
      accent: 'bg-blue-600 hover:bg-blue-700',
      border: 'border-blue-300',
    },
    green: {
      logo: 'bg-green-100',
      title: 'text-green-900',
      active: 'text-green-700 bg-green-50',
      hover: 'hover:text-green-700 hover:bg-green-50',
      accent: 'bg-green-600 hover:bg-green-700',
      border: 'border-green-300',
    },
    indigo: {
      logo: 'bg-indigo-100',
      title: 'text-indigo-900',
      active: 'text-indigo-700 bg-indigo-50',
      hover: 'hover:text-indigo-700 hover:bg-indigo-50',
      accent: 'bg-indigo-600 hover:bg-indigo-700',
      border: 'border-indigo-300',
    },
    red: {
      logo: 'bg-red-100',
      title: 'text-red-900',
      active: 'text-red-700 bg-red-50',
      hover: 'hover:text-red-700 hover:bg-red-50',
      accent: 'bg-red-600 hover:bg-red-700',
      border: 'border-red-300',
    },
    amber: {
      logo: 'bg-amber-100',
      title: 'text-amber-900',
      active: 'text-amber-700 bg-amber-50',
      hover: 'hover:text-amber-700 hover:bg-amber-50',
      accent: 'bg-amber-600 hover:bg-amber-700',
      border: 'border-amber-300',
    },
  };

  // Get the appropriate color classes or default to blue
  const colors = colorClasses[accentColor as keyof typeof colorClasses] || colorClasses.blue;

  const navClasses = lastScrollY > 100 
    ? 'bg-white shadow-md border-b border-gray-200' 
    : 'bg-white border-b border-gray-200';

  return (
    <nav 
      className={`transition-all duration-300 w-full py-3 fixed top-0 left-0 right-0 z-50 ${navClasses}`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Clickable logo that scrolls to top */}
          <button 
            onClick={scrollToTop} 
            className="flex items-center focus:outline-none hover:opacity-90 transition-opacity"
            aria-label="Back to top"
          >
            <div className={`w-10 h-10 ${colors.logo} rounded-full flex items-center justify-center mr-3`}>
              <span className="text-xl">{botEmoji}</span>
            </div>
            <h2 className={`text-xl font-bold ${colors.title}`}>{botTitle}</h2>
            {botDescription && (
              <span className="text-sm text-gray-500 ml-2 hidden sm:inline-block">{botDescription}</span>
            )}
          </button>
          
          {/* Mobile menu button */}
          <div className="flex items-center gap-2">
            <Link
              href="/bots" 
              className="text-sm text-gray-500 hidden md:inline-flex items-center hover:text-gray-700 mr-2"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              All Bots
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
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:space-x-1 items-center overflow-x-auto no-scrollbar">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.section)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex items-center ${
                  activeSection === item.section
                    ? colors.active
                    : `text-gray-600 ${colors.hover}`
                } ${item.id === 'roadmap' ? `border ${colors.border}` : ''}`}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          
          {/* Call-to-action button */}
          {chatLink && (
            <Link
              href={chatLink as any}
              className={`px-4 py-2 ${colors.accent} text-white text-sm font-medium rounded-md transition-colors shadow-sm whitespace-nowrap ml-2`}
            >
              Open Chat
            </Link>
          )}
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
                    ? colors.active
                    : `text-gray-600 ${colors.hover}`
                }`}
              >
                {item.icon && <span className="mr-3 text-lg">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}

            <hr className="my-2 border-gray-200" />
            
            {chatLink && (
              <Link 
                href={chatLink as any}
                className={`w-full block text-center px-4 py-2 ${colors.accent} text-white text-sm font-medium rounded-md transition-colors mt-2`}
              >
                Open Chat
              </Link>
            )}
            
            <Link 
              href="/bots"
              className="w-full block text-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors mt-2"
            >
              Back to All Bots
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BotNavigation; 