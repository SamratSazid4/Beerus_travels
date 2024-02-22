let selectedSeats = [];

//  seat selection
function selectSeat(seat) {
  if (selectedSeats.includes(seat)) {
    selectedSeats = selectedSeats.filter(s => s !== seat);
    document.getElementById('BookingSeatCount').textContent = selectedSeats.length;
    document.getElementById('totalPrice').textContent = calculateTotalPrice();
  } else if (selectedSeats.length < 4) {
    selectedSeats.push(seat);
    document.getElementById('BookingSeatCount').textContent = selectedSeats.length;
    document.getElementById('totalPrice').textContent = calculateTotalPrice();
  } else {
    alert('You can only select up to 4 seats.');
  }
}

// total price
function calculateTotalPrice() {
  const seatPrice = 550; // Price per seat
  return selectedSeats.length * seatPrice;
}

// handle coupon code
function applyCoupon() {
    let couponCode = document.getElementById('couponCode').value.trim();
    let discount = 0;
  
    if (couponCode === 'NEW15') {
      discount = 0.15; // 15% discount
    } else if (couponCode === 'Couple 20') {
      discount = 0.20; // 20% discount
    } else {
      alert('Invalid coupon code.');
      return;
    }
  
    const totalPrice = calculateTotalPrice();
    const discountedPrice = totalPrice - (totalPrice * discount);
    
    // Update grand total
    document.getElementById('grandTotalPrice').textContent = discountedPrice;
    
    // Disable coupon
    disableCouponSection();
  }
  
  

// Function to disable coupon section after applying coupon
function disableCouponSection() {
  document.getElementById('couponCode').disabled = true;
  document.getElementById('apply-btn').disabled = true;
}

// validate customer information
function validateCustomerInfo() {
  const name = document.getElementById('name').value;
  const mobileNumber = document.getElementById('mobileNumber').value;
  const email = document.getElementById('email').value;

  if (!name || !mobileNumber || !email) {
    alert('Please fill out all fields: Name, Mobile Number, and Email.');
    return false;
  }

  if (selectedSeats.length === 0) {
    alert('Please select at least one seat.');
    return false;
  }

  if (selectedSeats.length > 4) {
    alert('You can only select up to 4 seats.');
    return false;
  }

  return true;
}

//next page
function goToSuccessCard() {
    if (validateCustomerInfo()) {
      window.location.href = 'card.html'; 
    }
  }

document.querySelectorAll('.selectSeat').forEach(seatButton => {
    seatButton.addEventListener('click', () => {
      const seat = seatButton.textContent.trim();
      selectSeat(seat);
    });
  });
  
  document.getElementById('apply-btn').addEventListener('click', () => {
    const couponCode = document.getElementById('couponCode').value.trim();
    applyCoupon(couponCode);
  });
  
  document.getElementById('next-btn').addEventListener('click', (event) => {
    event.preventDefault(); 
    goToSuccessCard();
  });
  