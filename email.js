let cart = [];

function addItem(button) {
  const serviceDiv = button.closest('.service');
  const name = serviceDiv.getAttribute("data-name");
  const price = parseInt(serviceDiv.getAttribute("data-price"));

  // Add only if not already in cart
  if (!cart.some(item => item.name === name)) {
    cart.push({ name, price });
  }

  // Toggle buttons visibility
  button.style.display = "none";
  serviceDiv.querySelector('.remove-btn').style.display = "inline-block";

  updateCart();
}

function removeItem(button) {
  const serviceDiv = button.closest('.service');
  const name = serviceDiv.getAttribute("data-name");

  // Remove from cart
  cart = cart.filter(item => item.name !== name);

  // Toggle buttons visibility
  button.style.display = "none";
  serviceDiv.querySelector('.add-btn').style.display = "inline-block";

  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const totalField = document.getElementById("total");
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.name} - ₹${item.price}`;
    cartList.appendChild(li);
    total += item.price;
  });

  totalField.innerText = total;
}



function sendBooking() {
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const cartItems = document.querySelectorAll("#cart-items li");

    if (!name || !email || !phone || cartItems.length === 0) {
      alert("Please fill in all fields and add at least one item.");
      return;
    }

    // Display thank you message
    document.getElementById("thankyou-msg").innerText =
      "Thank you for booking! We'll get back to you soon.";

    // Clear form and cart (optional)
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("cart-items").innerHTML = "";
    document.getElementById("total").innerText = "0";
    cart = [];
  }

