import React from 'react';

export default function SkinRash() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      {/* Header Section */}
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

      {/* Main Content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '50px 20px'
      }}>
        {/* What is Skin Rash Section */}
        <div style={{
          marginBottom: '50px'
        }}>
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
            While most rashes are harmless and resolve on their own, some may indicate a more serious condition requiring medical attention. Understanding the cause and type of rash is essential for proper treatment.
          </p>
        </div>

        {/* Common Types Section */}
        <div style={{
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '26px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            Common Types of Skin Rashes
          </h2>
          <ul style={{
            fontSize: '16px',
            lineHeight: '2',
            color: '#4b5563',
            paddingLeft: '20px',
            margin: 0
          }}>
            <li><strong>Contact Dermatitis:</strong> Caused by direct contact with irritants or allergens</li>
            <li><strong>Eczema (Atopic Dermatitis):</strong> Chronic inflammatory skin condition causing dry, itchy patches</li>
            <li><strong>Hives (Urticaria):</strong> Raised, itchy welts that appear suddenly</li>
            <li><strong>Heat Rash:</strong> Small red bumps caused by blocked sweat ducts</li>
            <li><strong>Psoriasis:</strong> Autoimmune condition causing scaly, red patches</li>
            <li><strong>Fungal Infections:</strong> Including ringworm, athlete's foot, and yeast infections</li>
            <li><strong>Viral Rashes:</strong> Associated with illnesses like chickenpox, measles, or shingles</li>
            <li><strong>Drug Reactions:</strong> Allergic reactions to medications</li>
          </ul>
        </div>

        {/* Symptoms Section */}
        <div style={{
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '26px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            Common Symptoms
          </h2>
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
            <li>Oozing or crusting (in severe cases)</li>
          </ul>
        </div>

        {/* Causes Section */}
        <div style={{
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '26px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            Why Do Skin Rashes Occur?
          </h2>

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
            <li><strong>Allergens:</strong> Pollen, pet dander, certain foods, latex, or metals (like nickel)</li>
            <li><strong>Irritants:</strong> Soaps, detergents, cosmetics, fragrances, or chemicals</li>
            <li><strong>Infections:</strong> Bacterial, viral, or fungal infections</li>
            <li><strong>Medications:</strong> Antibiotics, NSAIDs, or other prescription drugs</li>
            <li><strong>Heat and Humidity:</strong> Excessive sweating or hot weather</li>
            <li><strong>Stress:</strong> Can trigger or worsen certain skin conditions</li>
            <li><strong>Immune System:</strong> Autoimmune conditions or weakened immunity</li>
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
            <li>Certain occupations (healthcare, cleaning, food service)</li>
          </ul>
        </div>

        {/* Prevention Section */}
        <div style={{
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '26px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            Prevention Tips
          </h2>
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
            <li>Wear protective clothing when using chemicals</li>
            <li>Take lukewarm (not hot) showers and baths</li>
            <li>Pat skin dry gently instead of rubbing</li>
            <li>Wear loose, breathable clothing, especially in hot weather</li>
            <li>Avoid scratching affected areas</li>
            <li>Manage stress through relaxation techniques</li>
            <li>Stay hydrated and maintain a healthy diet</li>
            <li>Use sunscreen to protect skin from UV damage</li>
          </ul>
        </div>

        {/* Treatment Section */}
        <div style={{
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '26px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            Treatment & Care
          </h2>

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
            <li>Apply coconut oil or petroleum jelly to moisturize dry skin</li>
            <li>Avoid tight clothing that may irritate the rash</li>
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
            marginBottom: '24px'
          }}>
            <li><strong>Hydrocortisone cream:</strong> Reduces inflammation and itching (1% strength)</li>
            <li><strong>Antihistamines:</strong> Help relieve itching from allergic reactions</li>
            <li><strong>Calamine lotion:</strong> Soothes itchy, irritated skin</li>
            <li><strong>Antifungal creams:</strong> For fungal infections like ringworm</li>
            <li><strong>Moisturizers:</strong> Keep skin hydrated and prevent dryness</li>
          </ul>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px'
          }}>
            Medical Treatments:
          </h3>
          <ul style={{
            fontSize: '16px',
            lineHeight: '1.9',
            color: '#4b5563',
            paddingLeft: '20px',
            marginBottom: '24px'
          }}>
            <li><strong>Prescription corticosteroids:</strong> Stronger creams for severe inflammation</li>
            <li><strong>Antibiotics:</strong> If bacterial infection is present</li>
            <li><strong>Immunosuppressants:</strong> For autoimmune-related rashes</li>
            <li><strong>Light therapy:</strong> For chronic conditions like psoriasis</li>
            <li><strong>Allergy testing:</strong> To identify specific triggers</li>
          </ul>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px'
          }}>
            Important Precautions:
          </h3>
          <ul style={{
            fontSize: '16px',
            lineHeight: '1.9',
            color: '#4b5563',
            paddingLeft: '20px',
            margin: 0
          }}>
            <li>Don't scratch the rash as it can cause infection</li>
            <li>Avoid using harsh soaps or hot water on affected areas</li>
            <li>Don't apply multiple products at once without medical advice</li>
            <li>Keep fingernails short and clean to prevent skin damage</li>
            <li>Wash hands frequently to prevent spreading infection</li>
            <li>Don't share personal items like towels or clothing</li>
          </ul>
        </div>

        {/* When to See Doctor */}
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
            <li>Rash that spreads rapidly or becomes worse</li>
            <li>Severe itching that interferes with sleep or daily activities</li>
            <li>Blisters or open sores</li>
            <li>Rash that doesn't improve after a week of home treatment</li>
            <li>Rash after starting a new medication</li>
            <li>Difficulty breathing or swallowing (seek emergency care)</li>
            <li>Rash with joint pain or swelling</li>
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
            Most minor rashes improve within <strong>1-2 weeks</strong> with proper care. Contact dermatitis typically resolves in <strong>2-4 weeks</strong>, while chronic conditions like eczema may require ongoing management. The key to faster recovery is identifying and avoiding triggers while following your treatment plan consistently.
          </p>
        </div>
      </div>
    </div>
  );
}