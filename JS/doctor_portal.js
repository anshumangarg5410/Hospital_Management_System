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
    }
  } catch (err) {
    console.error("Error fetching login status:", err); //handles errors netweork
  }
}
checkLoginStatus();







