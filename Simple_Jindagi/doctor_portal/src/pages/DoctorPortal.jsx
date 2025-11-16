import React, { useState, useEffect } from 'react';

const BACKEND = "https://hospitality-management-system-xdyy.onrender.com";

// DoctorPortal Component
function DoctorPortal() {
  const [doctorData, setDoctorData] = useState({
    name: 'Dr. Name',
    id: 'Loading...',
    appointments: 0,
    patients: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  async function checkLoginStatus() {
    try {
      const res = await fetch(BACKEND + "/doctor/current");
      if (!res.ok) {
        console.error("Server error:", res.status, res.statusText);
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setDoctorData({
          name: data.user.name || 'Dr. Name',
          id: data.user.id || 'DOC-2024-1234',
          appointments: data.user.appointments || 0,
          patients: data.user.patients || 0,
          pending: data.user.pending || 0
        });
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching login status:", err);
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      const res = await fetch(BACKEND + "/doctor/logout", { method: "POST" });
      const data = await res.json();

      if (!res.ok || !data.success) {
        alert("Logout failed");
        return;
      }
      alert("Logged out successfully");
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Unable to logout. Try again later.");
    }
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    },
    sidebar: {
      width: '80px',
      backgroundColor: 'rgb(15, 23, 42)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px 20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
    },
    logo: {
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '20px',
      marginBottom: '48px'
    },
    navItem: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: 'none',
      fontSize: '20px'
    },
    navItemActive: {
      backgroundColor: '#3b82f6',
      color: 'white',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
    },
    navItemInactive: {
      backgroundColor: 'transparent',
      color: '#9ca3af'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    topbar: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: '24px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    topbarLeft: {
      flex: 1
    },
    pageTitle: {
      fontSize: '35px',
      fontWeight: '900',
      color: '#2d3748',
      margin: 0
    },
    subtitle: {
      color: '#666',
      marginTop: '4px',
      fontSize: '14px'
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    userInfo: {
      textAlign: 'right'
    },
    userName: {
      fontWeight: '600',
      color: '#2d3748',
      margin: 0,
      fontSize: '16px'
    },
    userId: {
      fontSize: '13px',
      color: '#666',
      margin: 0
    },
    userAvatar: {
      width: '48px',
      height: '48px',
      background: 'linear-gradient(135deg, #3b82f6, #764ba2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
    },
    contentArea: {
      flex: 1,
      padding: '32px',
      overflowY: 'auto'
    },
    loader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    },
    spinner: {
      width: '48px',
      height: '48px',
      border: '4px solid #e2e8f0',
      borderTop: '4px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    statCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      transition: 'all 0.3s ease',
      cursor: 'default'
    },
    statCardTop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      borderRadius: '16px 16px 0 0'
    },
    statIcon: {
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      color: 'white',
      marginBottom: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
    },
    statLabel: {
      color: '#666',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '8px'
    },
    statValue: {
      fontSize: '36px',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '4px'
    },
    statSubtext: {
      color: '#999',
      fontSize: '13px'
    },
    profileSection: {
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '8px'
    },
    sectionSubtitle: {
      color: '#666',
      marginBottom: '24px'
    },
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 32px',
      background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
      color: 'white',
      border: 'none',
      borderRadius: '16px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          }
          .logout-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 32px rgba(59, 130, 246, 0.4);
          }
          .nav-item:hover {
            background-color: rgba(59, 130, 246, 0.1);
            color: #60a5fa;
          }
        `}
      </style>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>📊</div>
        
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              ...styles.navItem,
              ...(activeTab === 'dashboard' ? styles.navItemActive : styles.navItemInactive)
            }}
            className="nav-item"
            title="Dashboard"
          >
            📊
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Topbar */}
        <div style={styles.topbar}>
          <div style={styles.topbarLeft}>
            <h1 style={styles.pageTitle}>Dashboard</h1>
            <p style={styles.subtitle}>Welcome back, manage your patients and schedule</p>
          </div>
          
          <div style={styles.userProfile}>
            <div style={styles.userInfo}>
              <h3 style={styles.userName}>{doctorData.name}</h3>
              <p style={styles.userId}>Doctor ID: {doctorData.id}</p>
            </div>
            <div style={styles.userAvatar}>
              {getInitials(doctorData.name)}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={styles.contentArea}>
          {loading ? (
            <div style={styles.loader}>
              <div style={styles.spinner}></div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div style={styles.statsGrid}>
                <div style={styles.statCard} className="stat-card">
                  <div style={{...styles.statCardTop, background: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)'}}></div>
                  <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'}}>
                    📅
                  </div>
                  <div style={styles.statLabel}>Today's</div>
                  <div style={styles.statValue}>{doctorData.appointments}</div>
                  <div style={styles.statSubtext}>Appointments</div>
                </div>

                <div style={styles.statCard} className="stat-card">
                  <div style={{...styles.statCardTop, background: 'linear-gradient(90deg, #0d9488 0%, #115e59 100%)'}}></div>
                  <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #0d9488 0%, #115e59 100%)'}}>
                    👥
                  </div>
                  <div style={styles.statLabel}>Patients</div>
                  <div style={styles.statValue}>{doctorData.patients}</div>
                  <div style={styles.statSubtext}>Under Care</div>
                </div>

                <div style={styles.statCard} className="stat-card">
                  <div style={{...styles.statCardTop, background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)'}}></div>
                  <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>
                    📄
                  </div>
                  <div style={styles.statLabel}>Pending</div>
                  <div style={styles.statValue}>{doctorData.pending}</div>
                  <div style={styles.statSubtext}>Reports to Review</div>
                </div>
              </div>

              {/* Profile Settings Section */}
              <div style={styles.profileSection}>
                <h2 style={styles.sectionTitle}>Profile Settings</h2>
                <p style={styles.sectionSubtitle}>Manage your personal information</p>
                
                <button
                  onClick={handleLogout}
                  style={styles.logoutButton}
                  className="logout-btn"
                >
                  <span style={{fontSize: '18px'}}>🚪</span>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// App Component
export default function App() {
  return (
    <div>
      <DoctorPortal />
    </div>
  );
}