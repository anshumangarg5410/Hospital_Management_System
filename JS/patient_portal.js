const patient_name = document.querySelector("#name_of_the_patient")
const name = localStorage.getItem("username");

patient_name.innerHTML = `<p style="color: #667eea">Welcome</p> Dr. ${name}`;