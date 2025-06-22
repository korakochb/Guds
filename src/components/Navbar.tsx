import React, { useState } from 'react';

export default function Navbar({ isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const navBgColor = isDarkMode ? "#444444" : "#f7f7f7";
  const mobileMenuBgColor = isDarkMode ? "#444444" : "#d9d1c8"; // Keep mobile dropdown a distinct color for clarity
  const textColorClass = isDarkMode ? "text-white" : "text-black";
  const linkStyle = `text-lg font-medium tracking-wide hover:underline font-mont ${textColorClass}`;

  return (
    <nav className={`py-6 px-4 sm:px-8 relative z-20`} style={{ backgroundColor: navBgColor }}>
      <div className="max-w-7xl mx-auto">
        
        {/* --- Mobile View --- */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            {/* Left Spacer */}
            <div className="flex-1"></div>
            
            {/* Center Logo */}
            <div className={`flex-1 text-center text-3xl font-bold tracking-wide ${textColorClass}`}>
              <a href="/">GÜDS</a>
            </div>

            {/* Right button */}
            <div className="flex-1 flex justify-end">
              <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" className={textColorClass}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isOpen && (
            <div className="absolute top-full left-0 w-full" style={{ backgroundColor: mobileMenuBgColor }}>
              <div className="flex flex-col items-center gap-y-4 py-4">
                <a href="/" className={linkStyle} onClick={() => setIsOpen(false)}>home</a>
                <a href="#" className={linkStyle} onClick={() => setIsOpen(false)}>menu</a>
                <a href="#" className={linkStyle} onClick={() => setIsOpen(false)}>about us</a>
                <a href="#" className={linkStyle} onClick={() => setIsOpen(false)}>cart</a>
              </div>
            </div>
          )}
        </div>

        {/* --- Desktop View --- */}
        <div className="hidden md:grid grid-cols-5 items-center text-center">
          <a href="#" className={linkStyle}>home</a>
          <a href="#" className={linkStyle}>menu</a>
          <div className={`text-3xl font-bold tracking-wide ${textColorClass}`}>
            <a href="/">GÜDS</a>
          </div>
          <a href="#" className={linkStyle}>about us</a>
          <a href="#" className={linkStyle}>cart</a>
        </div>
      </div>
    </nav>
  );
} 