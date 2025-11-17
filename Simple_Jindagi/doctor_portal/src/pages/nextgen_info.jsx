import React from 'react';

export default function Nextgen_info() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px'
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#cffafe',
          color: 'black',
          padding: '10px 20px',
          borderRadius: '9999px',
          marginBottom: '48px'
        }}>
          <span style={{ fontSize: '20px' }}>⭐</span>
          <span style={{ fontWeight: '500' }}>Next-Gen Healthcare Software</span>
        </div>


        <h1 style={{
          fontSize: '72px',
          fontWeight: '700',
          color: 'black',
          marginBottom: '32px',
          lineHeight: '1.1'
        }}>
          Smarter Hospital<br />
          Management for<br />
          Better Care
        </h1>


        <p style={{
          fontSize: '20px',
          color: '#374151',
          marginBottom: '48px',
          maxWidth: '1000px',
          lineHeight: '1.6'
        }}>
          Manage hospitals efficiently — from patient registration to advanced
          reporting — with seamless digital solutions that transform healthcare
          delivery.
        </p>


        <div style={{
          position: 'relative',
          maxWidth: '672px',
          marginBottom: '64px'
        }}>
          <span style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '24px'
          }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Search for services, doctors, or treatments..."
            style={{
              width: '100%',
              paddingLeft: '64px',
              paddingRight: '24px',
              paddingTop: '20px',
              paddingBottom: '20px',
              borderRadius: '16px',
              background: 'white',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
              fontSize: '18px',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.outline = '2px solid #22d3ee';
              e.target.style.borderColor = 'transparent';
            }}
            onBlur={(e) => {
              e.target.style.outline = 'none';
              e.target.style.borderColor = '#e5e7eb';
            }}
          />
        </div>


        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginTop: '80px'
        }}>

          <div style={{
            background: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: '#cffafe',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '24px' }}>📋</span>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '12px',
              color: '#111827'
            }}>
              Digital Records
            </h3>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              margin: 0
            }}>
              Streamline patient information with secure, accessible electronic health records that improve care coordination.
            </p>
          </div>


          <div style={{
            background: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: '#cffafe',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '24px' }}>📊</span>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '12px',
              color: '#111827'
            }}>
              Advanced Analytics
            </h3>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              margin: 0
            }}>
              Make data-driven decisions with comprehensive reporting tools and real-time insights into hospital operations.
            </p>
          </div>


          <div style={{
            background: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: '#cffafe',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '24px' }}>⏰</span>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '12px',
              color: '#111827'
            }}>
              Efficient Scheduling
            </h3>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              margin: 0
            }}>
              Optimize staff schedules, appointments, and resource allocation to maximize efficiency and patient satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}