
const login_as_doctor_btn = document.querySelector("#login_as_doctor_btn")

var login_detail_username_doctor = document.querySelector("#doctor_login_username");
var login_detail_password_doctor = document.querySelector("#doctor_login_password");

function login_as_doctor() {
    localStorage.setItem("login", 1);

    localStorage.setItem("username", login_detail_username_doctor.value);
    localStorage.setItem("password", login_detail_password_doctor.value);
}

login_as_doctor_btn.addEventListener("click", () => {
    login_as_doctor();
    console.log("Working")
})
