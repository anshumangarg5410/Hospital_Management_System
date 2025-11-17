import React, { useState } from 'react';

export default function Help_center() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "To book an appointment, navigate to the 'Book Appointment' section on the homepage. Select your preferred doctor, choose an available time slot, fill in your details, and confirm your booking. You will receive a confirmation email with appointment details."
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time. Go to 'My Appointments' section, select the appointment, and choose either 'Cancel' or 'Reschedule' option."
    },
    {
      question: "How do I access my medical records?",
      answer: "Log in to your patient portal and navigate to 'Medical Records' section. Here you can view, download, and share your medical history, test results, prescriptions, and treatment plans."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI payments, net banking, and digital wallets. Payment can be made online during booking or at the hospital reception."
    },
    {
      question: "How do I contact my doctor?",
      answer: "You can contact your doctor through the 'Message Doctor' feature in your patient portal. For urgent matters, please call our emergency helpline or visit the hospital directly."
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>

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
          
          </div>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '600',
            color: 'white',
            margin: '0 0 12px 0'
          }}>
            Help Center
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: 0
          }}>
            Everything you need to know about using our healthcare platform
          </p>
        </div>
      </div>


      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '50px 20px'
      }}>

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
            Getting Started
          </h2>
          
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            Creating an Account
          </h3>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#4b5563',
            marginBottom: '14px'
          }}>
            To use our services, you need to create an account. Click on the "Sign Up" button and provide your basic information including name, email, phone number, and create a secure password. You'll receive a verification email to activate your account.
          </p>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            Logging In
          </h3>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#4b5563',
            margin: 0
          }}>
            Once your account is verified, use your registered email and password to log in. If you forget your password, click on "Forgot Password" to reset it via email.
          </p>
        </div>


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
            Booking Appointments
          </h2>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            Step-by-Step Process
          </h3>
          <ol style={{
            fontSize: '16px',
            lineHeight: '1.9',
            color: '#4b5563',
            paddingLeft: '20px',
            marginBottom: '20px'
          }}>
            <li>Log in to your account</li>
            <li>Navigate to "Book Appointment" section</li>
            <li>Select the department or search for a specific doctor</li>
            <li>Choose your preferred date and time slot</li>
            <li>Fill in the reason for visit and any special requirements</li>
            <li>Review your booking details</li>
            <li>Make payment (if applicable)</li>
            <li>Receive confirmation via email and SMS</li>
          </ol>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px'
          }}>
            Appointment Types
          </h3>
          <ul style={{
            fontSize: '16px',
            lineHeight: '1.9',
            color: '#4b5563',
            paddingLeft: '20px',
            margin: 0
          }}>
            <li><strong>In-Person Visit:</strong> Regular consultation at the hospital</li>
            <li><strong>Video Consultation:</strong> Online consultation via video call</li>
            <li><strong>Emergency:</strong> Immediate care for urgent medical situations</li>
            <li><strong>Follow-up:</strong> Scheduled follow-up after previous treatment</li>
          </ul>
        </div>


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
            Patient Portal Features
          </h2>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            Dashboard
          </h3>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#4b5563',
            marginBottom: '14px'
          }}>
            Your dashboard provides a quick overview of upcoming appointments, recent test results, pending bills, and important notifications.
          </p>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            Medical Records
          </h3>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#4b5563',
            marginBottom: '14px'
          }}>
            Access your complete medical history including diagnoses, prescriptions, lab reports, imaging results, and treatment plans. You can download or share these records with other healthcare providers.
          </p>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            Prescription Management
          </h3>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#4b5563',
            marginBottom: '14px'
          }}>
            View current and past prescriptions, request refills, and set medication reminders. You can also order medications for home delivery through our pharmacy partners.
          </p>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            Billing & Payments
          </h3>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#4b5563',
            margin: 0
          }}>
            View all bills, make payments online, download invoices, and track your payment history. You can also set up payment plans for larger bills.
          </p>
        </div>


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
            Frequently Asked Questions
          </h2>

          {faqs.map((faq, index) => (
            <div key={index} style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              marginBottom: '12px',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => toggleSection(index)}
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#111827'
                }}
              >
                <span>{faq.question}</span>
                <span style={{
                  fontSize: '20px',
                  transition: 'transform 0.3s',
                  transform: expandedSection === index ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                  ▼
                </span>
              </button>
              {expandedSection === index && (
                <div style={{
                  padding: '0 20px 18px 20px',
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: '#4b5563'
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>


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
            Privacy & Security
          </h2>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            Data Protection
          </h3>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#4b5563',
            marginBottom: '14px'
          }}>
            We use industry-standard encryption to protect your personal and medical information. All data is stored securely and accessible only to authorized healthcare providers involved in your care.
          </p>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            HIPAA Compliance
          </h3>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#4b5563',
            marginBottom: '14px'
          }}>
            Our platform is fully compliant with HIPAA regulations, ensuring your health information remains private and secure. We never share your data without your explicit consent.
          </p>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            Account Security
          </h3>
          <ul style={{
            fontSize: '16px',
            lineHeight: '1.9',
            color: '#4b5563',
            paddingLeft: '20px',
            margin: 0
          }}>
            <li>Use a strong, unique password</li>
            <li>Enable two-factor authentication for added security</li>
            <li>Never share your login credentials</li>
            <li>Log out after each session on shared devices</li>
            <li>Report suspicious activity immediately</li>
          </ul>
        </div>


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
            Terms & Conditions
          </h2>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px',
            marginTop: '20px'
          }}>
            User Responsibilities
          </h3>
          <ul style={{
            fontSize: '16px',
            lineHeight: '1.9',
            color: '#4b5563',
            paddingLeft: '20px',
            marginBottom: '20px'
          }}>
            <li>Provide accurate and complete information</li>
            <li>Arrive on time for appointments or notify in advance if unable to attend</li>
            <li>Respect hospital staff and other patients</li>
            <li>Follow prescribed treatment plans and medical advice</li>
            <li>Keep your contact information up to date</li>
          </ul>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px'
          }}>
            Cancellation Policy
          </h3>
          <ul style={{
            fontSize: '16px',
            lineHeight: '1.9',
            color: '#4b5563',
            paddingLeft: '20px',
            marginBottom: '20px'
          }}>
            <li>Cancellations must be made at least 24 hours in advance</li>
            <li>Late cancellations (less than 24 hours) may incur a fee</li>
            <li>No-shows without prior notice may result in a full consultation charge</li>
            <li>Repeated no-shows may affect your ability to book future appointments</li>
          </ul>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px'
          }}>
            Payment Terms
          </h3>
          <ul style={{
            fontSize: '16px',
            lineHeight: '1.9',
            color: '#4b5563',
            paddingLeft: '20px',
            margin: 0
          }}>
            <li>Payment is due at the time of service unless other arrangements are made</li>
            <li>We accept insurance - please verify coverage before your appointment</li>
            <li>Co-pays and deductibles must be paid at check-in</li>
            <li>Payment plans are available for large bills upon request</li>
            <li>All refunds will be processed within 7-10 business days</li>
          </ul>
        </div>


        <div style={{
          background: '#f0f9ff',
          padding: '30px',
          borderRadius: '8px',
          border: '1px solid #bfdbfe'
        }}>
          <h2 style={{
            fontSize: '26px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '16px'
          }}>
            Need More Help?
          </h2>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#4b5563',
            marginBottom: '20px'
          }}>
            If you couldn't find what you were looking for, our support team is here to help.
          </p>
          <div style={{
            fontSize: '16px',
            color: '#4b5563',
            lineHeight: '1.9'
          }}>
            <p style={{margin: '0 0 8px 0'}}>
              <strong>Email:</strong> support@healthcare.com
            </p>
            <p style={{margin: '0 0 8px 0'}}>
              <strong>Phone:</strong> 1-800-HEALTHCARE (24/7)
            </p>
            <p style={{margin: '0 0 8px 0'}}>
              <strong>Emergency Hotline:</strong> 911 or visit nearest emergency room
            </p>
            <p style={{margin: 0}}>
              <strong>Live Chat:</strong> Available Mon-Fri, 8 AM - 8 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}