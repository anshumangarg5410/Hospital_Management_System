document.addEventListener("DOMContentLoaded", () => {

    // Buttons
    const loginButton = document.querySelector("#login_as_patient_btn");
    const registerButton = document.querySelector("#register_as_patient_btn");

    // Login inputs
    const usernameInputLogin = document.querySelector("#patient_login_username");
    const passwordInputLogin = document.querySelector("#patient_login_password");

    // Register inputs
    const usernameInputRegister = document.querySelector("#patient_register_username");
    const emailInputRegister = document.querySelector("#patient_register_email");
    const passwordInputRegister = document.querySelector("#patient_register_password");

    const backendLink = "https://hospitality-management-system-xdyy.onrender.com";
    // const backendLink = "http://localhost:3000";

    // ==================== LOGIN ====================
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
            const response = await fetch(backendLink + "/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, username, password }),
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

    // ==================== REGISTER ====================
    registerButton.addEventListener("click", async () => {
        const username = usernameInputRegister.value.trim();
        const email = emailInputRegister.value.trim();
        const password = passwordInputRegister.value.trim();
        const name = username;

        if (!username || !email || !password) {
            alert("Please fill all details");
            return;
        }

        // Username validation
        const usernameRegex = /^[A-Za-z]{3,}$/;
        if (!usernameRegex.test(username)) {
            alert("Username must contain at least 3 alphabets (letters only).");
            return;
        }

        // Password validation
        const passwordRegex = /^(?=.*[\/#$]).{8,}$/;
        if (!passwordRegex.test(password)) {
            alert("Password must be at least 8 characters long and include at least one of: / # $");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            const response = await fetch(backendLink + "/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, username, password }),
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
});