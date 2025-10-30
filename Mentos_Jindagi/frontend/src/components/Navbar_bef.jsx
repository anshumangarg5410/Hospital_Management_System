import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // You'll need to install lucide-react or use your own icons
import logo from "/Assets/mainlogo.png";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/home" },
    { label: "Contact", path: "/contact" },
    { label: "Login", path: "/user_sel" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-xl border-b border-gray-100/50 z-[1000] transition-all duration-300">
      <nav className="flex justify-between items-center px-[5%] py-4 w-full min-h-[10vh] max-w-[1400px] mx-auto">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-[10px] text-xl font-bold text-blue-600 no-underline"
        >
          <div
            className="h-[50px] w-[60px] bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${logo})` }}
          ></div>
          <span className="text-[1.5rem]">HMS</span>
        </NavLink>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex list-none gap-8 text-[1.1rem] items-center">
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `relative font-medium transition-colors duration-300 after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[2px] after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300 ${
                    isActive ? "text-blue-600 after:w-full" : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}

          {/* Special button */}
          <li>
            <NavLink to="/book-appointment">
              <button className="bg-blue-600 text-[1rem] text-white px-[1.5rem] py-[0.7rem] rounded-lg font-semibold transition-all duration-300 hover:bg-blue-700 hover:-translate-y-[2px] hover:shadow-lg">
                Book Appointment
              </button>
            </NavLink>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 md:hidden">
            <ul className="flex flex-col py-4 px-[5%] space-y-4">
              {navItems.map(({ label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block font-medium transition-colors duration-300 ${
                        isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink to="/book-appointment" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Book Appointment
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;





