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
            // alert(result.message);
            window.location.href = "../index.html";
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