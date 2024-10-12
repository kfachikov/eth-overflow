import React, { useState } from 'react';
import './ToggleOptions.css';

const ToggleOptions = ({ onToggle, options }) => {
  const [activeIndex, setActiveIndex] = useState(0); // Track the index of the active option

  const handleToggle = (index) => {
    setActiveIndex(index);

    if (onToggle) {
      onToggle(options[index]); // Pass the selected option instead of just the index
    }
  };

  return (
    <div className="toggle-container">
      {options.map((option, index) => (
        <button
          key={index}
          className={`toggle-button ${activeIndex === index ? 'dimmed' : ''}`}
          onClick={() => handleToggle(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ToggleOptions;