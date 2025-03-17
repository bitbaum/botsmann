/**
 * Navigation fixes to prevent dropdown menu interference between
 * Botsmann header and bot-specific navigation bars.
 */

// Function to initialize dropdown behavior fixes
export const initializeNavigationFixes = () => {
  // This function should be called in the useEffect of bot pages
  
  const addNavigationFixes = () => {
    // Find all dropdown containers in the Botsmann header
    const dropdownContainers = document.querySelectorAll('.dropdown-container');
    const botNavigation = document.querySelector('.bot-navigation');
    
    if (!dropdownContainers.length || !botNavigation) {
      // If elements don't exist yet, try again in 100ms
      setTimeout(addNavigationFixes, 100);
      return;
    }
    
    // Function to handle dropdown visibility
    const handleDropdownToggle = (container, isVisible) => {
      // Get the dropdown menu within this container
      const dropdown = container.querySelector('.dropdown-menu');
      if (!dropdown) return;
      
      if (isVisible) {
        // When dropdown is shown
        dropdown.classList.remove('hidden');
        document.body.classList.add('dropdown-open');
        
        // Ensure dropdown has highest z-index
        dropdown.style.zIndex = '1000';
        
        // Make bot navigation ignore pointer events temporarily
        if (botNavigation) {
          botNavigation.style.pointerEvents = 'none';
        }
      } else {
        // When dropdown is hidden
        dropdown.classList.add('hidden');
        document.body.classList.remove('dropdown-open');
        
        // Reset bot navigation
        if (botNavigation) {
          botNavigation.style.pointerEvents = '';
        }
      }
    };
    
    // Add event listeners to dropdown containers
    dropdownContainers.forEach(container => {
      // For mouse interaction
      container.addEventListener('mouseenter', () => {
        handleDropdownToggle(container, true);
      });
      
      container.addEventListener('mouseleave', () => {
        handleDropdownToggle(container, false);
      });
      
      // For touch/click interaction
      container.addEventListener('click', (e) => {
        const dropdown = container.querySelector('.dropdown-menu');
        const isHidden = dropdown?.classList.contains('hidden');
        
        // Hide all other dropdowns first
        dropdownContainers.forEach(otherContainer => {
          if (otherContainer !== container) {
            handleDropdownToggle(otherContainer, false);
          }
        });
        
        // Toggle this dropdown
        handleDropdownToggle(container, isHidden);
        e.stopPropagation();
      });
    });
    
    // Click outside to close all dropdowns
    document.addEventListener('click', () => {
      dropdownContainers.forEach(container => {
        handleDropdownToggle(container, false);
      });
    });
  };

  // Execute when window loads
  if (document.readyState === 'complete') {
    addNavigationFixes();
  } else {
    window.addEventListener('load', addNavigationFixes);
    return () => window.removeEventListener('load', addNavigationFixes);
  }
}; 