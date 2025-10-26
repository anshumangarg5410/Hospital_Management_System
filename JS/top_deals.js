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
          <button>Add to Cart</button>
        `;

      productGrid.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error loading medicines:", error);
    document.querySelector(".product-grid").innerHTML =
      "<p>Failed to load medicines.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadMedicines("Nutrition");
});
