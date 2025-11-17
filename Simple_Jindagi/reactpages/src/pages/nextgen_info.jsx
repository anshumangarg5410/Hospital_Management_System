import React from 'react';

export default function Nextgen_info() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px'
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          marginBottom: '80px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            Hospital Management System
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            lineHeight: '1.6',
            margin: 0
          }}>
            Comprehensive digital solutions for efficient healthcare delivery,
            from patient registration to advanced reporting and analytics.
          </p>
        </div>

        {/* Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginTop: '80px'
        }}>
          <div style={{
            background: '#f8fafc',
            padding: '32px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: '#0ea5e9',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '28px' }}>📋</span>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#0f172a'
            }}>
              Digital Records
            </h3>
            <p style={{
              color: '#64748b',
              lineHeight: '1.6',
              fontSize: '15px',
              margin: 0
            }}>
              Secure electronic health records that improve care coordination and patient information management.
            </p>
          </div>

          <div style={{
            background: '#f8fafc',
            padding: '32px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: '#0ea5e9',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '28px' }}>📊</span>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#0f172a'
            }}>
              Advanced Analytics
            </h3>
            <p style={{
              color: '#64748b',
              lineHeight: '1.6',
              fontSize: '15px',
              margin: 0
            }}>
              Comprehensive reporting tools and real-time insights for data-driven hospital operations.
            </p>
          </div>

          <div style={{
            background: '#f8fafc',
            padding: '32px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: '#0ea5e9',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '28px' }}>⏰</span>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#0f172a'
            }}>
              Efficient Scheduling
            </h3>
            <p style={{
              color: '#64748b',
              lineHeight: '1.6',
              fontSize: '15px',
              margin: 0
            }}>
              Optimized staff schedules and resource allocation to maximize efficiency and patient satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}