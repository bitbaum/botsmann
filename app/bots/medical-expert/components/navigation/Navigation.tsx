import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Navigation component for Dr. Imhotep with restructured sections
 */
const Navigation: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Restructured menu items following the requested flow
  const menuItems = [
    { id: 'patient-features', label: 'For Patients' },
    { id: 'for-professionals', label: 'For Professionals' },
    { id: 'health-education', label: 'Health Education' },
    { id: 'coming-soon', label: 'Future Products' },
    { id: 'vision-and-join', label: 'Vision & Join Us' }
  ];

  // Handle scroll events to show/hide navigation and highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navigation after scrolling down 200px
      if (currentScrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      // Determine active section
      if (currentScrollY > 100) {
        // Find which section is currently in view
        const menuItemsCopy = [...menuItems];
        for (const item of menuItemsCopy.reverse()) {
          const element = document.getElementById(item.id);
          if (element && element.offsetTop <= currentScrollY + 300) {
            setActiveSection(item.id);
            break;
          }
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Handle smooth scrolling when clicking a menu item
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, 
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  // Scroll to top function for logo click
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav 
      className={`transition-all duration-300 w-full py-3 bg-white border-b border-gray-200 fixed top-0 ${
        isVisible ? 'transform-none shadow-md' : 'transform -translate-y-full'
      } ${className} imhotep-navigation z-50`}
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Clickable logo that scrolls to top */}
          <button 
            onClick={scrollToTop} 
            className="flex items-center focus:outline-none hover:opacity-90 transition-opacity"
            aria-label="Back to top"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-xl">👨‍⚕️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 logo-text">Imhotep</h2>
          </button>
          
          <div className="hidden md:flex space-x-3 overflow-x-auto no-scrollbar">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeSection === item.id
                    ? 'text-green-700 bg-green-50'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                } ${item.id === 'for-professionals' ? 'border border-green-400' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Improved call-to-action button */}
          <Link
            href="https://chatgpt.com/g/g-oAUMruOWt-dr-imhotep"
            target="_blank"
            className="call-to-action px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors shadow-sm whitespace-nowrap"
          >
            Chat Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 