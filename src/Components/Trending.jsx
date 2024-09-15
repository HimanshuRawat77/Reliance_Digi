import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductsByCategory } from "../utils/api.js";

const Trending = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      const fetchedProducts = await fetchProductsByCategory("trending");
      setProducts(fetchedProducts);
    };

    fetchTrendingProducts();
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  return (
    <div className="my-8 text-center bg-gray-100">
      <h2 className="text-2xl font-bold text-black mb-4">Trending</h2>
      <div className="relative inline-block">
        <div className="flex overflow-x-auto justify-center">
          {products
            .slice(currentSlide * 5, (currentSlide + 1) * 5)
            .map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="flex-shrink-0 w-60 bg-gray-100 p-4 rounded-lg shadow-md text-black mr-2 hover:translate-y-1 hover:shadow-lg transition-transform duration-300"
              >
                <img
                  src={product.displayImage}
                  alt={product.name}
                  className="w-full h-40 object-contain mb-2 rounded-md"
                />
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-900">₹{product.price}</p>
              </Link>
            ))}
        </div>
        <button
          onClick={handlePrevSlide}
          disabled={currentSlide === 0}
          className={`absolute top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full border-none outline-none cursor-pointer transition-opacity duration-300 ease-in-out ${
            currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
          } left-4`}
        >
          &lt;
        </button>
        <button
          onClick={handleNextSlide}
          disabled={(currentSlide + 1) * 5 >= products.length}
          className={`absolute top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full border-none outline-none cursor-pointer transition-opacity duration-300 ease-in-out ${
            (currentSlide + 1) * 5 >= products.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          } right-4`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Trending;
