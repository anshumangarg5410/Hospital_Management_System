const loginButton = document.querySelector("#login_as_patient_btn");
const registerButton = document.querySelector("#register_as_patient_btn");

const usernameInputLogin = document.querySelector("#patient_login_username");
const passwordInputLogin = document.querySelector("#patient_login_password");

const usernameInputRegister = document.querySelector("#patient_register_username");
const passwordInputRegister = document.querySelector("#patient_register_password");

const backendLink = "https://hospitality-management-system-xdyy.onrender.com";
// const backendLink = "http://localhost:3000"

// Password validation regex: min 6 chars, at least one /, #, $
const passwordRegex = /^(?=.*[\/#$]).{6,}$/;

// ===================== LOGIN =====================
loginButton.addEventListener("click", async () => {
    const username = usernameInputLogin.value;
    const password = passwordInputLogin.value;
    const name = username;
    const email = name;

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

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
            window.location.href = "../index.html";
        } else {
            alert(result.message);
        }
    } catch (err) {
        console.error("Login failed:", err);
        alert("Unable to connect to server. Try again later.");
    }
});

// ===================== REGISTER =====================
registerButton.addEventListener("click", async () => {
    const username = usernameInputRegister.value;
    const password = passwordInputRegister.value;
    const name = username;
    const email = name;

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters and include at least one of: / # $");
        return;
    }

    try {
        const response = await fetch(`${backendLink}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, username, password })
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