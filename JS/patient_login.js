
const login_as_patient_btn = document.querySelector("#login_as_patient_btn")

var login_detail_username_patient = document.querySelector("#patient_login_username");
var login_detail_password_patient = document.querySelector("#patient_login_password");

const user_Data = 

function login_as_patient() {



    localStorage.setItem("login", 1);


}

login_as_patient_btn.addEventListener("click", () => {
    login_as_patient();
    console.log("Working")
})




