const BACKEND = "https://hospitality-management-system-xdyy.onrender.com"
// const BACKEND = "http://localhost:3000"

let login_status = 0;
async function checkLoginStatus() {
  try {
    const res = await fetch(BACKEND + "/login-status"); 
    if (res.ok) {
      const data = await res.json();

      if (data.login == 0) {
        const namee = document.getElementById("name");
        const emaill = document.getElementById("email");
        namee.value = data.user.name;
        emaill.value = data.user.email;
        namee.readOnly = true;
        email.readOnly = true;
        login_status = 1;
      } 

    } else {
      console.error("Server error:", res.status, res.statusText);
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











// fetch("../backend/databases/Authentication.json")
//   .then(response => response.json())
//   .then(data => {
//     if (data.login == 1) {
//       const idx = data.Current_User_Index;
//       const currentuser = data.users[idx];
//       const namee = document.getElementById("name")
//       const emaill = document.getElementById("email")
//       namee.value = currentuser.name;
//       emaill.value = currentuser.email;
//       namee.readOnly = true;
//       emaill.readOnly = true;
//     }
//   })
//   .catch(error => {
//     console.log("Error fetching data: ", error);
//   });






















































































  

// const termsLink = document.querySelector('.checkbox-label a');

// // Create the message div
// const msg = document.createElement('div');
// msg.innerText = 'By agreeing, you accept our rules.You must be at least 18 years old.Do not use this website for illegal activities.';
// msg.style.position = 'absolute';
// msg.style.background = '#333';
// msg.style.color = '#fff';
// msg.style.padding = '3px 6px';
// msg.style.fontSize = '12px';
// msg.style.display = 'none'; // hide by default

// // Add it to the page
// document.body.appendChild(msg);

// // Show message on hover
// termsLink.addEventListener('mouseenter', () => {
//   const rect = termsLink.getBoundingClientRect();
//   msg.style.top = rect.bottom + window.scrollY + 1 + 'px'; // 5px below link
//   msg.style.left = rect.left + window.scrollX + 'px';
//   msg.style.display = 'block';
// });

// // Hide message on mouse leave
// termsLink.addEventListener('mouseleave', () => {
//   msg.style.display = 'none';
// });
