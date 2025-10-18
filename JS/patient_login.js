const loginButton = document.querySelector("#login_as_patient_btn");
const registerButton = document.querySelector("#register_as_patient_btn");

const usernameInputLogin = document.querySelector("#patient_login_username");
const passwordInputLogin = document.querySelector("#patient_login_password");

const passwordInputRegister = document.querySelector("#patient_register_password");
const usernameInputRegister = document.querySelector("#patient_register_username");

var lengthOfUsers = 4;

async function getUsers() {
    const response = await fetch("https://hospitality-management-system-xdyy.onrender.com/users");
    const data = await response.json();
    lengthOfUsers = data.users.length;
}

getUsers();

console.log(lengthOfUsers)

loginButton.addEventListener("click", async () => {

    const username = usernameInputLogin.value;
    const password = passwordInputLogin.value;
    const name = username;
    const email = name;

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    try {
        const response = await fetch("https://hospitality-management-system-xdyy.onrender.com/login", {
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
        const response = await fetch("https://hospitality-management-system-xdyy.onrender.com/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name, email, username, password, lengthOfUsers })
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message); 

            window.location.href = "../HTML/patient_login_page.html";
        } else {
            alert(result.message); 
        }
    } catch (err) {
        console.error("Login failed:", err);
        alert("Unable to connect to server. Try again later.");
    }
});