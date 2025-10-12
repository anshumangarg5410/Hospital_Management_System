
const login_as_patient_btn = document.querySelector("#login_as_patient_btn")

var login_detail_username_patient = document.querySelector("#patient_login_username");
var login_detail_password_patient = document.querySelector("#patient_login_password");

function login_as_patient() {
    localStorage.setItem("login", 1);

    localStorage.setItem("username", login_detail_username_patient.value);
    localStorage.setItem("password", login_detail_password_patient.value);
}

login_as_patient_btn.addEventListener("click", () => {
    login_as_patient();
    console.log("Working")
})


