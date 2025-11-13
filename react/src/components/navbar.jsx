import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const backendLink = "http://localhost:3000";

  useEffect(() => {
    loadNavbar();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      
      if (mobileMenuOpen && window.innerWidth <= 968) {
        const nav = document.querySelector('.nav-links');
        const btn = document.querySelector('.mobile-menu');
        if (nav && btn && !nav.contains(event.target) && !btn.contains(event.target)) {
          setMobileMenuOpen(false);
        }
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen, mobileMenuOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 968) {
        setMobileMenuOpen(false);
        setDropdownOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  async function loadNavbar() {
    try {
      const response = await fetch(`${backendLink}/currentUser`);
      const result = await response.json();
      
      const userData = result.user || result;
      if (userData && userData.username) {
        setIsLoggedIn(true);
        setUser(userData);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching login status:", err);
      setIsLoggedIn(false);
      setUser(null);
    }
  }

  function getDisplayName() {
    if (!user) return "User";
    const name = user.name || user.username || "User";
    return name.split(" ")[0];
  }

  function getInitials() {
    if (!user) return "U";
    const name = user.name || user.username || "U";
    return name
      .split(" ")
      .map(s => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  async function handleLogout(e) {
    e.preventDefault();
    
if (!window.confirm("Are you sure you want to logout?")) return;

    try {
      const response = await fetch(`${backendLink}/logout`, { method: "POST" });
      const data = await response.json();
      console.log("Logout successful:", data);
      alert("Logged out successfully!");
      setIsLoggedIn(false);
      setUser(null);
      setDropdownOpen(false);
      loadNavbar();
    } catch (err) {
      console.error("Logout error:", err);
      setIsLoggedIn(false);
      setUser(null);
    }
  }

  function handleNavLinkClick() {
    if (window.innerWidth <= 968) {
      setMobileMenuOpen(false);
    }
  }

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        header {
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        nav {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: #333;
        }

        .logo_pic {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bold;
          font-size: 24px;
        }

        .logo_pic::before {
          content: 'H';
        }

        .logo span {
          font-size: 24px;
          font-weight: 700;
          color: #333;
        }

        .nav-links {
          display: flex;
          list-style: none;
          align-items: center;
          gap: 40px;
          transition: all 0.3s ease;
        }

        .nav-links a {
          text-decoration: none;
          color: #555;
          font-weight: 500;
          font-size: 16px;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: #667eea;
        }

        .here a {
          position: relative;
        }

        .auth-link {
          background: #667eea;
          color: #fff !important;
          padding: 10px 24px;
          border-radius: 8px;
          transition: background 0.3s;
        }

        .auth-link:hover {
          background: #5568d3;
          color: #fff !important;
        }

        .user-dropdown {
          position: relative;
        }

        .user-profile-nav {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 8px;
          transition: background 0.3s;
        }

        .user-profile-nav:hover {
          background: #f5f5f5;
        }

        .user-avatar-small {
          width: 36px;
          height: 36px;
          background: #667eea;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
          font-size: 16px;
        }

        .user-profile-nav span {
          font-weight: 500;
          color: #333;
        }

        .fa-chevron-down {
          font-size: 12px;
          color: #666;
          transition: transform 0.3s;
        }

        .dropdown-open .fa-chevron-down {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          width: 220px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border: 1px solid #e5e5e5;
          padding: 8px 0;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
        }

        .dropdown-menu.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          color: #555;
          text-decoration: none;
          transition: background 0.2s;
          gap: 12px;
          cursor: pointer;
        }

        .dropdown-item:hover {
          background: #f8f9ff;
        }

        .dropdown-item i {
          width: 20px;
          color: #667eea;
          font-size: 18px;
        }

        .dropdown-divider {
          height: 1px;
          background: #e5e5e5;
          margin: 8px 0;
        }

        .dropdown-item.logout {
          color: #dc3545;
        }

        .dropdown-item.logout:hover {
          background: #fff5f5;
        }

        .dropdown-item.logout i {
          color: #dc3545;
        }

        .mobile-menu {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          font-size: 24px;
          color: #333;
        }

        @media (max-width: 968px) {
          .nav-links {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: #fff;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 20px 0;
            align-items: flex-start;
            padding-left: 20px;
            gap: 0;
          }

          .nav-links.active {
            left: 0;
          }

          .nav-links li {
            width: 100%;
            padding: 10px 0;
          }

          .mobile-menu {
            display: block;
          }

          .user-dropdown .dropdown-menu {
            position: static;
            box-shadow: none;
            border: none;
            padding: 0;
            margin-top: 10px;
            width: 100%;
          }

          .user-dropdown.active .dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }

          .user-dropdown .user-profile-nav {
            justify-content: flex-start;
          }
        }

        .cart-link {
          /* Cart link styles */
        }
      `}</style>

      <header>
        <nav>
          <a href="#" className="logo">
            <div className="logo_pic"></div>
            <span>HMS</span>
          </a>

          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <li className="here">
              <a href="../index.html" onClick={handleNavLinkClick}>Home</a>
            </li>
            <li className="here">
              <a href="./about.html" onClick={handleNavLinkClick}>About</a>
            </li>
            <li className="here">
              <a href="./contactpage.html" onClick={handleNavLinkClick}>Contact</a>
            </li>

            {!isLoggedIn ? (
              <li className="here">
                <a href="./HTML/user_sel.html" className="auth-link" onClick={handleNavLinkClick}>
                  Login
                </a>
              </li>
            ) : (
              <li 
                className={`user-dropdown ${dropdownOpen ? 'active' : ''}`}
                ref={dropdownRef}
              >
                <div 
                  className={`user-profile-nav ${dropdownOpen ? 'dropdown-open' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                >
                  <div className="user-avatar-small">{getInitials()}</div>
                  <span>{getDisplayName()}</span>
                  <i className="fas fa-chevron-down"></i>
                </div>

                <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                  <a href="./user_portal.html" className="dropdown-item" onClick={handleNavLinkClick}>
                    <i className="fas fa-user-circle"></i> My Portal
                  </a>
                  <a href="./user_portal.html?tab=appointments" className="dropdown-item" onClick={handleNavLinkClick}>
                    <i className="fas fa-calendar-check"></i> Appointments
                  </a>
                  <a href="./user_portal.html?tab=prescriptions" className="dropdown-item" onClick={handleNavLinkClick}>
                    <i className="fas fa-prescription"></i> Prescriptions
                  </a>
                  <a href="./HTML/cart.html" className="dropdown-item cart-link" onClick={handleNavLinkClick}>
                    <i className="fas fa-shopping-cart"></i> Cart
                  </a>
                  <a href="./user_portal.html?tab=profile" className="dropdown-item" onClick={handleNavLinkClick}>
                    <i className="fas fa-cog"></i> Settings
                  </a>
                  <div className="dropdown-divider"></div>
                  <a 
                    href="#" 
                    className="dropdown-item logout" 
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </a>
                </div>
              </li>
            )}
          </ul>

          <button 
            className="mobile-menu"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </nav>
      </header>
    </>
  );
}