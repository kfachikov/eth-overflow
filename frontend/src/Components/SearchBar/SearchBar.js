import React, { useState } from 'react';
import './SearchBar.css'; // Optional CSS for styling

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Trigger the callback with the search term
      if (onSearch) {
        onSearch(searchTerm);
      }
    }

  };

  return (
    <div className={`search-bar`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
