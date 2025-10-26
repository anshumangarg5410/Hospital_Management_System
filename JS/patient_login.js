// ===================== COMMON SETTINGS =====================
const backendLink = "https://hospitality-management-system-xdyy.onrender.com";
// const backendLink = "http://localhost:3000";

// ===================== DOCTOR LOGIN =====================
const loginAsDoctorBtn = document.querySelector("#login_as_doctor_btn");
const doctorUsernameInput = document.querySelector("#doctor_login_username");
const doctorPasswordInput = document.querySelector("#doctor_login_password");

loginAsDoctorBtn.addEventListener("click", async () => {
    const username = doctorUsernameInput.value.trim();
    const password = doctorPasswordInput.value.trim();
    const name = username;
    const email = name;

    if (!username || !password) {
        alert("Please enter both username and password");
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
            window.location.href = "../index.html";
        } else {
            alert(result.message);
        }
    } catch (err) {
        console.error("Doctor login failed:", err);
        alert("Unable to connect to server. Try again later.");
    }
});

// ===================== PATIENT LOGIN & REGISTER =====================
const loginButton = document.querySelector("#login_as_patient_btn");
const registerButton = document.querySelector("#register_as_patient_btn");

const usernameInputLogin = document.querySelector("#patient_login_username");
const passwordInputLogin = document.querySelector("#patient_login_password");

const usernameInputRegister = document.querySelector("#patient_register_username");
const passwordInputRegister = document.querySelector("#patient_register_password");

// -------- LOGIN --------
loginButton.addEventListener("click", async () => {
    const username = usernameInputLogin.value.trim();
    const password = passwordInputLogin.value.trim();
    const name = username;
    const email = name;

    if (!username || !password) {
        alert("Please enter both username and password");
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
            window.location.href = "../index.html";
        } else {
            alert(result.message);
        }
    } catch (err) {
        console.error("Patient login failed:", err);
        alert("Unable to connect to server. Try again later.");
    }
});

// -------- REGISTER --------
registerButton.addEventListener("click", async () => {
    const username = usernameInputRegister.value.trim();
    const password = passwordInputRegister.value.trim();
    const name = username;
    const email = name;

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[\/#$]).{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters and include at least one of: / # $");
        return;
    }

    try {
        const response = await fetch(backendLink + "/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name, email, username, password })
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            setTimeout(() => {
                window.location.href = "../HTML/patient_login_page.html";
            }, 100); 
        } else {
            alert(result.message);
        }
    } catch (err) {
        console.error("Registration failed:", err);
        alert("Unable to connect to server. Try again later.");
    }
});