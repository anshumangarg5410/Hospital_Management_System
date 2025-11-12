const BACKEND = "https://hospitality-management-system-xdyy.onrender.com";
// const BACKEND = "http://localhost:3000"

window.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector("#login_as_patient_btn");

  loginButton.addEventListener("click", async (e) => {
    e.preventDefault(); // prevent link navigation

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!username || !email) {
      alert("Please enter both username and email");
      return;
    }

    try {
      const response = await fetch(`${BACKEND}/loginwithoutpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email })
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        // localStorage.setItem("currentUser", JSON.stringify(result.user))
        window.location.href = "../index.html";
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Unable to connect to server. Try again later.");
    }
  });
});
