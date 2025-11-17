import React, { useState } from 'react';

export default function Nextgen_info() {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px'
      }}>
        {!showTerms ? (
          <>
            {/* Hero Section */}
            <div style={{
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
              marginBottom: '60px',
              paddingTop: '40px'
            }}>
              <h1 style={{
                fontSize: '52px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '20px',
                lineHeight: '1.1'
              }}>
                Hospital Management System
              </h1>
              <p style={{
                fontSize: '19px',
                color: '#64748b',
                lineHeight: '1.6',
                marginBottom: '32px'
              }}>
                Comprehensive digital solutions for efficient healthcare delivery,
                from patient registration to advanced reporting and analytics.
              </p>
              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center'
              }}>
                <button style={{
                  background: '#0ea5e9',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Get Started
                </button>
                <button style={{
                  background: '#ffffff',
                  color: '#0f172a',
                  border: '2px solid #e2e8f0',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Request Demo
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              marginBottom: '60px',
              padding: '32px',
              background: '#f8fafc',
              borderRadius: '12px'
            }}>
              {[
                { number: '500+', label: 'Healthcare Facilities' },
                { number: '1M+', label: 'Patients Managed' },
                { number: '99.9%', label: 'Uptime' },
                { number: '24/7', label: 'Support' }
              ].map((stat, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#0ea5e9',
                    marginBottom: '6px'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#64748b',
                    fontWeight: '500'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Cards */}
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#0f172a',
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              Core Features
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
              marginBottom: '60px'
            }}>
              {[
                {
                  icon: '📋',
                  title: 'Digital Records',
                  description: 'Secure electronic health records with HIPAA compliance and easy access.'
                },
                {
                  icon: '📊',
                  title: 'Advanced Analytics',
                  description: 'Real-time insights and reporting for data-driven decisions.'
                },
                {
                  icon: '⏰',
                  title: 'Smart Scheduling',
                  description: 'Efficient appointment and staff scheduling system.'
                },
                {
                  icon: '💊',
                  title: 'Pharmacy Management',
                  description: 'Complete medication tracking and inventory control.'
                },
                {
                  icon: '💰',
                  title: 'Billing System',
                  description: 'Streamlined billing and insurance claim processing.'
                },
                {
                  icon: '🔒',
                  title: 'Security',
                  description: 'Enterprise-grade security with role-based access control.'
                }
              ].map((feature, idx) => (
                <div key={idx} style={{
                  background: '#f8fafc',
                  padding: '28px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    background: '#0ea5e9',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <span style={{ fontSize: '26px' }}>{feature.icon}</span>
                  </div>
                  <h3 style={{
                    fontSize: '19px',
                    fontWeight: '600',
                    marginBottom: '10px',
                    color: '#0f172a'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    color: '#64748b',
                    lineHeight: '1.6',
                    fontSize: '15px',
                    margin: 0
                  }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer with Terms Link */}
            <footer style={{
              borderTop: '1px solid #e2e8f0',
              paddingTop: '32px',
              textAlign: 'center',
              color: '#64748b',
              fontSize: '14px'
            }}>
              <p style={{ marginBottom: '16px' }}>
                © 2025 HealthCare Pro. All rights reserved.
              </p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <button
                  onClick={() => setShowTerms(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0ea5e9',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: '14px'
                  }}
                >
                  Terms & Conditions
                </button>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</a>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Contact</a>
              </div>
            </footer>
          </>
        ) : (
          // Terms and Conditions Page
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <button
              onClick={() => setShowTerms(false)}
              style={{
                background: '#f1f5f9',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                marginBottom: '24px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#0f172a'
              }}
            >
              ← Back to Home
            </button>

            <h1 style={{
              fontSize: '42px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '12px'
            }}>
              Terms and Conditions
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#64748b',
              marginBottom: '32px'
            }}>
              Last Updated: November 17, 2025
            </p>
            
            <div style={{
              fontSize: '15px',
              color: '#475569',
              lineHeight: '1.8'
            }}>
              <h2 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#0f172a',
                marginTop: '28px',
                marginBottom: '12px'
              }}>
                1. Acceptance of Terms
              </h2>
              <p style={{ marginBottom: '16px' }}>
                By accessing HealthCare Pro's Hospital Management System, you accept and agree to be bound by these terms. If you do not agree, please do not use this service.
              </p>

              <h2 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#0f172a',
                marginTop: '28px',
                marginBottom: '12px'
              }}>
                2. Use License
              </h2>
              <p style={{ marginBottom: '12px' }}>
                Permission is granted for personal, non-commercial use only. You may not:
              </p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>Modify or copy the software</li>
                <li style={{ marginBottom: '8px' }}>Use for commercial purposes without authorization</li>
                <li style={{ marginBottom: '8px' }}>Reverse engineer the software</li>
                <li style={{ marginBottom: '8px' }}>Remove copyright notices</li>
              </ul>

              <h2 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#0f172a',
                marginTop: '28px',
                marginBottom: '12px'
              }}>
                3. Data Privacy and Security
              </h2>
              <p style={{ marginBottom: '12px' }}>
                We implement industry-standard security measures including:
              </p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>256-bit encryption for data storage</li>
                <li style={{ marginBottom: '8px' }}>HIPAA compliance for patient data</li>
                <li style={{ marginBottom: '8px' }}>Multi-factor authentication</li>
                <li style={{ marginBottom: '8px' }}>Regular security audits</li>
              </ul>

              <h2 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#0f172a',
                marginTop: '28px',
                marginBottom: '12px'
              }}>
                4. Service Level Agreement
              </h2>
              <p style={{ marginBottom: '16px' }}>
                We guarantee 99.9% uptime. In case of service disruption, we provide immediate notification and deploy emergency response within 15 minutes.
              </p>

              <h2 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#0f172a',
                marginTop: '28px',
                marginBottom: '12px'
              }}>
                5. User Responsibilities
              </h2>
              <p style={{ marginBottom: '12px' }}>
                Users agree to:
              </p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>Maintain confidentiality of login credentials</li>
                <li style={{ marginBottom: '8px' }}>Use system for legitimate healthcare purposes only</li>
                <li style={{ marginBottom: '8px' }}>Report security incidents immediately</li>
                <li style={{ marginBottom: '8px' }}>Comply with all applicable laws</li>
              </ul>

              <h2 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#0f172a',
                marginTop: '28px',
                marginBottom: '12px'
              }}>
                6. Payment Terms
              </h2>
              <p style={{ marginBottom: '16px' }}>
                Subscription fees are billed monthly or annually. All fees are non-refundable. Payment is due within 30 days of invoice. Late payments incur a 1.5% monthly fee.
              </p>

              <h2 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#0f172a',
                marginTop: '28px',
                marginBottom: '12px'
              }}>
                7. Limitation of Liability
              </h2>
              <p style={{ marginBottom: '16px' }}>
                HealthCare Pro shall not be liable for any damages arising from use or inability to use the service. Our total liability shall not exceed the amount paid in the preceding 12 months.
              </p>

              <h2 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#0f172a',
                marginTop: '28px',
                marginBottom: '12px'
              }}>
                8. Termination
              </h2>
              <p style={{ marginBottom: '16px' }}>
                Either party may terminate with 90 days notice. Upon termination, clients have 60 days to export data. We reserve the right to immediately terminate for breach of terms.
              </p>

              <h2 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#0f172a',
                marginTop: '28px',
                marginBottom: '12px'
              }}>
                9. Contact Information
              </h2>
              <p style={{ marginBottom: '8px' }}>
                For questions about these terms:
              </p>
              <p style={{ marginBottom: '4px' }}>Email: legal@healthcarepro.com</p>
              <p style={{ marginBottom: '4px' }}>Phone: 1-800-HEALTHCARE</p>
              <p style={{ marginBottom: '24px' }}>Address: 123 Medical Plaza, Healthcare City, HC 12345</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}