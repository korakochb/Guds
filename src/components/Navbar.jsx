import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#d9d1c8] text-white py-6 px-4 sm:px-8 relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Mobile View --- */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            {/* Left Spacer */}
            <div className="flex-1"></div>
            
            {/* Center Logo */}
            <div className="flex-1 text-center text-3xl font-bold tracking-wide">
              <Link to="/">GÜDS</Link>
            </div>

            {/* Right button */}
            <div className="flex-1 flex justify-end">
              <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-[#d9d1c8]">
              <div className="flex flex-col items-center gap-y-4 py-4">
                <Link to="/" className="text-lg font-medium tracking-wide hover:underline" onClick={() => setIsOpen(false)}>home</Link>
                <Link to="/menu" className="text-lg font-medium tracking-wide hover:underline" onClick={() => setIsOpen(false)}>menu</Link>
                <Link to="/about" className="text-lg font-medium tracking-wide hover:underline" onClick={() => setIsOpen(false)}>about us</Link>
                <Link to="/cart" className="text-lg font-medium tracking-wide hover:underline" onClick={() => setIsOpen(false)}>cart</Link>
              </div>
            </div>
          )}
        </div>

        {/* --- Desktop View --- */}
        <div className="hidden md:grid grid-cols-5 items-center text-center">
          <Link to="/" className="text-lg font-medium tracking-wide hover:underline">home</Link>
          <Link to="/menu" className="text-lg font-medium tracking-wide hover:underline">menu</Link>
          <div className="text-3xl font-bold tracking-wide">
            <Link to="/">GÜDS</Link>
          </div>
          <Link to="/about" className="text-lg font-medium tracking-wide hover:underline">about us</Link>
          <Link to="/cart" className="text-lg font-medium tracking-wide hover:underline">cart</Link>
        </div>
      </div>
    </nav>
  );
}
