const login_as_doctor_btn = document.querySelector("#login_as_doctor_btn");
const login_detail_username_doctor = document.querySelector("#doctor_login_username");
const login_detail_password_doctor = document.querySelector("#doctor_login_password");

const backendLink = "https://hospitality-management-system-xdyy.onrender.com";
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

    // Password validation: min 6 chars, at least one /, #, or $
    const passwordRegex = /^(?=.*[\/#$]).{6,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters and include at least one of: / # $");
        return;
    }

    try {
        const response = await fetch(`${backendLink}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, username, password })
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            window.location.href = "../index.html"; // redirect after login
        } else {
            alert(result.message);
        }
    } catch (err) {
        console.error("Login failed:", err);
        alert("Unable to connect to server. Try again later.");
    }
});