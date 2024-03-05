import React, { useState, useEffect } from 'react';

const CustomDropdown = ({ options, onSelect, defaultValue, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
<div className={`custom-dropdown ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`} tabIndex="0" onBlur={() => setIsOpen(false)}>
  <div className="dropdown-header" onClick={() => !disabled && setIsOpen(!isOpen)}>
    {selectedOption}
  </div>
  {isOpen && (
    <ul className="dropdown-list">
      {options.map((option) => (
        <li key={option} onClick={() => handleOptionSelect(option)}>
          {option}
        </li>
      ))}
    </ul>
  )}
</div>
  );
};

export default CustomDropdown;
