// const API_BASE = "http://localhost:3000";
const API_BASE = "https://hospitality-management-system-xdyy.onrender.com";
// const API_BASE = "http://localhost:3000"; 
let allMedicines = [];
let currentUser = null;

document.addEventListener("DOMContentLoaded", () => {

  // ===================== CHECK LOGIN STATUS =====================
  async function checkLoginStatus() {
    try {
      const response = await fetch(`${API_BASE}/login-status`);
      const data = await response.json();

      if (data.login === 1 && data.user) {
        currentUser = data.user;

        const authSection = document.getElementById("authSection");
        const userDropdown = document.getElementById("userDropdown");
        const navUserName = document.getElementById("navUserName");
        const navUserAvatar = document.getElementById("navUserAvatar");

        if (authSection) authSection.style.display = "none";
        if (userDropdown) userDropdown.style.display = "block";
        if (navUserName) navUserName.textContent = data.user.name;
        if (navUserAvatar)
          navUserAvatar.textContent = data.user.name.charAt(0).toUpperCase();
      } else {
        const authSection = document.getElementById("authSection");
        const userDropdown = document.getElementById("userDropdown");
        if (authSection) authSection.style.display = "block";
        if (userDropdown) userDropdown.style.display = "none";
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  }

  // ===================== LOGOUT =====================
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await fetch(`${API_BASE}/logout`, { method: "POST" });
        alert("Logged out successfully!");
        window.location.reload();
      } catch (err) {
        console.error("Logout error:", err);
        alert("Error logging out");
      }
    });
  }

  // ===================== FETCH MEDICINES =====================
  async function fetchMedicines() {
    const medicinesContainer = document.getElementById("productGrid");
    if (!medicinesContainer) return;

    try {
      const response = await fetch(`${API_BASE}/medicines`);
      const data = await response.json();

      if (data.success) {
        allMedicines = data.medicines;
        displayMedicines(allMedicines);
      } else {
        medicinesContainer.innerHTML =
          '<div class="no-products">Failed to load medicines</div>';
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
      medicinesContainer.innerHTML =
        '<div class="no-products">Error loading medicines</div>';
    }
  }

  // ===================== DISPLAY MEDICINES =====================
  function displayMedicines(medicines) {
    const medicinesContainer = document.getElementById("productGrid");
    if (!medicinesContainer) return;

    if (medicines.length === 0) {
      medicinesContainer.innerHTML =
        '<div class="no-products">No products match your filters</div>';
      return;
    }

    medicinesContainer.innerHTML = medicines
      .map(
        (medicine) => `
      <div class="product-card" data-id="${medicine.id}">
        <img src="${medicine.image}" alt="${medicine.name}" />
        <h4>${medicine.name}</h4>
        <p class="product-desc">${medicine.description}</p>
        <p class="product-price">₹${medicine.price.toFixed(2)}</p>
        <p class="product-reviews">${"⭐".repeat(
          medicine.rating
        )} (${medicine.reviews})</p>
        <button class="add-to-cart-btn" 
          onclick="addToCart(${medicine.id})" 
          ${medicine.stock === 0 ? "disabled" : ""}>
          ${medicine.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    `
      )
      .join("");
  }

  // ===================== ADD TO CART =====================
  window.addToCart = async function (medicineId) {
    if (!currentUser) {
      alert("Please login to add items to your cart");
      window.location.href = "/HTML/user_sel.html";
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicineId, quantity: 1 }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Added to cart successfully!");
        loadCart(); // Refresh cart if displayed
      } else {
        alert(data.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Error adding to cart");
    }
  };

  // ===================== CART =====================
  async function loadCart() {
    const cartContainer = document.getElementById("cartContainer");
    if (!cartContainer) return;

    if (!currentUser) {
      cartContainer.innerHTML = "<p>Please login to see your cart</p>";
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/cart`);
      const data = await response.json();

      if (data.success) {
        const cartItems = data.cart || [];
        if (cartItems.length === 0) {
          cartContainer.innerHTML = "<p>Your cart is empty</p>";
          return;
        }

        cartContainer.innerHTML = cartItems
          .map(
            (item) => `
          <div class="cart-item">
            <p>${item.medicine.name} (₹${item.medicine.price}) x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.medicineId})">Remove</button>
          </div>
        `
          )
          .join("");
      }
    } catch (err) {
      console.error("Error loading cart:", err);
      cartContainer.innerHTML = "<p>Error loading cart</p>";
    }
  }

  window.removeFromCart = async function (medicineId) {
    try {
      const response = await fetch(`${API_BASE}/cart/remove/${medicineId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        alert("Removed from cart!");
        loadCart();
      } else {
        alert(data.message || "Failed to remove item");
      }
    } catch (err) {
      console.error("Error removing from cart:", err);
      alert("Error removing item from cart");
    }
  };

  // ===================== FILTERS =====================
  function filterMedicines() {
    const selectedCategories = Array.from(
      document.querySelectorAll("#categoryFilters input:checked")
    ).map((cb) => cb.value);

    const selectedConditions = Array.from(
      document.querySelectorAll("#conditionFilters input:checked")
    ).map((cb) => cb.value);

    const selectedPrices = Array.from(
      document.querySelectorAll("#priceFilters input:checked")
    ).map((cb) => cb.value);

    let filtered = allMedicines;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((m) =>
        selectedCategories.includes(m.category)
      );
    }

    if (selectedConditions.length > 0) {
      filtered = filtered.filter((m) =>
        selectedConditions.includes(m.healthCondition)
      );
    }

    if (selectedPrices.length > 0) {
      filtered = filtered.filter((m) => {
        return selectedPrices.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return m.price >= min && m.price <= max;
        });
      });
    }

    displayMedicines(filtered);
  }

  document
    .querySelectorAll(
      "#categoryFilters input, #conditionFilters input, #priceFilters input"
    )
    .forEach((checkbox) => {
      checkbox.addEventListener("change", filterMedicines);
    });

  document.getElementById("clearFilters")?.addEventListener("click", () => {
    document
      .querySelectorAll('input[type="checkbox"]')
      .forEach((cb) => (cb.checked = false));
    displayMedicines(allMedicines);
  });

  // ===================== INITIALIZE =====================
  checkLoginStatus();
  fetchMedicines();
  loadCart(); // optional, if you have cartContainer on page
});