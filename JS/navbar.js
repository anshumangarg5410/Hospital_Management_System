const navbar_text_for_login_selector = document.querySelector("#login_Status");

async function loadNavbar() {
    try {
        const response = await fetch("http://localhost:3000/login-status");
        const result = await response.json();

        if(result.login == 1){
            navbar_text_for_login_selector.innerHTML = `<a href="#" onclick="logout()">Logout</a>`;
        } else {
            navbar_text_for_login_selector.innerHTML = `<a href="./HTML/user_sel.html">Login</a>`;
        }
    } catch(err) {
        console.error("Error fetching login status:", err);
    }
}

function logout() {
    fetch("http://localhost:3000/logout", { method: "POST" })
        .then(() => location.reload());
}

loadNavbar();