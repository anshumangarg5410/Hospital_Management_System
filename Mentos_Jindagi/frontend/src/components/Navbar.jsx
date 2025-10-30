import React, { useState, useEffect } from 'react';
import { Menu, X, Star, Search, ChevronDown, UserCircle, Calendar, FileText, Settings, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate checking for logged in user
  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setIsLoggedIn(true);
      setUserName(storedUser);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('User');
    localStorage.removeItem('userName');
    setIsUserDropdownOpen(false);
  };

  // For demo purposes - toggle login state
  const handleLoginDemo = () => {
    setIsLoggedIn(true);
    setUserName('John Doe');
    localStorage.setItem('userName', 'John Doe');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 shadow-lg' : 'bg-white/95'
    } backdrop-blur-md`}>
      <nav className="max-w-[1400px] mx-auto px-[5%] py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 text-2xl font-bold text-indigo-600 no-underline transition-transform hover:scale-105">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">H</span>
          </div>
          <span>HMS</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
          <li>
            <a href="#home" className="relative text-gray-700 font-medium no-underline transition-colors hover:text-indigo-600 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="relative text-gray-700 font-medium no-underline transition-colors hover:text-indigo-600 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="relative text-gray-700 font-medium no-underline transition-colors hover:text-indigo-600 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full">
              Contact
            </a>
          </li>

          {/* Auth Section */}
          {!isLoggedIn ? (
            <li>
              <button
                onClick={handleLoginDemo}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/40"
              >
                Login
              </button>
            </li>
          ) : (
            <li className="relative">
              <div
                onClick={toggleUserDropdown}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-indigo-600/10 cursor-pointer transition-all hover:bg-indigo-600/20"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-gray-700 max-w-[120px] truncate">
                  {userName}
                </span>
                <ChevronDown className={`w-3 h-3 text-indigo-600 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute top-[calc(100%+10px)] right-0 bg-white rounded-xl shadow-2xl min-w-[220px] overflow-hidden animate-fadeIn">
                  <a href="#portal" className="flex items-center gap-3 px-5 py-3 text-gray-700 no-underline transition-all hover:bg-indigo-600/10 hover:text-indigo-600">
                    <UserCircle className="w-[18px] h-[18px] text-indigo-600" />
                    <span className="text-sm font-medium">My Portal</span>
                  </a>
                  <a href="#appointments" className="flex items-center gap-3 px-5 py-3 text-gray-700 no-underline transition-all hover:bg-indigo-600/10 hover:text-indigo-600">
                    <Calendar className="w-[18px] h-[18px] text-indigo-600" />
                    <span className="text-sm font-medium">Appointments</span>
                  </a>
                  <a href="#prescriptions" className="flex items-center gap-3 px-5 py-3 text-gray-700 no-underline transition-all hover:bg-indigo-600/10 hover:text-indigo-600">
                    <FileText className="w-[18px] h-[18px] text-indigo-600" />
                    <span className="text-sm font-medium">Prescriptions</span>
                  </a>
                  <a href="#settings" className="flex items-center gap-3 px-5 py-3 text-gray-700 no-underline transition-all hover:bg-indigo-600/10 hover:text-indigo-600">
                    <Settings className="w-[18px] h-[18px] text-indigo-600" />
                    <span className="text-sm font-medium">Settings</span>
                  </a>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-3 text-gray-700 transition-all hover:bg-indigo-600/10 hover:text-indigo-600 border-none bg-transparent cursor-pointer text-left"
                  >
                    <LogOut className="w-[18px] h-[18px] text-indigo-600" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-indigo-600 transition-transform hover:scale-110 border-none bg-transparent cursor-pointer"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-white/98 backdrop-blur-md flex flex-col items-start p-8 gap-6 shadow-xl animate-slideIn">
          <a href="#home" className="w-full text-center text-gray-700 font-medium text-lg no-underline p-4 rounded-lg transition-all hover:bg-indigo-600/10 hover:text-indigo-600">
            Home
          </a>
          <a href="#about" className="w-full text-center text-gray-700 font-medium text-lg no-underline p-4 rounded-lg transition-all hover:bg-indigo-600/10 hover:text-indigo-600">
            About
          </a>
          <a href="#contact" className="w-full text-center text-gray-700 font-medium text-lg no-underline p-4 rounded-lg transition-all hover:bg-indigo-600/10 hover:text-indigo-600">
            Contact
          </a>

          {!isLoggedIn ? (
            <button
              onClick={handleLoginDemo}
              className="w-full px-8 py-4 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:shadow-xl border-none cursor-pointer"
            >
              Login
            </button>
          ) : (
            <div className="w-full">
              <div
                onClick={toggleUserDropdown}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-indigo-600/10 cursor-pointer transition-all hover:bg-indigo-600/20"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-gray-700">{userName}</span>
                <ChevronDown className={`w-3 h-3 text-indigo-600 ml-auto transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {isUserDropdownOpen && (
                <div className="mt-3 bg-indigo-600/5 rounded-lg overflow-hidden">
                  <a href="#portal" className="flex items-center gap-3 px-5 py-3.5 text-gray-700 no-underline transition-all hover:bg-indigo-600/10 hover:text-indigo-600">
                    <UserCircle className="w-[18px] h-[18px] text-indigo-600" />
                    <span className="text-base font-medium">My Portal</span>
                  </a>
                  <a href="#appointments" className="flex items-center gap-3 px-5 py-3.5 text-gray-700 no-underline transition-all hover:bg-indigo-600/10 hover:text-indigo-600">
                    <Calendar className="w-[18px] h-[18px] text-indigo-600" />
                    <span className="text-base font-medium">Appointments</span>
                  </a>
                  <a href="#prescriptions" className="flex items-center gap-3 px-5 py-3.5 text-gray-700 no-underline transition-all hover:bg-indigo-600/10 hover:text-indigo-600">
                    <FileText className="w-[18px] h-[18px] text-indigo-600" />
                    <span className="text-base font-medium">Prescriptions</span>
                  </a>
                  <a href="#settings" className="flex items-center gap-3 px-5 py-3.5 text-gray-700 no-underline transition-all hover:bg-indigo-600/10 hover:text-indigo-600">
                    <Settings className="w-[18px] h-[18px] text-indigo-600" />
                    <span className="text-base font-medium">Settings</span>
                  </a>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-3.5 text-gray-700 transition-all hover:bg-indigo-600/10 hover:text-indigo-600 border-none bg-transparent cursor-pointer text-left"
                  >
                    <LogOut className="w-[18px] h-[18px] text-indigo-600" />
                    <span className="text-base font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease;
        }
      `}</style>
    </header>
  );
};

export default Navbar;