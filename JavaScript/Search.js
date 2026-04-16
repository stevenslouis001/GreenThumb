// Global products variable
let products = [];

function displayTopProducts() {
  const topProductCount = 4;

  // Sort by units_sold descending
  products.sort((a, b) => b.units_sold - a.units_sold);

  // Get top N products
  const topProducts = products.slice(0, topProductCount);
  const container = document.getElementById("top-products");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  topProducts.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-cards");

    // Use first image from images array
    const productImage = product.images && product.images.length > 0
      ? product.images[0]
      : "";

    productDiv.innerHTML = `
      <img src="${productImage}" alt="${product.name}">
      <p>${product.name}</p>
      <button onclick="window.location.href='Shop.html'">Shop Now</button>
    `;

    container.appendChild(productDiv);
  });
}

// Function to search products
function searchProducts(products, query) {
  const terms = query.toLowerCase().trim().split(" ").filter(term => term !== "");

  return products.filter(product => {
    const searchableText = (
      product.name + " " + product.keywords.join(" ")
    ).toLowerCase();

    return terms.every(term => searchableText.includes(term));
  });
}

// Fetch JSON and initialize everything
fetch("../JSON/Products.json")
  .then(r => r.json())
  .then(d => {
    products = d.products;

    // Display top products after products are loaded
    displayTopProducts();
  })
  .catch(err => console.error("Error loading products:", err));

// Search button event
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;
  const results = searchProducts(products, query);
  console.log(results);
});