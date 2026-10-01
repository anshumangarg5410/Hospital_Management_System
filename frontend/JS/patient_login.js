const loginButton = document.querySelector("#login_as_patient_btn");
const registerButton = document.querySelector("#register_as_patient_btn");

// LOGIN FIELDS
const usernameInputLogin = document.querySelector("#patient_login_username");
const passwordInputLogin = document.querySelector("#patient_login_password");

// REGISTER FIELDS
const usernameInputRegister = document.querySelector("#patient_register_username");
// FIX: Select the first 'email' input and the second 'password' input properly
const emailInputRegister = document.querySelector('input[name="email"]');
const passwordInputRegister = document.querySelectorAll("#patient_register_password")[1];

// const backendLink = "https://hospitality-management-system-xdyy.onrender.com";
const backendLink = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get("msg") || sessionStorage.getItem("hms_auth_notice");
    const noticeEl = document.getElementById("loginAuthNotice");
    const noticeText = document.getElementById("loginAuthNoticeText");

    if (noticeEl && noticeText && msg) {
        if (msg === "login_required_records") {
            noticeText.textContent = "Please log in to view your medical records and patient dashboard.";
            noticeEl.style.display = "block";
        } else if (msg === "login_required_prescription") {
            noticeText.textContent = "Please log in to upload prescriptions and order medicines.";
            noticeEl.style.display = "block";
        } else if (msg === "login_required_portal") {
            noticeText.textContent = "Patient authentication required to access personal medical data.";
            noticeEl.style.display = "block";
        } else if (msg === "login_required") {
            noticeText.textContent = "Please log in with your patient account to continue.";
            noticeEl.style.display = "block";
        }
        sessionStorage.removeItem("hms_auth_notice");
    }
});

loginButton.addEventListener("click", async () => {
    const username = usernameInputLogin.value.trim();
    const password = passwordInputLogin.value.trim();

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    try {
        const response = await fetch(backendLink + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: username,
                email: username,
                username,
                password
            })
        });

        const result = await response.json();

        if (result.success) {
            if (result.user) {
                localStorage.setItem("hms_user", JSON.stringify(result.user));
            }
            const params = new URLSearchParams(window.location.search);
            const redirectTarget = params.get("redirect") || sessionStorage.getItem("hms_redirect");
            sessionStorage.removeItem("hms_redirect");
            if (redirectTarget) {
                // If it's a relative path or local target
                if (redirectTarget.startsWith("http://") || redirectTarget.startsWith("https://")) {
                    window.location.href = redirectTarget;
                } else if (redirectTarget.startsWith("../") || redirectTarget.startsWith("./")) {
                    window.location.href = redirectTarget;
                } else {
                    window.location.href = `./${redirectTarget}`;
                }
            } else {
                window.location.href = "../index.html";
            }
        } else {
            alert(result.message);
        }
    } catch (err) {
        console.error("Login failed:", err);
        alert("Unable to connect to server. Try again later.");
    }
});


registerButton.addEventListener("click", async () => {
    const username = usernameInputRegister.value.trim();
    const email = emailInputRegister.value.trim();
    const password = passwordInputRegister.value.trim();

    if (!username || !email || !password) {
        alert("Please enter all details");
        return;
    }


    const passwordRegex = /^(?=.*[\/#$]).{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters and include at least one of: / # $");
        return;
    }

    try {
        const response = await fetch(backendLink + "/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: username,
                email,
                username,
                password
            })
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