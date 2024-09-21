// CategoryFilter.js
import React, { useState, useEffect } from "react";

const CategoryFilter = ({ handleCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from API or use predefined ones
    const fetchedCategories = [
      "mobile",
      "laptop",
      "tablet",
      "accessories",
      "camera",
      "audio",
      "wearable",
      "tv",
      "home-appliance",
      "gaming",
      "networking",
      "computer",
      "printer",
    ]; // Replace with categories fetched from API
    setCategories(fetchedCategories);
  }, []);

  const handleCheckboxChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    handleCategoryChange(updatedCategories);
  };

  return (
    <div>
      <h4>Filter by Category</h4>
      {categories.map((category) => (
        <div key={category}>
          <label>
            <input
              type="checkbox"
              value={category}
              onChange={() => handleCheckboxChange(category)}
              checked={selectedCategories.includes(category)}
            />
            {category}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
