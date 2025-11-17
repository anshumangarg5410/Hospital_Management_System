import React, { useState, useEffect } from 'react';

export default function SkinRash() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    types: true,
    symptoms: true,
    causes: true,
    prevention: true,
    treatment: true
  });

  // Track scroll position
  useEffect(() => {

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate view count on mount
  useEffect(() => {
    const randomViews = Math.floor(Math.random() * 2500) + 1800;
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
        background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
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
            🩹 Skin Rash Guide
          </div>
          <div style={{
            display: 'inline-block',
            background: '#fee2e2',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            color: '#991b1b',
            fontWeight: '500'
          }}>
            👁️ {viewCount.toLocaleString()} views
          </div>
        </div>
      </nav>

      {/* Header */}
      <div style={{
        background: '#dc2626',
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
            🩹
          </div>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '600',
            color: 'white',
            margin: '0 0 12px 0'
          }}>
            Skin Rash
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: 0
          }}>
            Understanding, preventing, and treating common skin rashes
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '50px 20px'
      }}>
        {/* What is Skin Rash */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{
            fontSize: '26px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            What is a Skin Rash?
          </h2>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#4b5563',
            marginBottom: '14px'
          }}>
            A skin rash is a noticeable change in the texture or color of your skin. It may become scaly, bumpy, itchy, or otherwise irritated. Skin rashes can be caused by various factors including allergies, infections, medications, or underlying health conditions.
          </p>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#4b5563',
            margin: 0
          }}>
            While most rashes are harmless and resolve on their own, some may indicate a more serious condition requiring medical attention.
          </p>
        </div>

        {/* Common Types - Collapsible */}
        <div style={{ marginBottom: '50px' }}>
          <div 
            onClick={() => toggleSection('types')}
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
            <span>Common Types of Skin Rashes</span>
            <span style={{ fontSize: '20px' }}>{expandedSections.types ? '−' : '+'}</span>
          </div>
          {expandedSections.types && (
            <ul style={{
              fontSize: '16px',
              lineHeight: '2',
              color: '#4b5563',
              paddingLeft: '20px',
              margin: 0
            }}>
              <li><strong>Contact Dermatitis:</strong> Caused by direct contact with irritants or allergens</li>
              <li><strong>Eczema:</strong> Chronic inflammatory skin condition causing dry, itchy patches</li>
              <li><strong>Hives:</strong> Raised, itchy welts that appear suddenly</li>
              <li><strong>Heat Rash:</strong> Small red bumps caused by blocked sweat ducts</li>
              <li><strong>Psoriasis:</strong> Autoimmune condition causing scaly, red patches</li>
              <li><strong>Fungal Infections:</strong> Including ringworm and athlete's foot</li>
            </ul>
          )}
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
              <li>Redness or discoloration of the skin</li>
              <li>Itching or burning sensation</li>
              <li>Dry, cracked, or scaly skin</li>
              <li>Bumps, blisters, or welts</li>
              <li>Swelling or inflammation</li>
              <li>Warmth in the affected area</li>
              <li>Pain or tenderness</li>
            </ul>
          )}
        </div>

        {/* Why Do Skin Rashes Occur - Collapsible */}
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
            <span>Why Do Skin Rashes Occur?</span>
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
                Common Triggers:
              </h3>
              <ul style={{
                fontSize: '16px',
                lineHeight: '1.9',
                color: '#4b5563',
                paddingLeft: '20px',
                marginBottom: '24px'
              }}>
                <li><strong>Allergens:</strong> Pollen, pet dander, certain foods, latex, or metals</li>
                <li><strong>Irritants:</strong> Soaps, detergents, cosmetics, fragrances, or chemicals</li>
                <li><strong>Infections:</strong> Bacterial, viral, or fungal infections</li>
                <li><strong>Medications:</strong> Antibiotics, NSAIDs, or other prescription drugs</li>
                <li><strong>Heat and Humidity:</strong> Excessive sweating or hot weather</li>
                <li><strong>Stress:</strong> Can trigger or worsen certain skin conditions</li>
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
                <li>Family history of allergies or eczema</li>
                <li>Sensitive or dry skin</li>
                <li>Frequent exposure to chemicals or irritants</li>
                <li>Compromised immune system</li>
                <li>Living in hot, humid climates</li>
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
              <li>Keep skin moisturized with gentle, fragrance-free lotions</li>
              <li>Avoid known allergens and irritants</li>
              <li>Use mild, hypoallergenic soaps and detergents</li>
              <li>Take lukewarm (not hot) showers and baths</li>
              <li>Wear loose, breathable clothing, especially in hot weather</li>
              <li>Avoid scratching affected areas</li>
              <li>Manage stress through relaxation techniques</li>
              <li>Use sunscreen to protect skin from UV damage</li>
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
                <li>Apply cool compresses to reduce itching and inflammation</li>
                <li>Take lukewarm oatmeal baths for soothing relief</li>
                <li>Use aloe vera gel for its anti-inflammatory properties</li>
                <li>Keep the affected area clean and dry</li>
              </ul>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '12px'
              }}>
                Over-the-Counter Treatments:
              </h3>
              <ul style={{
                fontSize: '16px',
                lineHeight: '1.9',
                color: '#4b5563',
                paddingLeft: '20px',
                margin: 0
              }}>
                <li><strong>Hydrocortisone cream:</strong> Reduces inflammation and itching</li>
                <li><strong>Antihistamines:</strong> Help relieve itching from allergic reactions</li>
                <li><strong>Calamine lotion:</strong> Soothes itchy, irritated skin</li>
                <li><strong>Antifungal creams:</strong> For fungal infections like ringworm</li>
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
            Seek medical attention if you experience:
          </p>
          <ul style={{
            fontSize: '16px',
            lineHeight: '1.9',
            color: '#7f1d1d',
            paddingLeft: '20px',
            margin: 0
          }}>
            <li>Rash covering large areas of your body</li>
            <li>Fever accompanying the rash</li>
            <li>Signs of infection (pus, warmth, red streaks, severe pain)</li>
            <li>Difficulty breathing or swallowing (seek emergency care)</li>
            <li>Rash after starting a new medication</li>
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
            Most minor rashes improve within <strong>1-2 weeks</strong> with proper care. Contact dermatitis typically resolves in <strong>2-4 weeks</strong>, while chronic conditions like eczema may require ongoing management.
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            background: '#dc2626',
            color: 'white',
            border: 'none',
            width: '50px',
            height: '50px',
            borderRadius: '25px',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
            zIndex: 998
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}