const BACKEND = "https://hospitality-management-system-xdyy.onrender.com"
// const BACKEND = "http://localhost:3000"

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reviewForm");

  // Create message div dynamically if it doesn't exist
  let formMessage = document.getElementById("formMessage");
  if (!formMessage) {
    formMessage = document.createElement("div");
    formMessage.id = "formMessage";
    formMessage.style.marginTop = "10px";
    formMessage.style.fontWeight = "bold";
    form.appendChild(formMessage);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const terms = document.getElementById("terms").checked;

    if (!terms) {
      formMessage.textContent = "⚠️ Please agree to the Terms and Conditions.";
      formMessage.style.color = "red";
      return;
    }

    if (!name || !email || !message) {
      formMessage.textContent = "⚠️ Please fill in all fields.";
      formMessage.style.color = "red";
      return;
    }

    const review = { name, email, message };

    try {
      const res = await fetch(BACKEND + "/saveReview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });

      if (res.ok) {
        formMessage.textContent = "✅ Your message has been sent successfully!";
        formMessage.style.color = "green";
        form.reset();

        // Optional: keep message for 5 seconds, then fade
        setTimeout(() => {
          formMessage.textContent = "";
        }, 5000); // 5000 ms = 5 seconds
      } else {
        formMessage.textContent = "❌ Failed to send your message. Please try again.";
        formMessage.style.color = "red";
      }
    } catch (err) {
      console.error("Error:", err);
      formMessage.textContent = "⚠️ Server error. Please check the console.";
      formMessage.style.color = "red";
    }
  });

});

fetch("../backend/databases/Authentication.json")
    .then(response => response.json())
    .then(data => {
      if(data.login == 0) {
        const idx = data.Current_User_Index;
        const currentuser = data.users[idx];
        const namee = document.getElementById("name")
        const emaill = document.getElementById("email")
        namee.value = currentuser.name;
        emaill.value =  currentuser.email;
        namee.readOnly = true;
        emaill.readOnly = true;
      }
    })
    .catch(error => {
    console.log("Error fetching data: ",error);
  });

