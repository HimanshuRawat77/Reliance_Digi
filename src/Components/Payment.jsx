import React, { useState, useEffect } from "react";

const PaymentPage = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryMonthYear: "",
    cvv: "",
    nameOnCard: "",
  });

  const [errors, setErrors] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart items and calculate total price
  useEffect(() => {
    // Replace with your actual API call
    const fetchCartItems = async () => {
      const response = await fetch("/api/cart"); // Adjust the URL to your API
      const data = await response.json();
      setCartItems(data);

      // Calculate total price
      const total = data.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    };

    fetchCartItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    // Card number validation (16 digits only)
    if (!/^\d{16}$/.test(cardDetails.cardNumber)) {
      newErrors.cardNumber = "Card number should be 16 digits long.";
    }

    // Valid through date validation (MM/YY format)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiryMonthYear)) {
      newErrors.expiryMonthYear = "Invalid date format. Use MM/YY.";
    }

    // CVV validation (3 digits only)
    if (!/^\d{3}$/.test(cardDetails.cvv)) {
      newErrors.cvv = "CVV should be 3 digits long.";
    }

    // Name on card validation (alphabets only)
    if (!/^[A-Za-z ]+$/.test(cardDetails.nameOnCard)) {
      newErrors.nameOnCard = "Name on card should contain only letters.";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handlePay = () => {
    if (validate()) {
      console.log("Payment details:", cardDetails);
      // Proceed with the payment API call or form submission
      alert("Payment successful!");
    } else {
      console.log("Validation failed. Please check your input.");
    }
  };

  return (
    <div className="payment-page container mx-auto px-4 py-8 flex">
      {/* Card details form */}
      <div className="card-details w-1/2">
        <h2 className="text-xl mb-4">Enter details here</h2>

        {/* Card Number */}
        <div className="form-group mb-4">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={cardDetails.cardNumber}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          />
          {errors.cardNumber && (
            <span className="text-red-500">{errors.cardNumber}</span>
          )}
        </div>

        {/* Expiry Date and CVV */}
        <div className="form-group mb-4 flex space-x-4">
          <input
            type="text"
            name="expiryMonthYear"
            placeholder="Valid through (MM/YY)"
            value={cardDetails.expiryMonthYear}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-1/2"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-1/2"
          />
        </div>
        {errors.expiryMonthYear && (
          <span className="text-red-500">{errors.expiryMonthYear}</span>
        )}
        {errors.cvv && <span className="text-red-500">{errors.cvv}</span>}

        {/* Name on Card */}
        <div className="form-group mb-4">
          <input
            type="text"
            name="nameOnCard"
            placeholder="Name On Card"
            value={cardDetails.nameOnCard}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
          />
          {errors.nameOnCard && (
            <span className="text-red-500">{errors.nameOnCard}</span>
          )}
        </div>

        <button
          onClick={handlePay}
          className="bg-gray-300 text-white py-2 px-4 w-full mt-4"
        >
          Pay
        </button>
      </div>

      {/* Price details section */}
      <div className="price-details w-1/2">
        <h2 className="text-xl mb-4">
          PRICE DETAILS ({cartItems.length} items)
        </h2>
        <div className="flex justify-between mb-2">
          <span>Total MRP (Inc. of Taxes)</span>
          <span>{totalPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span className="text-green-500">Free</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span>Cart Total</span>
          <span>{totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
