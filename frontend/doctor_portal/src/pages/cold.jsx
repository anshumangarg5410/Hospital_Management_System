import React, { useState, useEffect } from 'react';

export default function Cold() {
  const [viewCount, setViewCount] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    symptoms: true,
    causes: true,
    prevention: true,
    treatment: true
  });


  // Simulate view count on mount
  useEffect(() => {
    const randomViews = Math.floor(Math.random() * 2000) + 1500;
    setViewCount(randomViews);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>


      {/* Sticky Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        transition: 'all 0.3s ease',
        zIndex: 999,
        padding: '16px 20px'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827'
          }}>
            🤧 Common Cold Guide
          </div>
          <div style={{
            display: 'inline-block',
            background: '#dbeafe',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            color: '#1e40af',
            fontWeight: '500'
          }}>
            👁️ {viewCount.toLocaleString()} views
          </div>
        </div>
      </nav>

      {/* Header */}
      <div style={{
        background: '#2563eb',
        padding: '60px 20px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '60px',
            marginBottom: '20px'
          }}>
            🤧
          </div>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '600',
            color: 'white',
            margin: '0 0 12px 0'
          }}>
            Common Cold
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: 0
          }}>
            Understanding, preventing, and managing the common cold
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '50px 20px'
      }}>
        {/* What is Common Cold */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{
            fontSize: '26px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            What is a Common Cold?
          </h2>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#4b5563',
            marginBottom: '14px'
          }}>
            The common cold is a viral infection of the upper respiratory tract, primarily affecting the nose and throat. It's one of the most frequent illnesses, with adults experiencing 2-3 colds per year on average.
          </p>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#4b5563',
            margin: 0
          }}>
            More than 200 different viruses can cause colds, but rhinoviruses are the most common culprits, accounting for 30-50% of all colds.
          </p>
        </div>

        {/* Common Symptoms - Collapsible */}
        <div style={{ marginBottom: '50px' }}>
          <div 
            onClick={() => toggleSection('symptoms')}
            style={{
              fontSize: '26px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '20px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Common Symptoms</span>
            <span style={{ fontSize: '20px' }}>{expandedSections.symptoms ? '−' : '+'}</span>
          </div>
          {expandedSections.symptoms && (
            <ul style={{
              fontSize: '16px',
              lineHeight: '2',
              color: '#4b5563',
              paddingLeft: '20px',
              margin: 0
            }}>
              <li>Runny or stuffy nose</li>
              <li>Sneezing</li>
              <li>Sore throat</li>
              <li>Cough</li>
              <li>Mild headache</li>
              <li>Body aches</li>
              <li>Fatigue</li>
              <li>Low-grade fever</li>
              <li>Watery eyes</li>
            </ul>
          )}
        </div>

        {/* Why Does Cold Occur - Collapsible */}
        <div style={{ marginBottom: '50px' }}>
          <div 
            onClick={() => toggleSection('causes')}
            style={{
              fontSize: '26px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '20px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Why Does Cold Occur?</span>
            <span style={{ fontSize: '20px' }}>{expandedSections.causes ? '−' : '+'}</span>
          </div>
          {expandedSections.causes && (
            <>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '12px',
                marginTop: '20px'
              }}>
                Transmission Methods:
              </h3>
              <ul style={{
                fontSize: '16px',
                lineHeight: '1.9',
                color: '#4b5563',
                paddingLeft: '20px',
                marginBottom: '24px'
              }}>
                <li style={{marginBottom: '8px'}}>
                  <strong>Airborne droplets:</strong> When an infected person coughs or sneezes
                </li>
                <li style={{marginBottom: '8px'}}>
                  <strong>Direct contact:</strong> Touching contaminated surfaces then touching your face
                </li>
                <li>
                  <strong>Person-to-person:</strong> Close contact like handshakes with infected individuals
                </li>
              </ul>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '12px'
              }}>
                Risk Factors:
              </h3>
              <ul style={{
                fontSize: '16px',
                lineHeight: '1.9',
                color: '#4b5563',
                paddingLeft: '20px',
                margin: 0
              }}>
                <li>Weakened immune system</li>
                <li>Age (children and elderly are more susceptible)</li>
                <li>Seasonal changes (more common in fall and winter)</li>
                <li>Crowded environments</li>
                <li>Stress and lack of sleep</li>
              </ul>
            </>
          )}
        </div>

        {/* Prevention Tips - Collapsible */}
        <div style={{ marginBottom: '50px' }}>
          <div 
            onClick={() => toggleSection('prevention')}
            style={{
              fontSize: '26px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '20px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Prevention Tips</span>
            <span style={{ fontSize: '20px' }}>{expandedSections.prevention ? '−' : '+'}</span>
          </div>
          {expandedSections.prevention && (
            <ul style={{
              fontSize: '16px',
              lineHeight: '1.9',
              color: '#4b5563',
              paddingLeft: '20px',
              margin: 0
            }}>
              <li>Wash hands frequently with soap and water for at least 20 seconds</li>
              <li>Avoid touching your face, especially eyes, nose, and mouth</li>
              <li>Maintain distance from people who are sick</li>
              <li>Get adequate sleep (7-9 hours) to boost immunity</li>
              <li>Eat a balanced diet rich in vitamins and minerals</li>
              <li>Stay physically active and exercise regularly</li>
              <li>Manage stress levels</li>
            </ul>
          )}
        </div>

        {/* Treatment & Care - Collapsible */}
        <div style={{ marginBottom: '50px' }}>
          <div 
            onClick={() => toggleSection('treatment')}
            style={{
              fontSize: '26px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '20px',
              paddingBottom: '10px',
              borderBottom: '2px solid #e5e7eb',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Treatment & Care</span>
            <span style={{ fontSize: '20px' }}>{expandedSections.treatment ? '−' : '+'}</span>
          </div>
          {expandedSections.treatment && (
            <>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '12px',
                marginTop: '20px'
              }}>
                Home Remedies:
              </h3>
              <ul style={{
                fontSize: '16px',
                lineHeight: '1.9',
                color: '#4b5563',
                paddingLeft: '20px',
                marginBottom: '24px'
              }}>
                <li>Stay hydrated - drink plenty of water, warm tea, and soup</li>
                <li>Get adequate rest to help your body fight the infection</li>
                <li>Use a humidifier to ease congestion</li>
                <li>Gargle with salt water for sore throat relief</li>
                <li>Drink warm liquids like herbal tea with honey and lemon</li>
              </ul>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '12px'
              }}>
                Over-the-Counter Medications:
              </h3>
              <ul style={{
                fontSize: '16px',
                lineHeight: '1.9',
                color: '#4b5563',
                paddingLeft: '20px',
                margin: 0
              }}>
                <li>Pain relievers (acetaminophen, ibuprofen) for aches and fever</li>
                <li>Decongestants for nasal congestion</li>
                <li>Cough suppressants or expectorants</li>
                <li>Throat lozenges for sore throat</li>
              </ul>
            </>
          )}
        </div>

        {/* When to See a Doctor */}
        <div style={{
          background: '#fef2f2',
          padding: '30px',
          borderRadius: '8px',
          border: '1px solid #fecaca',
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '26px',
            fontWeight: '600',
            color: '#991b1b',
            marginBottom: '16px'
          }}>
            ⚠️ When to See a Doctor
          </h2>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#7f1d1d',
            marginBottom: '12px'
          }}>
            Consult a healthcare provider if you experience:
          </p>
          <ul style={{
            fontSize: '16px',
            lineHeight: '1.9',
            color: '#7f1d1d',
            paddingLeft: '20px',
            margin: 0
          }}>
            <li>Fever above 101.3°F (38.5°C) lasting more than 3 days</li>
            <li>Symptoms lasting more than 10 days without improvement</li>
            <li>Difficulty breathing or wheezing</li>
            <li>Persistent chest pain or pressure</li>
          </ul>
        </div>

        {/* Recovery Timeline */}
        <div style={{
          background: '#f9fafb',
          padding: '30px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '26px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '12px'
          }}>
            Recovery Timeline
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#4b5563',
            lineHeight: '1.7',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Most cold symptoms improve within <strong>7-10 days</strong>. However, some symptoms like cough may persist for up to <strong>2-3 weeks</strong>. Remember, rest and proper care are essential for a full recovery.
          </p>
        </div>
      </div>
    </div>
  );
}