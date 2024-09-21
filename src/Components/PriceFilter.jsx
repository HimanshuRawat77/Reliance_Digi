// PriceFilter.js
import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceFilter = ({ handlePriceChange }) => {
  const [priceRange, setPriceRange] = useState([5000, 50000]);

  const handleSliderChange = (range) => {
    setPriceRange(range);
    handlePriceChange(range);
  };

  const handleInputChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
    handleSliderChange(newRange);
  };

  return (
    <div>
      <h4>Filter by Price</h4>
      <Slider
        range
        min={0}
        max={100000}
        value={priceRange}
        onChange={handleSliderChange}
      />
      <div>
        <label>
          Min Price:
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => handleInputChange(e, 0)}
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handleInputChange(e, 1)}
          />
        </label>
      </div>
    </div>
  );
};

export default PriceFilter;
