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

 // Determine available sizes based on stock information
 const availableSizes = currentSKUs.filter((sku) => sku[1].quantity > 0);

  return (
    <div className="p-o-size-and-quantity">
      {/* Size Select */}
    {availableSizes.length > 0 ? (
        <select
          className="size-select"
          id="selectSize"
          data-testid="selectSize"
          size={isDropdownOpen ? document.getElementById("selectSize").options.length : 1}
          // multiple={isDropdownOpen ? "multiple" : ""}
          onChange={handleSizeSelection}
          value={selectedSize}
          ref={selectSizeRef}
        >
          <option value="selectSize">SELECT SIZE</option>
          {availableSizes.map((sku) => (
            <option key={sku[0]} sku={sku[0]} value={sku[1].size}>
              {sku[1].size}
            </option>
          ))}
        </select>
      ) : (
        <select className="size-select" disabled>
          <option value="outOfStock">OUT OF STOCK</option>
        </select>
      )}

      {/* Quantity Select */}
      <select className="quantity-select"
      id="selectQuantity"
      data-testid="selectQuantity"
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

