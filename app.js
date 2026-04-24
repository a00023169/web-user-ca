console.log("JS LOADED");

// ================= CONNECT =================
const supabaseUrl = "https://supabase.com/dashboard/project/blumzufykogeolyafedt";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsdW16dWZ5a29nZW9seWFmZWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMzY5NTQsImV4cCI6MjA5MjYxMjk1NH0.a79pBQorO5q14d2PtRoC59xiFG_KTgeaao06_EpTJEY";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// ================= LOAD DATA (READ) =================
async function loadProducts() {
  const { data, error } = await supabase.from("products").select("*");

console.log("LOAD DATA:", data);
console.log("LOAD ERROR:", error);

if (error) {
  console.error("Error loading products:", error.message);
  return;
}

  const table = document.getElementById("productList");
  table.innerHTML = "";

  data.forEach((product) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.category}</td>
      <td>${product.stock}</td>
      <td>
        <button onclick="editProduct(${product.product_id}, '${product.name}', '${product.category}', ${product.price}, ${product.stock})">Edit</button>
        <button onclick="deleteProduct(${product.product_id})">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

// ================= CREATE =================
async function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;
  const stock = document.getElementById("stock").value;

  const { error } = await supabase
    .from("products")
    .insert([{ name, price, category, stock }]);

  if (error) {
    alert("Insert failed: " + error.message);
  } else {
    loadProducts();
  }
}

// ================= DELETE =================
async function deleteProduct(id) {
  await supabase.from("products").delete().eq("product_id", id);
  loadProducts();
}

// ================= UPDATE =================
async function editProduct(
  id,
  currentName,
  currentCategory,
  currentPrice,
  currentStock,
) {
  const newName = prompt("Enter new name:", currentName);
  const newCategory = prompt("Enter new category:", currentCategory);
  const newPrice = prompt("Enter new price:", currentPrice);
  const newStock = prompt("Enter new stock:", currentStock);

  if (newName && newPrice) {
    await supabase
      .from("products")
      .update({
        name: newName,
        category: newCategory,
        price: newPrice,
        stock: newStock,
      })
      .eq("product_id", id);

    loadProducts();
  }
}

// LOAD ON START
window.onload = loadProducts
window.addProduct = addProduct;
window.deleteProduct = deleteProduct;
window.editProduct = editProduct;
