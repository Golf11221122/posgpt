let order = {};
let discountPercent = 0;
let enteredPin = "";
let startTime = new Date();

function updateOverlay(show) {
  document.getElementById("overlay").style.display = show ? "block" : "none";
}

function closeAllPopups() {
  document.getElementById("authPopup").style.display = "none";
  document.getElementById("discountPopup").style.display = "none";
  document.getElementById("errorPopup").style.display = "none";
  updateOverlay(false);
}

function promptDiscountAuth() {
  enteredPin = "";
  updateOverlay(true);
  document.getElementById("authPopup").style.display = "block";
  updatePinDisplay();
}

function inputPin(digit) {
  if (enteredPin.length < 6) {
    enteredPin += digit;
    updatePinDisplay();
  }
}

function updatePinDisplay() {
  let display = enteredPin.padEnd(6, "_");
  document.getElementById("pinDisplay").innerText = display;
}

function clearPin() {
  enteredPin = "";
  updatePinDisplay();
}

function submitPin() {
  if (enteredPin === "000000") {
    document.getElementById("authPopup").style.display = "none";
    document.getElementById("discountPopup").style.display = "block";
  } else {
    document.getElementById("authPopup").style.display = "none";
    document.getElementById("errorPopup").style.display = "block";
    setTimeout(() => {
      document.getElementById("errorPopup").style.display = "none";
      promptDiscountAuth();
    }, 1500);
  }
}

function applyDiscount(percent) {
  discountPercent = percent;
  document.getElementById("discountPopup").style.display = "none";
  updateOverlay(false);
  updateSummary();
}

function addToOrder(item) {
  const name = item["name"];
  const price = Number(item["price"]);
  if (!order[name]) {
    order[name] = { price, quantity: 1 };
  } else {
    order[name].quantity++;
  }
  updateSummary();
}

function updateSummary() {
  const summary = document.getElementById("orderSummary");
  const items = document.getElementById("orderItems");
  const total = document.getElementById("totalSummary");
  items.innerHTML = "";

  let subtotal = 0;
  for (const name in order) {
    const item = order[name];
    subtotal += item.price * item.quantity;

    const row = document.createElement("div");
    row.className = "order-item";
    row.innerHTML = `
      <div>${name}</div>
      <div class="controls">
        <button onclick="changeQty('${name}', -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQty('${name}', 1)">+</button>
        <button onclick="removeItem('${name}')">🗑️</button>
      </div>
    `;
    items.appendChild(row);
  }

  const discount = subtotal * (discountPercent / 100);
  const vat = (subtotal - discount) * 0.07;
  const net = subtotal - discount + vat;

  total.innerHTML = `
    ยอดรวม: ${subtotal.toFixed(2)} ฿<br>
    ส่วนลด (${discountPercent}%): ${discount.toFixed(2)} ฿<br>
    ภาษี (7%): ${vat.toFixed(2)} ฿<br>
    <strong>ราคาสุทธิ: ${net.toFixed(2)} ฿</strong>
  `;

  summary.style.display = "block";
}

function removeDiscount() {
  discountPercent = 0;
  updateSummary();
}

function changeQty(name, change) {
  if (order[name]) {
    order[name].quantity += change;
    if (order[name].quantity <= 0) {
      delete order[name];
    }
    updateSummary();
  }
}

function removeItem(name) {
  delete order[name];
  updateSummary();
}

function submitOrder() {
  const duration = Math.floor((new Date() - startTime) / 1000);
  alert(`สั่งซื้อเรียบร้อย! ใช้เวลา: ${duration} วินาที`);
  order = {};
  discountPercent = 0;
  updateSummary();
}

function cancelOrder() {
  if (confirm("ต้องการยกเลิกการสั่งซื้อใช่ไหม?")) {
    order = {};
    disc
