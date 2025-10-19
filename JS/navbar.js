const navbar_text_for_login_selector = document.querySelector("#login_Status");
const navbar_appoint_toggle = document.querySelector("#book_appoint")

console.log(navbar_appoint_toggle)

// const backendLink = "https://hospitality-management-system-xdyy.onrender.com"
const backendLink = "http://localhost:3000"

async function loadNavbar() {
    try {
        const response = await fetch(backendLink + "/login-status");
        const result = await response.json();
        console.log("onfo")
        console.log(result.Current_User_Index);
        if(result.login == 1){
            navbar_text_for_login_selector.innerHTML = `<a href="#" onclick="logout()">Logout</a>`;
            navbar_appoint_toggle.innerHTML = `<a href="/HTML/appointment3.html"> <button class="nav-btn">Book Appoinstment</button> </a>`

        } else {
            navbar_text_for_login_selector.innerHTML = `<a href="./HTML/user_sel.html">Login</a>`;
            navbar_appoint_toggle.innerHTML = `<a href="/HTML/login_pat.html"> <button class="nav-btn">Book Appointment</button> </a>`
        }
    } catch(err) {
        console.error("Error fetching login status:", err);
    }
}

function logout() {
    fetch(backendLink + "/logout", { method: "POST" })
        .then(() => location.reload());
}



loadNavbar();
