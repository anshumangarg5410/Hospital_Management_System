document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reviewForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const terms = document.getElementById("terms").checked;

    if (!terms) {
      alert("⚠️ Please agree to the Terms and Conditions.");
      return;
    }

    if (!name || !email || !message) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    const review = { name, email, message };

    try {
      const res = await fetch("/saveReview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });

      if (res.ok) {
        alert("✅ Your message has been sent successfully!");
        form.reset();
      } else {
        alert("❌ Failed to send your message. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Server error. Please check the console.");
    }
  });
});
