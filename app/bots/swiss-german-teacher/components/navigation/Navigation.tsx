import React, { useState, useEffect } from "react";
import Link from "next/link";

/**
 * Navigation component for Heidi with section tracking and consistent appearance behavior
 */
const Navigation: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Menu items for Heidi navigation
  const menuItems = [
    { id: "language-learning", label: "Language Learning" },
    { id: "communication", label: "Communication" },
    { id: "social", label: "Social Integration" },
    { id: "content", label: "Content Library" },
    { id: "future-vision", label: "Roadmap" },
  ];

  // Handle scroll events to show/hide navigation and highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navigation after scrolling down 200px (reduced from 300px)
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle smooth scrolling when clicking a menu item
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <nav
      className={`transition-all duration-300 w-full py-3 bg-white border-b border-gray-200 fixed top-0 ${
        isVisible ? "transform-none shadow-md" : "transform -translate-y-full"
      } ${className}`}
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-xl">👩‍🏫</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Heidi</h2>
          </div>

          <div className="hidden md:flex space-x-1 overflow-x-auto no-scrollbar">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeSection === item.id
                    ? "text-red-700 bg-red-50"
                    : "text-gray-600 hover:text-red-700 hover:bg-red-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Link
            href="https://chatgpt.com/g/g-GHYSu7LTj-heidi-swiss-german-teacher"
            target="_blank"
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            Chat with Heidi
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
