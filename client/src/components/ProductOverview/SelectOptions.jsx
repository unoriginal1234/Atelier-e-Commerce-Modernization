// SelectOptions.jsx
import React from 'react';

const SelectOptions = ({
  // availableSizes,
  availableQuantities, handleSizeSelection, selectedQuantity, setSelectedQuantity, selectedSize, setErrorMessages, selectSizeRef, currentSKUs, isDropdownOpen }) => {
  // Function to handle change in quantity selection
  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value);
    setErrorMessages([]);
  };

  return (
    <div className="p-o-size-and-quantity">
      {/* Size Select */}
      <select className="size-select"
       id="selectSize" size={isDropdownOpen ? document.getElementById("selectSize").options.length : 1}
      onChange={handleSizeSelection}
      value={selectedSize}
      ref={selectSizeRef}
      >
        <option value="selectSize">SELECT SIZE</option>
        {currentSKUs.map((sku) => (
          <option key={sku[0]} sku={sku[0]}  value={sku[1].size}>
            {sku[1].size}
          </option>
        ))}
      </select>

      {/* Quantity Select */}
      <select className="quantity-select"
      value={selectedQuantity}
      onChange={handleQuantityChange}
      disabled={selectedSize.trim() === '' || selectedSize === 'selectSize'}
      >
        <option value="-">-</option>
        {[...Array(Math.min(availableQuantities, 15)).keys()].map((num) => (
          <option key={`quantity-${num + 1}`} value={num + 1}>
            {num + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOptions;

