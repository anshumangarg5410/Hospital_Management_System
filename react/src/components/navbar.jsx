import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [userAvatar, setUserAvatar] = useState('U');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in (you can replace this with actual auth logic)
    const user = null; // Replace with: JSON.parse(localStorage.getItem('user'))
    if (user) {
      setIsLoggedIn(true);
      setUserName(user.name || 'User');
      setUserAvatar(user.name?.charAt(0).toUpperCase() || 'U');
    }
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    setIsLoggedIn(false);
    setUserName('User');
    setUserAvatar('U');
    setDropdownOpen(false);
  };

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

        .logo-pic {
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

        .chevron {
          width: 16px;
          height: 16px;
          transition: transform 0.3s;
        }

        .chevron.open {
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
          animation: dropdownSlide 0.3s ease;
        }

        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          color: #555;
          text-decoration: none;
          transition: background 0.2s;
          gap: 12px;
        }

        .dropdown-item:hover {
          background: #f8f9ff;
        }

        .dropdown-item svg {
          width: 20px;
          height: 20px;
          color: #667eea;
        }

        .dropdown-divider {
          height: 1px;
          background: #e5e5e5;
          margin: 8px 0;
        }

        .logout-btn {
          color: #dc3545 !important;
        }

        .logout-btn:hover {
          background: #fff5f5 !important;
        }

        .logout-btn svg {
          color: #dc3545 !important;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .mobile-menu-btn svg {
          width: 28px;
          height: 28px;
          color: #333;
        }

        .mobile-nav {
          display: none;
          padding: 20px;
          border-top: 1px solid #e5e5e5;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }

        .mobile-nav.open {
          display: block;
        }

        .mobile-nav a,
        .mobile-nav button {
          display: block;
          padding: 12px 0;
          color: #555;
          text-decoration: none;
          font-weight: 500;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          font-size: 16px;
        }

        .mobile-nav a:hover,
        .mobile-nav button:hover {
          color: #667eea;
        }

        .mobile-user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 0;
          border-bottom: 1px solid #e5e5e5;
          margin-bottom: 10px;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }
        }
      `}</style>

      <header>
        <nav>
          <a href="#" className="logo">
            <div className="logo-pic">H</div>
            <span>HMS</span>
          </a>

          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="./HTML/about.html">About</a></li>
            <li><a href="./HTML/contactpage.html">Contact</a></li>
            
            {!isLoggedIn ? (
              <li>
                <a href="./HTML/user_sel.html" className="auth-link">Login</a>
              </li>
            ) : (
              <li className="user-dropdown">
                <div 
                  className="user-profile-nav"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="user-avatar-small">{userAvatar}</div>
                  <span>{userName}</span>
                  <svg 
                    className={`chevron ${dropdownOpen ? 'open' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <a href="./HTML/user_portal.html" className="dropdown-item">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Portal
                    </a>
                    <a href="./HTML/user_portal.html?tab=appointments" className="dropdown-item">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Appointments
                    </a>
                    <a href="./HTML/user_portal.html?tab=prescriptions" className="dropdown-item">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Prescriptions
                    </a>
                    <a href="./HTML/user_portal.html?tab=profile" className="dropdown-item">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </a>
                    <div className="dropdown-divider"></div>
                    <a href="#" onClick={handleLogout} className="dropdown-item logout-btn">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </a>
                  </div>
                )}
              </li>
            )}
          </ul>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          {isLoggedIn && (
            <div className="mobile-user-info">
              <div className="user-avatar-small">{userAvatar}</div>
              <span style={{ fontWeight: 500, color: '#333' }}>{userName}</span>
            </div>
          )}
          
          <a href="#home">Home</a>
          <a href="./HTML/about.html">About</a>
          <a href="./HTML/contactpage.html">Contact</a>
          
          {!isLoggedIn ? (
            <a href="./HTML/user_sel.html" style={{ color: '#667eea', fontWeight: 600 }}>Login</a>
          ) : (
            <>
              <a href="./HTML/user_portal.html">My Portal</a>
              <a href="./HTML/user_portal.html?tab=appointments">Appointments</a>
              <a href="./HTML/user_portal.html?tab=prescriptions">Prescriptions</a>
              <a href="./HTML/user_portal.html?tab=profile">Settings</a>
              <button onClick={handleLogout} style={{ color: '#dc3545', fontWeight: 600 }}>Logout</button>
            </>
          )}
        </div>
      </header>
    </>
  );
}