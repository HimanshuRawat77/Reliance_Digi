import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductsByCategory } from "../utils/api.js";

const Bestseller = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchBestsellers = async () => {
      const fetchedProducts = await fetchProductsByCategory("best seller");
      setProducts(fetchedProducts);
    };

    fetchBestsellers();
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  return (
    <div className="bg-gray-50 py-8 mx-auto text-center">
      <h2 className="text-2xl font-bold text-black mb-4">Bestsellers</h2>
      <div className="relative inline-block">
        <div className="flex overflow-x-auto justify-center space-x-4">
          {products
            .slice(currentSlide * 5, (currentSlide + 1) * 5)
            .map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="flex-shrink-0 w-60 bg-gray-50 p-4 rounded-lg shadow-lg text-black no-underline"
              >
                <img
                  src={product.displayImage}
                  alt={product.name}
                  className="w-full h-32 object-contain mb-2 rounded-lg"
                />
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-black">₹{product.price}</p>
              </Link>
            ))}
        </div>
        <button
          onClick={handlePrevSlide}
          disabled={currentSlide === 0}
          className={`absolute top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full cursor-pointer left-0 ml-2 ${
            currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &lt;
        </button>
        <button
          onClick={handleNextSlide}
          disabled={(currentSlide + 1) * 5 >= products.length}
          className={`absolute top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full cursor-pointer right-0 mr-2 ${
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

export default Bestseller;
