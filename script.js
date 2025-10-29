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
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const cartItems = document.querySelectorAll("#cart-items li");
  const thankYouMsg = document.getElementById("thankyou-msg");
  const total = document.getElementById("total").innerText;
  const bookBtn = document.querySelector(".booking-form button");

  // Basic validation
  if (!fullName || !email || !phone) {
    alert("Please fill in all booking details.");
    return;
  }
  if (cartItems.length === 0) {
    alert("Please add at least one service before booking.");
    return;
  }

  // Disable button while sending
  bookBtn.disabled = true;
  bookBtn.innerText = "Sending...";

  // Prepare services list
  let servicesList = "";
  cartItems.forEach(item => {
    servicesList += `${item.textContent}\n`;
  });

  // Send email
  emailjs.send("service_rfost09", "template_4c8apue", {
    from_name: fullName,
    from_email: email,
    phone_number: phone,
    services: servicesList,
    total_amount: total
  })
  .then(() => {
    // Success feedback
    thankYouMsg.style.color = "green";
    thankYouMsg.textContent = " Booking sent successfully! We'll get back to you soon.";

    // Clear form
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    // Reset cart display
    document.getElementById("cart-items").innerHTML = "";
    document.getElementById("total").innerText = "0";
    cart = [];

    // Reset buttons for all services
    const allAddButtons = document.querySelectorAll(".add-btn");
    const allRemoveButtons = document.querySelectorAll(".remove-btn");
    allAddButtons.forEach(btn => btn.style.display = "inline-block");
    allRemoveButtons.forEach(btn => btn.style.display = "none");

  })
  .catch((error) => {
    // Failure feedback
    console.error("EmailJS error:", error);
    thankYouMsg.style.color = "red";
    thankYouMsg.textContent = " Failed to send booking. Please try again later.";
  })
  .finally(() => {
    // Re-enable button in all cases
    bookBtn.disabled = false;
    bookBtn.innerText = "Book Now";
  });
}
