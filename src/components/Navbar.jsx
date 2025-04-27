import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-[#d9d1c8] text-white py-6 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-5 items-center text-center">
        {/* เมนูซ้าย */}
        <Link to="/" className="text-lg font-medium tracking-wide hover:underline">home</Link>
        <Link to="/menu" className="text-lg font-medium tracking-wide hover:underline">menu</Link>

        {/* โลโก้ GÜDS */}
        <div className="text-3xl font-bold tracking-wide">GÜDS</div>

        {/* เมนูขวา */}
        <Link to="/about" className="text-lg font-medium tracking-wide hover:underline">about us</Link>
        <Link to="/cart" className="text-lg font-medium tracking-wide hover:underline">cart</Link>
      </div>
    </nav>
  );
}
