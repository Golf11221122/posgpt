let customerCount = "";

function goToTable() {
  window.location.href = "table.html";
}

function openPopup() {
  customerCount = "";
  document.getElementById("popupDisplay").innerText = "";
  document.getElementById("popup").style.display = "block";
}

function appendDigit(d) {
  if (customerCount.length < 3) {
    customerCount += d;
    document.getElementById("popupDisplay").innerText = customerCount;
  }
}

function clearCount() {
  customerCount = "";
  document.getElementById("popupDisplay").innerText = "";
}

function backspace() {
  customerCount = customerCount.slice(0, -1);
  document.getElementById("popupDisplay").innerText = customerCount;
}

function startOrder() {
  if (customerCount === "") {
    alert("กรุณากรอกจำนวนลูกค้า");
    return;
  }
  document.getElementById("popup").style.display = "none";
  window.location.href = "Ordermenu.html";
}

function goHome() {
  window.location.href = "index.html";
}

function goBack() {
  window.history.back();
}

// นับเวลาถอยหลัง 5 นาที
let timeout;
function resetTimer() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    window.location.href = "index.html";
  }, 5 * 60 * 1000);
}

window.onload = resetTimer;
window.onmousemove = resetTimer;
window.onkeydown = resetTimer;
