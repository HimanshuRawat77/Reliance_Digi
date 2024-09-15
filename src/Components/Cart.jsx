// import React, { useEffect, useState } from "react";

// const Cart = () => {
//   const [Cart, setCart] = useState(null);

//   useEffect(() => {
//     // Fetch Cart data from the API
//     fetch("https://academics.newtonschool.co/api/v1/ecommerce/cart", {
//       headers: {
//         Authorization: "Bearer YOUR_JWT_TOKEN", // Replace with your JWT token
//         projectId: "bng7dtu7whwk", // Using the provided Project ID
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => setCart(data.data))
//       .catch((error) => console.error("Error fetching Cart data:", error));
//   }, []);

//   // Function to remove an item from the Cart
//   const removeItemFromCart = (productId) => {
//     fetch(
//       `https://academics.newtonschool.co/api/v1/ecommerce/Cart/${productId}`,
//       {
//         method: "DELETE",
//         headers: {
//           // Authorization: "Bearer YOUR_JWT_TOKEN", // Replace with your JWT token
//           projectId: "bng7dtu7whwk", // Using the provided Project ID
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.status === "success") {
//           setCart(data.data); // Update Cart after successful removal
//         }
//       })
//       .catch((error) => console.error("Error removing item:", error));
//   };

//   // if (!Cart) {
//   //   return <p>Loading Cart...</p>;
//   // }

//   if (Cart.items.length === 0) {
//     return (
//       <div className="Cart-page-container flex justify-center items-center h-screen">
//         <div className="empty-Cart text-center">
//           <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
//           <p className="text-lg text-gray-600 mb-8">
//             Browse our products and add them to your Cart!
//           </p>
//           <button
//             className="bg-red-600 text-white p-2 rounded-lg"
//             onClick={() => (window.location.href = "/")} // Redirect to home page
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="Cart-page-container flex">
//       {/* Left side - Cart Items */}
//       <div className="Cart-items flex-1">
//         <h2 className="text-xl font-semibold">
//           My Cart ({Cart.items.length} Items)
//         </h2>
//         {Cart.items.map((item) => (
//           <div
//             key={item.product._id}
//             className="Cart-item flex justify-between p-4 border-b"
//           >
//             <div className="Cart-item-info flex">
//               <img
//                 src={item.product.displayImage}
//                 alt={item.product.name}
//                 className="w-24 h-24 object-cover"
//               />
//               <div className="ml-4">
//                 <h3 className="text-lg">{item.product.name}</h3>
//                 <p className="text-gray-600">
//                   Rating: {item.product.ratings} ⭐
//                 </p>
//                 <p className="text-gray-600">Size: {item.size}</p>
//                 <div className="quantity-selector mt-2">
//                   <label htmlFor="quantity">Qty: </label>
//                   <select
//                     id="quantity"
//                     value={item.quantity}
//                     className="border p-1"
//                   >
//                     {[...Array(10).keys()].map((q) => (
//                       <option key={q + 1} value={q + 1}>
//                         {q + 1}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <button
//                   className="text-red-500 mt-2"
//                   onClick={() => removeItemFromCart(item.product._id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//             <p className="Cart-item-price text-lg font-semibold">
//               ₹{item.product.price.toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Right side - Price Summary */}
//       <div className="price-summary w-1/4 p-4 border-l">
//         <h2 className="text-lg font-semibold">Price Details</h2>
//         <div className="price-details mt-4">
//           <p>
//             Price ({Cart.items.length} Item(s)): ₹
//             {Cart.totalPrice.toLocaleString()}
//           </p>
//           <p>Delivery Charges: ₹FREE</p>
//           <p className="font-semibold mt-2">
//             Amount Payable: ₹{Cart.totalPrice.toLocaleString()}
//           </p>
//         </div>
//         <button className="mt-4 bg-red-600 text-white p-2 w-full">
//           Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from "react";
import Footer from "./Footer";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
            projectId: "bng7dtu7whwk", // Replace with actual project ID
            Authorization: `Bearer YOUR_JWT`, // Replace with JWT token
          },
        }
      );
      const data = await response.json();
      setCartItems(data.cartItems);
      calculateTotalPrice(data.cartItems);
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
            Authorization: `Bearer YOUR_JWT`,
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
            Authorization: `Bearer YOUR_JWT`,
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
            {cartItems.length > 0 ? (
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
