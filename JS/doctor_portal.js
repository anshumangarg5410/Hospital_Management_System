
import BACKEND from '../backend/databases/server_data'

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
        document.getElementById("doctorIdText").innerText = data.id;
        document.getElementById("statAppointments").innerText = data.user.appointments;
        document.getElementById("statPatients").innerText = data.user.patients;
        document.getElementById("statReports").innerText = data.user.pending;
    }
  } catch (err) {
    console.error("Error fetching login status:", err);
  }
}
checkLoginStatus();

const logoutBtn = document.querySelector(".LOGUT");

logoutBtn.addEventListener("click", async () => {
  try {
    const res = await fetch(BACKEND + "/doctor/logout", { method: "POST" });
    const data = await res.json();

    if (!res.ok || !data.success) {
      console.error("Server error:", res.status, res.statusText);
      alert("Logout failed");
      return;
    }
    alert("success");
    window.location.href = "login_doc.html";
  } catch (err) {
    console.error("Logout failed:", err);
    alert("Unable to logout. Try again later.");
  }
});





