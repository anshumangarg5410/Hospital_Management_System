async function loadMedicines(categoryFilter = "All") {
  try {
    const response = await fetch("../backend/databases/medicines.json");
    const data = await response.json();

    const productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = "";

    // Filter
    const filteredMedicines =
      categoryFilter === "All"
        ? data.medicines
        : data.medicines.filter((item) => {
            const categoryMatch =
              item.category &&
              item.category.trim().toLowerCase() ===
                categoryFilter.trim().toLowerCase();
            const tagMatch =
              item.tags &&
              item.tags.some(
                (tag) =>
                  tag.trim().toLowerCase() ===
                  categoryFilter.trim().toLowerCase()
              );
            return categoryMatch || tagMatch;
          });
    console.log("Filtered Medicines:", filteredMedicines);

    filteredMedicines.forEach((item) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <span class="rating">${"⭐".repeat(item.rating)} (${
        item.reviews
      })</span>
          <p class="price">$${item.price.toFixed(2)}</p>
          <button class="add-to-cart-btn" onclick="addToCart(${
            item.id
          })">Add to Cart</button>
        `;

      productGrid.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error loading medicines:", error);
    document.querySelector(".product-grid").innerHTML =
      "<p>Failed to load medicines.</p>";
  }
}
// ===================== CONFIG =====================
const API_BASE = "https://hospitality-management-system-xdyy.onrender.com";
// const API_BASE = "http://localhost:3000";

let allMedicines = [];
let currentUser = null;

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
async function setupLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

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

// ===================== ADD TO CART =====================
async function addToCart(medicineId) {
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
      loadCart();
    } else {
      alert(data.message || "Failed to add to cart");
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
    alert("Error adding to cart");
  }
}

// ===================== LOAD CART =====================
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
            <p>${item.medicine.name} (₹${item.medicine.price}) × ${item.quantity}</p>
            <button onclick="removeFromCart(${item.medicineId})">Remove</button>
          </div>`
        )
        .join("");
    }
  } catch (err) {
    console.error("Error loading cart:", err);
    cartContainer.innerHTML = "<p>Error loading cart</p>";
  }
}

// ===================== REMOVE FROM CART =====================
async function removeFromCart(medicineId) {
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
}

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

  if (selectedCategories.length > 0)
    filtered = filtered.filter((m) => selectedCategories.includes(m.category));

  if (selectedConditions.length > 0)
    filtered = filtered.filter((m) =>
      selectedConditions.includes(m.healthCondition)
    );

  if (selectedPrices.length > 0)
    filtered = filtered.filter((m) =>
      selectedPrices.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return m.price >= min && m.price <= max;
      })
    );

  displayMedicines(filtered);
}

// ===================== DISPLAY FILTERED MEDICINES =====================
function displayMedicines(medicines) {
  const productGrid = document.querySelector(".product-grid");
  if (!productGrid) return;

  if (medicines.length === 0) {
    productGrid.innerHTML = "<p>No products match your filters.</p>";
    return;
  }

  productGrid.innerHTML = medicines
    .map(
      (item) => `
      <div class="product-card">
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span class="rating">${"⭐".repeat(item.rating)} (${
        item.reviews
      })</span>
        <p class="price">₹${item.price.toFixed(2)}</p>
        <button class="add-to-cart-btn" onclick="addToCart(${
          item.id
        })">Add to Cart</button>
      </div>`
    )
    .join("");
}

// ===================== INITIALIZE =====================
document.addEventListener("DOMContentLoaded", () => {
  checkLoginStatus();
  setupLogout();
  loadMedicines("Optical Store");
  loadCart();

  // Filter listeners
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
});
