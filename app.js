const supabaseUrl = "https://tfmykocynhszgpdcnpia.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmbXlrb2N5bmhzemdwZGNucGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NDM1NzksImV4cCI6MjA5MjQxOTU3OX0.nwoFGHWmSe4EGrb5OUxwTEa6d-RuMYipAI1gkK0PBLY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// ================= READ =================
async function fetchProducts() {
  const { data, error } = await supabase.from('products').select('*');
  
  const table = document.getElementById("productList");
  table.innerHTML = "";

  data.forEach(product => {
    table.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td>${product.stock}</td>
        <td>
          <button onclick="deleteProduct(${product.product_id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// ================= CREATE =================
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;
  const stock = document.getElementById("stock").value;

  await supabase.from('products').insert([
    { name, price, category, stock }
  ]);

  fetchProducts();
});

// ================= DELETE =================
async function deleteProduct(id) {
  await supabase.from('products').delete().eq('product_id', id);
  fetchProducts();
}

// ================= UPDATE =================
// (Simple version using prompt)
async function updateProduct(id) {
  const newName = prompt("Enter new name:");

  if (newName) {
    await supabase.from('products')
      .update({ name: newName })
      .eq('product_id', id);

    fetchProducts();
  }
}

// Load data on page start
fetchProducts();