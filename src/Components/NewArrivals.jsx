import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductsByCategory } from "../utils/api.js";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      const fetchedProducts = await fetchProductsByCategory("new arrival");
      setProducts(fetchedProducts);
    };

    fetchNewArrivals();
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  return (
    <div className="mx-auto my-8 text-center bg-gray-100 p-8">
      <h2 className="text-2xl font-bold text-black mb-4">New Arrivals</h2>
      <div className="relative inline-block">
        <div className="flex overflow-x-auto justify-center">
          {products
            .slice(currentSlide * 5, (currentSlide + 1) * 5)
            .map((product) => (
              <div
                key={product._id}
                className="flex-shrink-0 w-60 bg-gray-100 p-4 rounded-lg shadow-md text-black mr-4"
              >
                <Link to={`/products/${product._id}`} className="block">
                  <img
                    src={product.displayImage}
                    alt={product.name}
                    className="w-full h-32 object-contain mb-2 rounded-md"
                  />
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-gray-900">₹{product.price}</p>
                </Link>
              </div>
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

export default NewArrivals;
