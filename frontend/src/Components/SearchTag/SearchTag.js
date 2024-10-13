import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getTags } from '../../services/tagService';
import './SearchTag.css'

const SearchTag = ({ onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]); // Available tag options
  const [selectedTags, setSelectedTags] = useState([]); // Selected tags

  // Fetch tags from API when component loads
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await getTags();
      setOptions(response.data.map(tag => ({ label: tag.name, value: tag.id })));
    } catch (error) {
      console.error('Error fetching tags', error);
    }
  };

  // Handle user input
  const handleInputChange = (input) => {
    setInputValue(input);
  };

  // Handle selection of tags (either existing or newly created)
  const handleChange = (selected) => {
    setSelectedTags(selected || []);
    onChange(selected);
  };

  // Handle enter press to either select or create new tag
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter' && inputValue) {
      const existingTag = options.find(option => option.label.toLowerCase() === inputValue.toLowerCase());

      if (existingTag) {
        // Tag exists, select it
        setSelectedTags((prevSelectedTags) => [...prevSelectedTags, existingTag]);
      }
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      outline: state.isFocused ? '2px solid var(--purple60)' : 'none', // Custom border color on focus
      boxShadow: 'none', // Add box shadow when focused
      border: '1px solid #ccc',
      '&:hover': {
        border: '1px solid #ccc',
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused || state.isSelected ? 'var(--purple40)' : '#fff', // Purple background on focus or selected, white otherwise
      color: state.isFocused || state.isSelected ? '#fff' : '#000', // White text on focus/selected, black otherwise
      '&:active': {
        backgroundColor: 'var(--purple40)', // Ensure the purple stays when clicking the option
        color: '#fff', // White text when active
      }
    }),
  };

  const customFilter = (option, inputValue) => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
    <div className="searchTagDiv">
      <Select
        styles={customStyles}
        isMulti
        value={selectedTags}
        options={options}
        onInputChange={handleInputChange}
        onChange={handleChange}
        inputValue={inputValue}
        onKeyDown={handleKeyDown}
        placeholder="Search tags..."
        noOptionsMessage={() => 'No tags found'}
        filterOption={customFilter}
      />
    </div>
  );
};

export default SearchTag;
