document.addEventListener("DOMContentLoaded", () => {
    // ====== Element References ======
    const loginButton = document.querySelector("#login_as_patient_btn");
    const usernameInputLogin = document.querySelector("#patient_login_username");
    const passwordInputLogin = document.querySelector("#patient_login_password");

    // Registration Form Elements
    const registerForm = document.querySelector("#registerForm");
    const usernameInputRegister = registerForm.querySelector('input[name="username"]');
    const passwordInputRegister = registerForm.querySelector('input[name="password"]');
    const emailInputRegister = document.querySelector("#patient_register_email");

    // ====== Backend URL ======
    const backendLink = "https://hospitality-management-system-xdyy.onrender.com";
    // const backendLink = "http://localhost:3000";

    // ====== LOGIN LOGIC ======
    loginButton.addEventListener("click", async (e) => {
        e.preventDefault();

        const username = usernameInputLogin.value.trim();
        const password = passwordInputLogin.value.trim();
        const name = username;
        const email = name;

        if (!username || !password) {
            alert("⚠️ Please enter all the details.");
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
            console.error("❌ Login failed:", err);
            alert("Unable to connect to the server. Please try again later.");
        }
    });

    // ====== REGISTER LOGIC ======
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = usernameInputRegister.value.trim();
        const password = passwordInputRegister.value.trim();
        const email = emailInputRegister.value.trim();
        const name = username;

        if (!username || !password || !email) {
            alert("⚠️ Please fill all fields (username, password, and email).");
            return;
        }

        const usernameRegex = /^[A-Za-z]{3,}$/;
        if (!usernameRegex.test(username)) {
            alert("Username must contain at least 3 letters (A-Z or a-z only).");
            return;
        }

        const passwordRegex = /^(?=.*[\/#$]).{8,}$/;
        if (!passwordRegex.test(password)) {
            alert("Password must be at least 8 characters long and include at least one of: / # $");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
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
            console.error("❌ Registration failed:", err);
            alert("Unable to connect to the server. Please try again later.");
        }
    });
});