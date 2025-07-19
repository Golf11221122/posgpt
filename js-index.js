let pin = "";

function appendNumber(num) {
  if (pin.length < 6) {
    pin += num;
    document.getElementById("pinDisplay").innerText = "*".repeat(pin.length);
  }
}

function clearPin() {
  pin = "";
  document.getElementById("pinDisplay").innerText = "";
}

function login() {
  fetch("https://script.google.com/macros/s/AKfycbzY9gDX-lBW8lg9nAS5XJ40beHLLMki9UcPe9QyLPlir7Zl1v1bAzgxzyWCIBFBSDNm/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pin: pin })
  })
  .then(() => {
    // ✅ ไม่สามารถรู้ผลจาก server ได้ ให้เดาว่าถูก และไปหน้า menu
    window.location.href = "menu.html";
  })
  .catch(err => {
    alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    console.error(err);
  });
}

function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString('th-TH', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const time = now.toLocaleTimeString('th-TH');
  document.getElementById("datetime").innerText = `${date}\n${time}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();
