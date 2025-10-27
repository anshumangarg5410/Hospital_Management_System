const BACKEND = "https://hospitality-management-system-xdyy.onrender.com"
// const BACKEND = "http://localhost:3000"

let login_status = 0;
async function checkLoginStatus() {
  try {
    const res = await fetch(BACKEND + "/doctor/current"); 
    if (!res.ok) {  
        console.error("Server error:", res.status, res.statusText);
        return;
    }

    const data = await res.json(); // safe now
    if (data.success) { //if user is logged in already
        console.log(data);
        document.getElementById("displayDoctorName").innerText = data.user.name;
        document.getElementById("doctorIdText").innerText = data.user.id;
        document.getElementById("statAppointments").innerText = data.user.appointments;
        document.getElementById("statPatients").innerText = data.user.patients;
        document.getElementById("statReports").innerText = data.user.pending;
    }
  } catch (err) {
    console.error("Error fetching login status:", err); //handles errors netweork
  }
}
checkLoginStatus();







