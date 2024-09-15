// import React, { useEffect, useState } from "react";
// import ReactSlider from "react-slider"; // for slider component

// const FilteredProducts = () => {
//   const [categories, setCategories] = useState([]); // Categories fetched in functionality 1
//   const [selectedCategories, setSelectedCategories] = useState([]); // Selected categories
//   const [priceRange, setPriceRange] = useState([0, 100000]); // Default price range
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch categories initially
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch(
//           "https://academics.newtonschool.co/api/v1/ecommerce/electronics/categories",
//           {
//             headers: {
//               projectId: "bng7dtu7whwk",
//             },
//           }
//         );
//         const result = await response.json();
//         setCategories(result.data); // Set categories
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Handle category selection (checkbox)
//   const handleCategoryChange = (category) => {
//     setSelectedCategories((prevCategories) =>
//       prevCategories.includes(category)
//         ? prevCategories.filter((c) => c !== category)
//         : [...prevCategories, category]
//     );
//   };

//   // Handle price range slider
//   const handlePriceChange = (newValue) => {
//     setPriceRange(newValue);
//   };

//   // Fetch filtered products whenever filters are changed
//   useEffect(() => {
//     const fetchFilteredProducts = async () => {
//       setLoading(true);
//       try {
//         const filters = {
//           subCategory: selectedCategories,
//           price: {
//             $gte: priceRange[0],
//             $lte: priceRange[1],
//           },
//         };

//         const filterString = encodeURIComponent(JSON.stringify(filters));

//         const response = await fetch(
//           `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter=${filterString}`,
//           {
//             headers: {
//               projectId: "bng7dtu7whwk",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }

//         const result = await response.json();
//         setProducts(result.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchFilteredProducts();
//   }, [selectedCategories, priceRange]);

//   if (loading) {
//     return (
//       <div className="text-center text-lg font-semibold">
//         Loading products...
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-500 text-center">Error: {error}</div>;
//   }

//   return (
//     <div className="p-6">
//       <div className="flex flex-col md:flex-row md:space-x-8">
//         {/* Filter Section */}
//         <div className="md:w-1/4">
//           {/* Category Filter */}
//           <h3 className="text-xl font-semibold mb-4">Filter by Category</h3>
//           <div className="space-y-2">
//             {categories.map((category) => (
//               <div key={category} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id={category}
//                   value={category}
//                   onChange={() => handleCategoryChange(category)}
//                   checked={selectedCategories.includes(category)}
//                   className="mr-2"
//                 />
//                 <label htmlFor={category} className="text-gray-700">
//                   {category}
//                 </label>
//               </div>
//             ))}
//           </div>

//           {/* Price Filter */}
//           <h3 className="text-xl font-semibold mt-6 mb-4">Filter by Price</h3>
//           <div className="flex items-center justify-between">
//             <input
//               type="number"
//               className="w-20 border rounded p-2 text-gray-700"
//               value={priceRange[0]}
//               onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
//             />
//             <span className="mx-2">-</span>
//             <input
//               type="number"
//               className="w-20 border rounded p-2 text-gray-700"
//               value={priceRange[1]}
//               onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
//             />
//           </div>
//           <div className="mt-4">
//             <ReactSlider
//               className="horizontal-slider"
//               thumbClassName="slider-thumb"
//               trackClassName="slider-track"
//               value={priceRange}
//               min={0}
//               max={100000}
//               onChange={handlePriceChange}
//               ariaLabel={["Lower thumb", "Upper thumb"]}
//               ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
//               renderThumb={(props, state) => (
//                 <div {...props}>{state.valueNow}</div>
//               )}
//             />
//           </div>
//         </div>

//         {/* Product Display Section */}
//         <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {products.length === 0 ? (
//             <div>No products found for the selected filters.</div>
//           ) : (
//             products.map((product) => (
//               <div
//                 key={product._id}
//                 className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow"
//               >
//                 <img
//                   src={product.displayImage}
//                   alt={product.name}
//                   className="w-full h-64 object-contain mb-4 rounded-t-lg"
//                 />
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   {product.name}
//                 </h2>
//                 <div className="flex items-center mb-2">
//                   <span className="text-yellow-500 text-lg">
//                     ★ {product.ratings}
//                   </span>
//                 </div>
//                 <p className="text-lg font-semibold text-gray-900">
//                   ₹{product.price.toLocaleString("en-IN")}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilteredProducts;
