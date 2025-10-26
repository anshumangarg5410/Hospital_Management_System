const BACKEND = "https://hospitality-management-system-xdyy.onrender.com";
const loginButton = document.querySelector("#login_as_patient_btn");
const registerButton = document.querySelector("#register_btn");


loginButton.addEventListener("click", async () => {

    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const name = username;
    const email_id = email;

    if (!username || !email_id) {
        alert("Please enter both username and email");
        return;
    }

    try {
        const response = await fetch(BACKEND + "/LoginWithoutPassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username, email })
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
        alert("Unable to connect to serverr. Try again later.");
    }
});


registerButton.addEventListener("click", async () => {
    const username = usernameInputRegister.value;
    const password = passwordInputRegister.value;
    const name = username;
    const email = name;

    if (!username || !password) {
        alert("Please enter both username and password");
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
        console.error("Login failed:", err);
        alert("Unable to connect to server. Try again later.");
    }
});