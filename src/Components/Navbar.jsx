import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-white">
          <Link to="/">TourMate</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/packages"
              className="hover:text-blue-400 transition duration-200"
            >
              Packages
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-blue-400 transition duration-200"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-blue-400 transition duration-200"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-gray-900 text-white space-y-2 py-3 px-4">
          <li>
            <Link
              to="/"
              className="block hover:text-blue-400 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/packages"
              className="block hover:text-blue-400 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Packages
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block hover:text-blue-400 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block hover:text-blue-400 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
