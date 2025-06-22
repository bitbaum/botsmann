import React, { useState, useEffect } from "react";
import Link from "next/link";

/**
 * Navigation component for Nerd - AI Research Assistant
 * Structured around the six core value propositions
 */
const Navigation: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Menu items organized by value proposition
  const menuItems = [
    {
      id: "organize",
      label: "Organize Research",
      icon: "📚",
      section: "research-system",
    },
    {
      id: "updates",
      label: "Stay Updated",
      icon: "🔄",
      section: "web-scraping",
    },
    {
      id: "create",
      label: "Create Content",
      icon: "✍️",
      section: "draft-generation",
    },
    {
      id: "engage",
      label: "Stay Engaged",
      icon: "🔍",
      section: "daily-questions",
    },
    {
      id: "collaborate",
      label: "Collaborate",
      icon: "👥",
      section: "integration",
    },
    { id: "roadmap", label: "2026 Launch", icon: "🚀", section: "roadmap" },
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
        const sectionIds = menuItems.map((item) => item.section);
        // Find which section is currently in view
        const sections = sectionIds
          .map((id) => document.getElementById(id))
          .filter(Boolean);

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && section.offsetTop <= currentScrollY + 300) {
            const menuItem = menuItems.find(
              (item) => item.section === section.id,
            );
            if (menuItem) {
              setActiveSection(menuItem.id);
            }
            break;
          }
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, menuItems]);

  // Handle smooth scrolling when clicking a menu item
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
      const menuItem = menuItems.find((item) => item.section === sectionId);
      if (menuItem) {
        setActiveSection(menuItem.id);
      }
      // Close mobile menu after clicking
      setIsMobileMenuOpen(false);
    }
  };

  // Scroll to top function for logo click
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`transition-all duration-300 w-full py-3 bg-white border-b border-gray-200 fixed top-0 ${
        isVisible ? "transform-none shadow-md" : "transform -translate-y-full"
      } ${className} research-navigation z-50`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Clickable logo that scrolls to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center focus:outline-none hover:opacity-90 transition-opacity"
            aria-label="Back to top"
          >
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-xl">🧠</span>
            </div>
            <h2 className="text-xl font-bold text-indigo-900 logo-text">
              Nerd
            </h2>
            <span className="text-sm text-gray-500 ml-2 hidden sm:inline-block">
              AI Research Assistant
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-1 overflow-x-auto no-scrollbar">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.section)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex items-center ${
                  activeSection === item.id
                    ? "text-indigo-700 bg-indigo-50"
                    : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-50"
                } ${item.id === "roadmap" ? "border border-indigo-400" : ""}`}
              >
                <span className="mr-1">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Call-to-action button */}
          <Link
            href="https://chatgpt.com/g/research-assistant"
            target="_blank"
            className="call-to-action px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap ml-2"
          >
            Join Waitlist
          </Link>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-2 bg-white border-t border-gray-100 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.section)}
                className={`w-full text-left px-4 py-2 flex items-center text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-indigo-700 bg-indigo-50"
                    : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-50"
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
