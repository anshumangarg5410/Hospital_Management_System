// user_portal.js
// const BACKEND = "http://localhost:3000";
const BACKEND = "https://hospitality-management-system-xdyy.onrender.com"
// const BACKEND = "http://localhost:3000"

// ========== TAB SWITCHING ==========
function showTab(event, tabName) {
  // Hide all tabs
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));

  // Remove active class from all nav items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  // Show selected tab
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }

  // Add active class to clicked nav item
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }

  // Update page title dynamically
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

  // Load data for specific tabs
  loadTabData(tabName);

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== LOAD TAB DATA ==========
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

// ========== HELPER FUNCTIONS ==========
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val ?? "";
}

// ========== LOAD CURRENT USER ==========
async function loadCurrentUser() {
  try {
    const res = await fetch(`${BACKEND}/currentUser`);
    const json = await res.json();
    
    if (!json.success) {
      console.log("No logged in user:", json.message);
      // Uncomment to redirect to login
      // window.location.href = "../HTML/patient_login_page.html";
      return;
    }
    
    populateUser(json.user);
  } catch (err) {
    console.error("Failed to load current user:", err);
  }
}

function populateUser(user) {
  // Display name and ID
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

  // Fill profile form inputs
  setValue("userName", user.name || "");
  setValue("userEmail", user.email || "");
  setValue("userPhone", user.phone || "");
  setValue("userDOB", user.dob || "");
  setValue("userBlood", user.bloodGroup || "");
  setValue("userAddress", user.address || "");

  // Store username for updates
  document.body.dataset.currentUsername = user.username;
}

// ========== UPDATE PROFILE ==========
async function updateProfile() {
  const username = document.body.dataset.currentUsername;
  const name = document.getElementById("userName")?.value?.trim();
  const email = document.getElementById("userEmail")?.value?.trim();
  const phone = document.getElementById("userPhone")?.value?.trim();
  const dob = document.getElementById("userDOB")?.value?.trim();
  const bloodGroup = document.getElementById("userBlood")?.value?.trim();
  const address = document.getElementById("userAddress")?.value?.trim();

  if (!username) {
    alert("No user loaded. Please login first.");
    return;
  }

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

// ========== CHANGE PASSWORD ==========
// ========== CHANGE PASSWORD ==========
async function changePassword() {
  const username = document.body.dataset.currentUsername;
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

  // Password validation
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
      // Clear password fields
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
// ========== LOGOUT ==========
async function logout() {
  if (!confirm("Are you sure you want to logout?")) return;
  
  try {
    await fetch(`${BACKEND}/logout`, { method: "POST" });
    window.location.href = "../HTML/patient_login_page.html";
  } catch (err) {
    console.error("Logout error:", err);
    // Redirect anyway
    window.location.href = "../HTML/patient_login_page.html";
  }
}

// ========== LOAD DASHBOARD DATA ==========
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

    // Update stat cards
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

// ========== RENDER DASHBOARD APPOINTMENTS ==========
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

// ========== RENDER DASHBOARD PRESCRIPTIONS ==========
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

// ========== LOAD ALL APPOINTMENTS ==========
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

// ========== LOAD ALL PRESCRIPTIONS ==========
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

// ========== LOAD MEDICINE ORDERS ==========
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

// ========== LOAD MEDICAL REPORTS ==========
async function loadMedicalReports() {
  try {
    const res = await fetch(`${BACKEND}/reports`);
    const json = await res.json();
    
    const container = document.getElementById("reportsList");
    if (!container) return;
    
    if (!json.success || json.reports.length === 0) {
      container.innerHTML = '<div class="card"><p>No medical reports found</p></div>';
      return;
    }
    
    container.innerHTML = json.reports.map(report => `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">${report.title}</div>
            <div class="card-subtitle">Report ID: ${report.id} • ${report.date}</div>
          </div>
          <span class="badge badge-green">${report.status}</span>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary">Download PDF</button>
          <button class="btn btn-outline">View Report</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error("Error loading medical reports:", err);
  }
}

// ========== UTILITY: FORMAT DATE TIME ==========
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

// ========== INITIALIZE ON PAGE LOAD ==========
document.addEventListener("DOMContentLoaded", () => {
  loadCurrentUser();
  loadDashboardData();
});

// ========== EXPOSE FUNCTIONS TO GLOBAL SCOPE ==========
window.showTab = showTab;
window.updateProfile = updateProfile;
window.changePassword = changePassword;
window.logout = logout;