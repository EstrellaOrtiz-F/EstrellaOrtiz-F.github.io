const prices = [700, 67, 32, 10]; 
const promoCodes = {
  "FREE": "free",   
  "SAVE": 0.1     
};
document.getElementById("updateBtn").addEventListener("click", updateCart);
document.getElementById("shipping").addEventListener("change", showShippingImage);

function updateCart() {
  let amInput = document.querySelectorAll(".qty");
  let total = 0;
  for (let i = 0; i < prices.length; i++)
     {
    let qty = parseInt(amInput[i].value) || 0;
    let itemTotal = prices[i] * qty;
    amInput[i].closest("tr").querySelector(".subtotal").textContent = "$" + itemTotal;
    total += itemTotal;
  }

  let shippingValue = parseFloat(document.getElementById("shipping").value) || 0;
  let promo = document.getElementById("promo").value.trim().toUpperCase();

  if (promo && promoCodes[promo]) {
    if (promoCodes[promo] === "free") {
      shippingValue = 0; 
    } else {
      total -= total * promoCodes[promo]; 
    }
  }
  let tax = total * 0.1;
  let grandTotal = total + shippingValue + tax;
  document.getElementById("cartSubtotal").textContent = total.toFixed(2);
  document.getElementById("cartShipping").textContent = shippingValue.toFixed(2);
  document.getElementById("cartTax").textContent = tax.toFixed(2);
  document.getElementById("cartTotal").textContent = grandTotal.toFixed(2);
}

function showShippingImage() 
{
  let shipDiv = document.getElementById("shipImage");
  shipDiv.innerHTML = "";

  let choice = document.getElementById("shipping").value;
  let img = document.createElement("img");
  if (choice === "20")
     {
    img.src = "img/truck.jpeg"; 
    shipDiv.appendChild(img);
  } else if (choice === "35") {
    img.src = "img/_.jpeg";
    shipDiv.appendChild(img);
  } else if (choice === "15") {
    img.src = "img/cargoship.jpeg";
    shipDiv.appendChild(img);
  }
}
