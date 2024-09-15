import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductsByCategory } from "../utils/api.js";

const TopRated = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchTopRatedProducts = async () => {
      const fetchedProducts = await fetchProductsByCategory("top rated");
      setProducts(fetchedProducts);
    };

    fetchTopRatedProducts();
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      Math.min(prevSlide + 1, Math.floor(products.length / 5))
    );
  };

  return (
    <div className="my-8 text-center bg-gray-100">
      <h2 className="text-2xl font-bold text-black mb-4">Top Rated</h2>
      <div className="relative inline-block">
        <div className="flex overflow-x-auto justify-center">
          {products
            .slice(currentSlide * 5, (currentSlide + 1) * 5)
            .map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="flex-shrink-0 w-60 bg-gray-100 p-4 rounded-lg shadow-lg mx-2 no-underline text-inherit hover:transform hover:-translate-y-1 hover:shadow-xl transition-transform"
              >
                <img
                  src={product.displayImage}
                  alt={product.name}
                  className="w-full h-40 object-contain mb-4 rounded-lg"
                />
                <h3 className="text-xl font-bold text-black">{product.name}</h3>
                <p className="text-gray-900">₹{product.price}</p>
              </Link>
            ))}
        </div>
        <button
          onClick={handlePrevSlide}
          disabled={currentSlide === 0}
          className={`absolute top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full border-none outline-none cursor-pointer transition-opacity left-0 ml-4 ${
            currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &lt;
        </button>
        <button
          onClick={handleNextSlide}
          disabled={(currentSlide + 1) * 5 >= products.length}
          className={`absolute top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full border-none outline-none cursor-pointer transition-opacity right-0 mr-4 ${
            (currentSlide + 1) * 5 >= products.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TopRated;
