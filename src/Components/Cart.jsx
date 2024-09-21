import React, { useState, useEffect } from "react";
import Footer from "./Footer";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDJmNmFiMzgyZjViYWNkNTM5YWIwYiIsImlhdCI6MTcyNjkwMzYyNywiZXhwIjoxNzU4NDM5NjI3fQ.5mA4sx3z-kxAbB5fdfGpbpDcgJjH7Uby2caJQake7Fw";

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/ecommerce/cart",
        {
          method: "GET",
          headers: {
            projectId: "bng7dtu7whwk",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      console.log(data);
      setCartItems(data.cartItems || []);
      calculateTotalPrice(data.cartItems || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateTotalPrice = (items) => {
    let total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);

    try {
      await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${itemId}`,
        {
          method: "PATCH",
          headers: {
            projectId: "bng7dtu7whwk",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quantity: newQuantity,
            size: updatedItems.find((item) => item.id === itemId).size,
          }),
        }
      );
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const removeItemFromCart = async (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);

    try {
      await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${itemId}`,
        {
          method: "DELETE",
          headers: {
            projectId: "bng7dtu7whwk",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="flex flex-col lg:flex-row p-6 space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="w-full lg:w-3/4">
            {Array.isArray(cartItems) && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center mb-4 border-b border-gray-200 pb-4"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-cover mr-4"
                  />
                  <div className="flex-grow">
                    <h4 className="text-xl font-semibold">{item.name}</h4>
                    <p className="text-gray-600">Size: {item.size}</p>
                    <p className="text-gray-600">Price: ₹{item.price}</p>
                    <div className="flex items-center mt-2">
                      <label htmlFor={`quantity-${item.id}`} className="mr-2">
                        Quantity:
                      </label>
                      <select
                        id={`quantity-${item.id}`}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, Number(e.target.value))
                        }
                        className="border border-gray-300 rounded p-1"
                      >
                        {[1, 2, 3, 4].map((qty) => (
                          <option key={qty} value={qty}>
                            {qty}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeItemFromCart(item.id)}
                        className="ml-4 text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>

          <div className="w-full lg:w-1/4 bg-gray-100 p-4 border border-gray-300 rounded">
            <h3 className="text-lg font-semibold mb-4">Price Summary</h3>
            <p className="mb-2">Amount Payable: ₹{totalPrice}</p>
            <p className="mb-4">Delivery Charges: Free</p>
            <button
              onClick={handleCheckout}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
