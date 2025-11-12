const doctor_name = document.querySelector("#name_of_the_doctor")
const name = localStorage.getItem("username");

doctor_name.innerHTML = `<p style="color: #667eea">Welcome</p> Dr. ${name}`;