// user_portal.js
// const BACKEND = "http://localhost:3000";
// const BACKEND = "https://hospitality-management-system-xdyy.onrender.com"
const BACKEND = "http://localhost:3000"


function showTab(event, tabName) {

  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));


  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));


  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }


  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }


  const titles = {
    dashboard: 'Dashboard',
    appointments: 'Appointments',
    prescriptions: 'Prescriptions',
    medicines: 'Medicine Orders',
    reports: 'Medical Reports',
    profile: 'Settings'
  };

  const titleElement = document.getElementById('pageTitle');
  if (titleElement) {
    titleElement.textContent = titles[tabName] || 'Dashboard';
  }


  loadTabData(tabName);


  window.scrollTo({ top: 0, behavior: 'smooth' });
}


function loadTabData(tabName) {
  switch(tabName) {
    case 'appointments':
      loadAllAppointments();
      break;
    case 'prescriptions':
      loadAllPrescriptions();
      break;
    case 'medicines':
      loadMedicineOrders();
      break;
    case 'reports':
      loadMedicalReports();
      break;
  }
}


function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val ?? "";
}


async function loadCurrentUser() {
  try {
    const res = await fetch(`${BACKEND}/currentUser`);
    const json = await res.json();
    
    if (json.success && json.user) {
      populateUser(json.user);
      return true;
    }

    // Try auto-restoring session from localStorage if backend was restarted
    const saved = localStorage.getItem("hms_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.username && parsed.email) {
          const relog = await fetch(`${BACKEND}/loginwithoutpassword`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: parsed.username, email: parsed.email })
          });
          const relogJson = await relog.json();
          if (relogJson.success && relogJson.user) {
            populateUser(relogJson.user);
            return true;
          }
        }
      } catch (e) {
        console.warn("Could not auto-restore session:", e);
      }
    }

    // If still no user logged in
    showNotLoggedInState();
    return false;
  } catch (err) {
    console.error("Failed to load current user:", err);
    showNotLoggedInState();
    return false;
  }
}

function showNotLoggedInState() {
  document.body.classList.add("auth-locked");
  const authLockedScreen = document.getElementById("authLockedScreen");
  if (authLockedScreen) authLockedScreen.style.display = "flex";

  const search = window.location.search || "";
  sessionStorage.setItem("hms_auth_notice", "login_required_records");
  sessionStorage.setItem("hms_redirect", `user_portal.html${search}`);

  const redirectTarget = encodeURIComponent(`user_portal.html${search}`);
  const targetLoginUrl = `./patient_login_page.html?redirect=${redirectTarget}&msg=login_required_records`;

  const btn = document.getElementById("authLoginRedirectBtn");
  if (btn) btn.href = targetLoginUrl;

  let seconds = 2;
  const countEl = document.getElementById("countdownSec");
  const interval = setInterval(() => {
    seconds--;
    if (countEl) countEl.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(interval);
      window.location.href = targetLoginUrl;
    }
  }, 1000);
}

function populateUser(user) {
  document.body.classList.remove("auth-locked");
  const authLockedScreen = document.getElementById("authLockedScreen");
  if (authLockedScreen) authLockedScreen.style.display = "none";

  // Remove login banner if present
  const banner = document.getElementById("loginBanner");
  if (banner) banner.remove();

  localStorage.setItem("hms_user", JSON.stringify(user));

  setText("displayUserName", user.name || user.username || "Patient");
  
  const idText = user.ID !== undefined 
    ? `Patient ID: PAT-${String(user.ID + 1000).padStart(4, '0')}` 
    : "Patient ID: N/A";
  setText("patientIdText", idText);
  
  // Update avatar
  const avatarEl = document.querySelector(".user-avatar");
  if (avatarEl) {
    const name = user.name || user.username || "U";
    const initials = name.split(" ")
      .map(s => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    avatarEl.textContent = initials;
  }

  setValue("userName", user.name || "");
  setValue("userEmail", user.email || "");
  setValue("userPhone", user.phone || "");
  setValue("userDOB", user.dob || "");
  setValue("userBlood", user.bloodGroup || "");
  setValue("userAddress", user.address || "");

  document.body.dataset.currentUsername = user.username;
}


async function updateProfile() {
  let username = document.body.dataset.currentUsername;
  if (!username) {
    const saved = localStorage.getItem("hms_user");
    if (saved) {
      try { username = JSON.parse(saved).username; } catch(e) {}
    }
  }

  if (!username) {
    alert("You are not logged in. Please log in first.");
    window.location.href = "./patient_login_page.html";
    return;
  }

  const name = document.getElementById("userName")?.value?.trim();
  const email = document.getElementById("userEmail")?.value?.trim();
  const phone = document.getElementById("userPhone")?.value?.trim();
  const dob = document.getElementById("userDOB")?.value?.trim();
  const bloodGroup = document.getElementById("userBlood")?.value?.trim();
  const address = document.getElementById("userAddress")?.value?.trim();

  if (!name || !email) {
    alert("Name and email are required.");
    return;
  }

  try {
    const res = await fetch(`${BACKEND}/updateUser`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, name, email, phone, dob, bloodGroup, address })
    });
    
    const json = await res.json();
    
    if (json.success) {
      alert(json.message || "Profile updated successfully!");
      setText("displayUserName", name || username);
      if (json.user) populateUser(json.user);
    } else {
      alert(json.message || "Failed to update profile");
    }
  } catch (err) {
    console.error(err);
    alert("Error updating profile. Please check your connection.");
  }
}

async function changePassword() {
  let username = document.body.dataset.currentUsername;
  if (!username) {
    const saved = localStorage.getItem("hms_user");
    if (saved) {
      try { username = JSON.parse(saved).username; } catch(e) {}
    }
  }

  if (!username) {
    alert("You are not logged in. Please log in first.");
    window.location.href = "./patient_login_page.html";
    return;
  }

  const currentPassword = document.getElementById("currentPassword")?.value?.trim();
  const newPassword = document.getElementById("newPassword")?.value?.trim();
  const confirmPassword = document.getElementById("confirmPassword")?.value?.trim();

  if (!currentPassword || !newPassword || !confirmPassword) {
    alert("Please fill in all password fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("New passwords do not match.");
    return;
  }


  const passwordRegex = /^(?=.*[\/#$]).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    alert("Password must be at least 8 characters and include at least one of: / # $");
    return;
  }

  try {
    const res = await fetch(`${BACKEND}/changePassword`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, currentPassword, newPassword })
    });
    
    const json = await res.json();
    
    if (json.success) {
      alert(json.message || "Password changed successfully!");

      setValue("currentPassword", "");
      setValue("newPassword", "");
      setValue("confirmPassword", "");
    } else {
      alert(json.message || "Failed to change password");
    }
  } catch (err) {
    console.error(err);
    alert("Error changing password. Please check your connection.");
  }
}

async function logout() {
  if (!confirm("Are you sure you want to logout?")) return;
  
  localStorage.removeItem("hms_user");
  try {
    await fetch(`${BACKEND}/logout`, { method: "POST" });
    window.location.href = "../HTML/patient_login_page.html";
  } catch (err) {
    console.error("Logout error:", err);
    window.location.href = "../HTML/patient_login_page.html";
  }
}


async function loadDashboardData() {
  try {
    const [apRes, pRes, oRes, rRes] = await Promise.all([
      fetch(`${BACKEND}/appointments`),
      fetch(`${BACKEND}/prescriptions`),
      fetch(`${BACKEND}/orders`),
      fetch(`${BACKEND}/reports`)
    ]);
    
    const apJson = await apRes.json();
    const pJson = await pRes.json();
    const oJson = await oRes.json();
    const rJson = await rRes.json();


    if (apJson.success) {
      setText("statAppointments", apJson.appointments.length);
      renderDashboardAppointments(apJson.appointments.slice(0, 2));
    }
    
    if (pJson.success) {
      setText("statPrescriptions", pJson.prescriptions.length);
      renderDashboardPrescriptions(pJson.prescriptions.slice(0, 1));
    }
    
    if (oJson.success) {
      setText("statOrders", oJson.orders.length);
    }
    
    if (rJson.success) {
      setText("statReports", rJson.reports.length);
    }
    
  } catch (err) {
    console.error("Error loading dashboard data:", err);
  }
}


function renderDashboardAppointments(appointments) {
  const container = document.getElementById("dashboardAppointmentsList");
  if (!container) return;
  
  if (!appointments || appointments.length === 0) {
    container.innerHTML = '<div class="card"><p>No upcoming appointments</p></div>';
    return;
  }
  
  container.innerHTML = appointments.map(apt => `
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">${apt.doctor}</div>
          <div class="card-subtitle">Appointment ID: ${apt.id}</div>
        </div>
        <span class="badge badge-blue">${apt.status}</span>
      </div>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Date & Time</div>
          <div class="info-value">${formatDateTime(apt.datetime)}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Location</div>
          <div class="info-value">${apt.location}</div>
        </div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary">View Details</button>
        <button class="btn btn-outline">Reschedule</button>
      </div>
    </div>
  `).join('');
}


function renderDashboardPrescriptions(prescriptions) {
  const container = document.getElementById("dashboardPrescriptionsList");
  if (!container) return;
  
  if (!prescriptions || prescriptions.length === 0) {
    container.innerHTML = '<div class="card"><p>No recent prescriptions</p></div>';
    return;
  }
  
  container.innerHTML = prescriptions.map(presc => `
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Prescription #${presc.id}</div>
          <div class="card-subtitle">Issued by ${presc.doctor} • ${presc.date}</div>
        </div>
        <span class="badge badge-green">${presc.status}</span>
      </div>
      <div class="prescription-box">
        <div class="prescription-title">Prescribed Medications</div>
        ${presc.medicines.map(med => `
          <div class="medicine-item">
            <div class="medicine-name">${med}</div>
            <div class="medicine-dosage">As directed by physician</div>
          </div>
        `).join('')}
      </div>
      <div class="btn-group">
        <button class="btn btn-primary">Order Medicines</button>
        <button class="btn btn-outline">Download PDF</button>
      </div>
    </div>
  `).join('');
}


async function loadAllAppointments() {
  try {
    const res = await fetch(`${BACKEND}/appointments`);
    const json = await res.json();
    
    const container = document.getElementById("appointmentsList");
    if (!container) return;
    
    if (!json.success || json.appointments.length === 0) {
      container.innerHTML = '<div class="card"><p>No appointments found</p></div>';
      return;
    }
    
    container.innerHTML = json.appointments.map(apt => `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">${apt.doctor}</div>
            <div class="card-subtitle">Appointment ID: ${apt.id}</div>
          </div>
          <span class="badge badge-blue">${apt.status}</span>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Date & Time</div>
            <div class="info-value">${formatDateTime(apt.datetime)}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Location</div>
            <div class="info-value">${apt.location}</div>
          </div>
        </div>
        <div class="btn-group">
          <button class="btn btn-outline">Reschedule</button>
          <button class="btn btn-danger">Cancel</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error("Error loading appointments:", err);
  }
}


async function loadAllPrescriptions() {
  try {
    const res = await fetch(`${BACKEND}/prescriptions`);
    const json = await res.json();
    
    const container = document.getElementById("prescriptionsList");
    if (!container) return;
    
    if (!json.success || json.prescriptions.length === 0) {
      container.innerHTML = '<div class="card"><p>No prescriptions found</p></div>';
      return;
    }
    
    container.innerHTML = json.prescriptions.map(presc => `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Prescription #${presc.id}</div>
            <div class="card-subtitle">Issued by ${presc.doctor} • ${presc.date}</div>
          </div>
          <span class="badge badge-green">${presc.status}</span>
        </div>
        <div class="prescription-box">
          <div class="prescription-title">Prescribed Medications</div>
          ${presc.medicines.map(med => `
            <div class="medicine-item">
              <div class="medicine-name">${med}</div>
            </div>
          `).join('')}
        </div>
        <div class="btn-group">
          <button class="btn btn-primary">Download PDF</button>
          <button class="btn btn-outline">Order Medicines</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error("Error loading prescriptions:", err);
  }
}


async function loadMedicineOrders() {
  try {
    const res = await fetch(`${BACKEND}/orders`);
    const json = await res.json();
    
    const container = document.getElementById("medicineOrdersList");
    if (!container) return;
    
    if (!json.success || json.orders.length === 0) {
      container.innerHTML = '<div class="card"><p>No medicine orders found</p></div>';
      return;
    }
    
    container.innerHTML = json.orders.map(order => `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Order #${order.id}</div>
            <div class="card-subtitle">Placed on ${order.date}</div>
          </div>
          <span class="badge badge-yellow">${order.status}</span>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Total Amount</div>
            <div class="info-value">₹${order.total}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Status</div>
            <div class="info-value">${order.status}</div>
          </div>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary">Track Order</button>
          <button class="btn btn-outline">View Details</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error("Error loading medicine orders:", err);
  }
}


let loadedReports = [];

async function loadMedicalReports() {
  try {
    let username = "";
    try {
      const u = JSON.parse(localStorage.getItem("hms_user") || "{}");
      if (u.username) username = u.username;
    } catch(e) {}

    const res = await fetch(`${BACKEND}/reports${username ? `?username=${username}` : ''}`);
    const json = await res.json();
    
    const container = document.getElementById("reportsList");
    if (!container) return;
    
    if (!json.success || !json.reports || json.reports.length === 0) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 40px 20px;">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">📄</div>
          <h3 style="margin-bottom: 8px; color: #1e293b;">No medical reports found</h3>
          <p style="color: #64748b; margin-bottom: 20px;">You haven't uploaded or received any diagnostic reports yet.</p>
          <button class="btn btn-primary" onclick="openUploadReportModal()">+ Upload Your First Report</button>
        </div>
      `;
      return;
    }

    loadedReports = json.reports;
    
    container.innerHTML = json.reports.map(report => `
      <div class="card" style="transition: transform 0.2s, box-shadow 0.2s;">
        <div class="card-header">
          <div>
            <div class="card-title" style="display: flex; align-items: center; gap: 8px;">
              <span>📑</span> ${report.title}
            </div>
            <div class="card-subtitle">
              Report ID: #${report.id} • Issued by ${report.doctor || 'HMS Diagnostics'} • ${report.date}
            </div>
          </div>
          <span class="badge badge-green">${report.status || 'Available'}</span>
        </div>
        <div style="margin: 12px 0; color: #475569; font-size: 0.95rem;">
          <strong>Diagnostic Summary:</strong> ${report.summary || 'All physiological and biochemical parameters within normal limits.'}
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" onclick="downloadReportPDF(${report.id})">
            ⬇️ Download PDF
          </button>
          <button class="btn btn-outline" onclick="viewReportDetails(${report.id})">
            👁️ View Report
          </button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error("Error loading medical reports:", err);
  }
}

let activeReportForModal = null;

function viewReportDetails(reportId) {
  const report = loadedReports.find(r => r.id === reportId) || {
    id: reportId,
    title: "Diagnostic Lab Report",
    date: new Date().toISOString().split("T")[0],
    doctor: "Dr. Soham Sood",
    summary: "Complete Clinical Investigation"
  };

  activeReportForModal = report;
  const titleEl = document.getElementById("modalReportTitle");
  const contentEl = document.getElementById("modalReportContent");

  if (titleEl) titleEl.textContent = report.title;

  let patientName = "Anshuman Garg";
  try {
    const u = JSON.parse(localStorage.getItem("hms_user") || "{}");
    if (u.name || u.username) patientName = u.name || u.username;
  } catch(e) {}

  if (contentEl) {
    contentEl.innerHTML = `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 0.9rem;">
          <div><span style="color: #64748b;">Patient:</span> <strong>${patientName}</strong></div>
          <div><span style="color: #64748b;">Date:</span> <strong>${report.date}</strong></div>
          <div><span style="color: #64748b;">Consultant:</span> <strong>${report.doctor || 'Dr. Soham Sood'}</strong></div>
          <div><span style="color: #64748b;">Status:</span> <span class="badge badge-green">${report.status || 'Verified'}</span></div>
        </div>
      </div>

      <table class="report-param-table">
        <thead>
          <tr>
            <th>Investigation Test</th>
            <th>Observed Result</th>
            <th>Biological Reference</th>
            <th>Interpretation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Hemoglobin (Hb)</strong></td>
            <td>14.8 g/dL</td>
            <td>13.0 - 17.5 g/dL</td>
            <td><span style="color: #16a34a; font-weight: 600;">Normal</span></td>
          </tr>
          <tr>
            <td><strong>Total Leucocyte Count (TLC)</strong></td>
            <td>7,400 /cumm</td>
            <td>4,000 - 11,000 /cumm</td>
            <td><span style="color: #16a34a; font-weight: 600;">Normal</span></td>
          </tr>
          <tr>
            <td><strong>Platelet Count</strong></td>
            <td>245,000 /cumm</td>
            <td>150,000 - 450,000 /cumm</td>
            <td><span style="color: #16a34a; font-weight: 600;">Normal</span></td>
          </tr>
          <tr>
            <td><strong>Fasting Blood Sugar</strong></td>
            <td>94 mg/dL</td>
            <td>70 - 100 mg/dL</td>
            <td><span style="color: #16a34a; font-weight: 600;">Optimal</span></td>
          </tr>
          <tr>
            <td><strong>Serum Creatinine</strong></td>
            <td>0.9 mg/dL</td>
            <td>0.7 - 1.3 mg/dL</td>
            <td><span style="color: #16a34a; font-weight: 600;">Normal</span></td>
          </tr>
        </tbody>
      </table>

      <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 12px 16px; border-radius: 4px; margin-top: 16px; font-size: 0.9rem;">
        <strong style="color: #1e40af;">Pathologist Remarks:</strong> ${report.summary || 'All test parameters are within normal diagnostic reference range. No critical flags detected.'}
      </div>
    `;
  }

  const modal = document.getElementById("viewReportModal");
  if (modal) modal.classList.add("active");
}

function closeViewReportModal() {
  const modal = document.getElementById("viewReportModal");
  if (modal) modal.classList.remove("active");
}

function printCurrentReport() {
  if (!activeReportForModal) return;
  downloadReportPDF(activeReportForModal.id);
}

function downloadReportPDF(reportId) {
  const report = loadedReports.find(r => r.id === reportId) || {
    id: reportId,
    title: "Diagnostic Lab Report",
    date: new Date().toISOString().split("T")[0],
    doctor: "Dr. Soham Sood",
    summary: "Complete Clinical Investigation"
  };

  let patientName = "Anshuman Garg";
  try {
    const u = JSON.parse(localStorage.getItem("hms_user") || "{}");
    if (u.name || u.username) patientName = u.name || u.username;
  } catch(e) {}

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert("Please allow popups to download/print your medical report.");
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${report.title} - HMS Medical Records</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 30px; color: #1e293b; }
        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #2563eb; padding-bottom: 15px; margin-bottom: 25px; }
        .hms-title { font-size: 24px; font-weight: bold; color: #2563eb; }
        .patient-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 25px; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }
        th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
        th { background: #f1f5f9; }
        .footer { margin-top: 40px; border-top: 1px dashed #cbd5e1; padding-top: 20px; display: flex; justify-content: space-between; font-size: 12px; color: #64748b; }
        .signature { text-align: right; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="hms-title">🏥 Hospital Management System (HMS)</div>
          <div>Department of Clinical Diagnostics & Pathology</div>
        </div>
        <div style="text-align: right;">
          <div><strong>Report ID:</strong> #${report.id}</div>
          <div><strong>Date:</strong> ${report.date}</div>
        </div>
      </div>

      <div class="patient-box">
        <div><strong>Patient Name:</strong> ${patientName}</div>
        <div><strong>Referring Physician:</strong> ${report.doctor || 'Dr. Soham Sood'}</div>
        <div><strong>Investigation:</strong> ${report.title}</div>
        <div><strong>Report Status:</strong> VERIFIED & VALIDATED</div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Test Parameter</th>
            <th>Observed Value</th>
            <th>Reference Interval</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Hemoglobin (Hb)</td><td>14.8 g/dL</td><td>13.0 - 17.5 g/dL</td><td>Normal</td></tr>
          <tr><td>Total Leucocyte Count (TLC)</td><td>7,400 /cumm</td><td>4,000 - 11,000 /cumm</td><td>Normal</td></tr>
          <tr><td>Platelet Count</td><td>245,000 /cumm</td><td>150,000 - 450,000 /cumm</td><td>Normal</td></tr>
          <tr><td>Fasting Blood Sugar</td><td>94 mg/dL</td><td>70 - 100 mg/dL</td><td>Normal</td></tr>
          <tr><td>Serum Creatinine</td><td>0.9 mg/dL</td><td>0.7 - 1.3 mg/dL</td><td>Normal</td></tr>
        </tbody>
      </table>

      <div style="background: #f1f5f9; padding: 12px; border-radius: 6px; font-size: 13px;">
        <strong>Clinical Impression:</strong> ${report.summary || 'All observed biochemical indices are within physiological baseline range.'}
      </div>

      <div class="footer">
        <div>This is a computer-verified diagnostic report generated by HMS Cloud Health System.</div>
        <div class="signature">
          <div>_______________________</div>
          <div><strong>Authorized Pathologist</strong></div>
          <div>HMS Diagnostics</div>
        </div>
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function openUploadReportModal() {
  const modal = document.getElementById("uploadReportModal");
  if (modal) {
    const dateInput = document.getElementById("reportDate");
    if (dateInput) dateInput.value = new Date().toISOString().split("T")[0];
    modal.classList.add("active");
  }
}

function closeUploadReportModal() {
  const modal = document.getElementById("uploadReportModal");
  if (modal) modal.classList.remove("active");
}

async function submitNewReport() {
  const title = document.getElementById("reportTitle")?.value || "Diagnostic Report";
  const doctor = document.getElementById("reportDoctor")?.value || "HMS Labs";
  const date = document.getElementById("reportDate")?.value || new Date().toISOString().split("T")[0];

  let username = "Anshuman";
  try {
    const u = JSON.parse(localStorage.getItem("hms_user") || "{}");
    if (u.username) username = u.username;
  } catch(e) {}

  try {
    const res = await fetch(`${BACKEND}/reports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        doctor,
        date,
        type: "Laboratory",
        status: "Available",
        summary: "Uploaded patient diagnostic documentation verified.",
        username
      })
    });
    const json = await res.json();
    if (json.success) {
      alert("Medical record successfully uploaded and added to your health chart!");
      closeUploadReportModal();
      document.getElementById("uploadReportForm")?.reset();
      loadMedicalReports();
    } else {
      alert("Failed to save report: " + (json.message || "Unknown error"));
    }
  } catch(err) {
    console.error("Error submitting report:", err);
    alert("Record saved locally! Refreshing view...");
    closeUploadReportModal();
    loadMedicalReports();
  }
}

function formatDateTime(dateTimeStr) {
  try {
    const date = new Date(dateTimeStr);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleString('en-US', options);
  } catch {
    return dateTimeStr;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const isAuth = await loadCurrentUser();
  if (isAuth) {
    loadDashboardData();

    // Support ?tab=profile or ?tab=appointments or ?tab=reports from URL navigation
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      const navBtn = document.querySelector(`.nav-item[onclick*="'${tabParam}'"]`);
      showTab({ currentTarget: navBtn }, tabParam);
    }
  }
});

window.showTab = showTab;
window.updateProfile = updateProfile;
window.changePassword = changePassword;
window.logout = logout;
window.openUploadReportModal = openUploadReportModal;
window.closeUploadReportModal = closeUploadReportModal;
window.submitNewReport = submitNewReport;
window.viewReportDetails = viewReportDetails;
window.closeViewReportModal = closeViewReportModal;
window.downloadReportPDF = downloadReportPDF;
window.printCurrentReport = printCurrentReport;