const login_as_doctor_btn = document.querySelector("#login_as_doctor_btn")
const login_detail_username_doctor = document.querySelector("#doctor_login_username");
const login_detail_password_doctor = document.querySelector("#doctor_login_password");
console.log("ok")

const backendLink = "https://hospitality-management-system-xdyy.onrender.com"
// const backendLink = "http://localhost:3000"


login_as_doctor_btn.addEventListener("click", async () => {
    const username = login_detail_username_doctor.value;
    const password = login_detail_password_doctor.value;
    const name = username;
    const email = name;

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    try {
        const response = await fetch(backendLink + "/doctor/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username, password })
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message); 

            window.location.href = "../HTML/doctor_portal.html"; 
        } else {
            alert(result.message); 
        }
    } catch (err) {
        console.error("Login failed:", err);
        alert("Unable to connect to server. Try again later.");
    }
});

