import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { createTag, getTags } from '../../services/tagService';

const TagSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]); // Available tag options
  const [selectedTags, setSelectedTags] = useState([]); // Selected tags

  // Fetch tags from API when component loads
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const data = await getTags(); // Await the result of fetching tags
      setOptions(data.map(tag => ({ label: tag.name, value: tag.id })));
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
  };

  // Handle enter press to either select or create new tag
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter' && inputValue) {
      const existingTag = options.find(option => option.label.toLowerCase() === inputValue.toLowerCase());

      if (existingTag) {
        // Tag exists, select it
        setSelectedTags((prevSelectedTags) => [...prevSelectedTags, existingTag]);
      } else {
        // Tag doesn't exist, create it through API
        const newTag = await handleCreateTag(inputValue); // Await tag creation
        if (newTag) {
          setSelectedTags((prevSelectedTags) => [...prevSelectedTags, newTag]);
          setOptions((prevOptions) => [...prevOptions, newTag]); // Add new tag to options
        }
      }
      setInputValue(''); // Reset input field
    }
  };

  // Function to create a new tag via an API call
  const handleCreateTag = async (tagName) => {
    try {
      const response = await createTag({ name: tagName }); // Await the API response
      console.log('New tag created:', response);
      return { label: response.data.name, value: response.data.id }; // Return the new tag object
    } catch (error) {
      console.error('Error creating new tag', error);
      return null;
    }
  };

  // Custom filter for partial matches
  const customFilter = (option, inputValue) => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
    <div>
      <Select
        isMulti
        value={selectedTags}
        options={options}
        onInputChange={handleInputChange}
        onChange={handleChange}
        inputValue={inputValue}
        onKeyDown={handleKeyDown}
        placeholder="Search or create tags..."
        noOptionsMessage={() => 'No tags found'}
        filterOption={customFilter} // Apply the custom filter
      />
    </div>
  );
};

export default TagSearch;
