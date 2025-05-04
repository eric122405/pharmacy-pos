const inventory = {
  "Paracetamol": { price: 0.5, stock: 100 },
  "Ibuprofen": { price: 0.75, stock: 50 },
  "Amoxicillin": { price: 1.0, stock: 30 },
  "Cough Syrup": { price: 2.5, stock: 20 }
};

const cart = {};
const TAX_RATE = 0.07;

function renderInventory() {
  const tbody = document.querySelector('#inventory-table tbody');
  tbody.innerHTML = '';
  for (const [name, item] of Object.entries(inventory)) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${name}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${item.stock}</td>
      <td><input type="number" id="qty-${name}" min="1" max="${item.stock}" value="1"/></td>
      <td><button onclick="addToCart('${name}')">Add</button></td>
    `;
    tbody.appendChild(tr);
  }
}

function addToCart(name) {
  const qtyInput = document.getElementById(`qty-${name}`);
  const qty = parseInt(qtyInput.value);
  
  if (isNaN(qty) || qty <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  if (qty > inventory[name].stock) {
    alert(\`Only \${inventory[name].stock} \${name} in stock.\`);
    return;
  }

  cart[name] = (cart[name] || 0) + qty;
  inventory[name].stock -= qty;
  renderInventory();
  renderReceipt();
}

function renderReceipt() {
  const receipt = document.getElementById('receipt-items');
  const totals = document.getElementById('totals');
  receipt.innerHTML = '';
  let subtotal = 0;

  for (const [name, qty] of Object.entries(cart)) {
    const price = inventory[name].price;
    const itemTotal = price * qty;
    subtotal += itemTotal;
    const p = document.createElement('p');
    p.textContent = \`\${name} x \${qty} = $\${itemTotal.toFixed(2)}\`;
    receipt.appendChild(p);
  }

  const tax = subtotal * TAX_RATE;
  const grandTotal = subtotal + tax;

  totals.innerHTML = `
    <strong>Subtotal:</strong> $\${subtotal.toFixed(2)}<br>
    <strong>Tax (7%):</strong> $\${tax.toFixed(2)}<br>
    <strong>Total:</strong> $\${grandTotal.toFixed(2)}
  `;
}

renderInventory();
