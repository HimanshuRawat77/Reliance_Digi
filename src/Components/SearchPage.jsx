// import React, { useState } from "react";
// import Header from "./Header";

// const SearchPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Function to handle search
//   const handleSearch = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await fetch(
//         `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?search={"name":"${searchTerm}"}`,
//         {
//           method: "GET",
//           headers: {
//             projectId: "bng7dtu7whwk", // Replace with your actual project ID
//           },
//         }
//       );
//       const data = await response.json();

//       if (data.status === "success") {
//         setProducts(data.data);
//       } else {
//         setError("No products found");
//       }
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setError("Something went wrong while fetching data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="container mx-auto p-4">
//         {/* <h1 className="text-2xl font-bold mb-4">Search Products</h1> */}

//         {/* Search Input */}
//         <div className="mb-4">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search for products..."
//             className="w-full p-2 border rounded"
//           />
//           <button
//             onClick={handleSearch}
//             className="mt-2 p-2 bg-blue-500 text-white rounded"
//           >
//             Search
//           </button>
//         </div>

//         {/* Display loading message */}
//         {loading && <p>Loading...</p>}

//         {/* Display error message */}
//         {error && <p className="text-red-500">{error}</p>}

//         {/* Display Products */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.length === 0 && !loading && <p>No products found</p>}
//           {products.map((product) => (
//             <div key={product._id} className="border p-4 rounded shadow">
//               <img
//                 src={product.displayImage}
//                 alt={product.name}
//                 className="w-full h-48 object-cover mb-4"
//               />
//               <h4 className="text-lg font-semibold">{product.name}</h4>
//               <p className="text-sm">Price: ₹{product.price}</p>
//               <p className="text-sm">Seller: {product.seller.name}</p>
//               <p className="text-sm">Rating: {product.ratings}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // To get the search term from the URL
import Header from "./Header";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();

  // Function to get the query parameter from the URL
  const getQueryParam = () => {
    const params = new URLSearchParams(location.search);
    return params.get("query") || "";
  };

  const searchTerm = getQueryParam();

  // Function to handle fetching products based on the search term
  const fetchProducts = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?search=${encodeURIComponent(
          `{"name":"${searchTerm}"}`
        )}`,
        {
          headers: {
            projectId: "bng7dtu7whwk", // replace with your project ID
          },
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setProducts(data.data);
      } else {
        setError("No products found");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when the component mounts or when the search term changes
  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        {/* Display loading message */}
        {loading && <p>Loading...</p>}

        {/* Display error message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 && !loading && <p>No products found</p>}
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow">
              <img
                src={product.displayImage}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h4 className="text-lg font-semibold">{product.name}</h4>
              <p className="text-sm">Price: ₹{product.price}</p>
              <p className="text-sm">Seller: {product.seller.name}</p>
              <p className="text-sm">Rating: {product.ratings}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
