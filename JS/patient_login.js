const loginButton = document.querySelector("#login_as_patient_btn");
const usernameInput = document.querySelector("#patient_login_username");
const passwordInput = document.querySelector("#patient_login_password");

loginButton.addEventListener("click", async () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const name = username;
    const email = name;

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name, email, username, password })
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