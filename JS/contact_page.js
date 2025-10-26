// const BACKEND = "https://hospitality-management-system-xdyy.onrender.com"
const BACKEND = "http://localhost:3000"

let login_status = 0;
async function checkLoginStatus() {
  try {
    const res = await fetch(BACKEND + "/currentUser"); 
    if (!res.ok) { 
        console.error("Server error:", res.status, res.statusText);
        return;
    }

    const data = await res.json(); // safe now
    if (data.success) {
        console.log(data);
        const namee = document.getElementById("name");
        const emaill = document.getElementById("email");
        namee.value = data.user.name;
        emaill.value = data.user.email;
        login_status = 1;
    }
  } catch (err) {
    console.error("Error fetching login status:", err);
  }
}
checkLoginStatus();
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
    if (!name) {
      formMessage.textContent = "Enter Your Name";
      formMessage.style.color = "red";
      return;
    }
    if (!email) {
      formMessage.textContent = "Enter Your Email";
      formMessage.style.color = "red";
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formMessage.textContent = "⚠️ Please enter a valid email address.";
        formMessage.style.color = "red";
        return;
    }
    if (!message) {
      formMessage.textContent = "Enter Your Message";
      formMessage.style.color = "red";
      return;
    }
    if (!terms) {
      formMessage.textContent = "⚠️ Please agree to the Terms and Conditions.";
      formMessage.style.color = "red";
      return;
    }
    if(login_status == 0) {
      formMessage.textContent = "⚠️ You Need To Login First";
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
        alert("Form submitted successfully");
        //alert(JSON.stringify(review, null, 2)); if want to see the submitted data 
        formMessage.style.color = "green";
        form.reset();

        // dynamically created div should fade after 5 seconds of diplay
        setTimeout(() => {
          formMessage.textContent = "";
        }, 5000); /// 5 secinds value given

        const submitButton = document.getElementById("reviewForm").querySelector("button[type='submit']");
        submitButton.disabled = true;
        submitButton.textContent = "Submitted(wait 10 mins before re submitting)";

        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.textContent = "Submit";
        }, 10 * 60 * 1000); // letting user wait for 10 mintues before he resubmits 

        // Optional: keep message for 5 seconds, then fade
        setTimeout(() => {
          formMessage.textContent = "";
        }, 5000);
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






