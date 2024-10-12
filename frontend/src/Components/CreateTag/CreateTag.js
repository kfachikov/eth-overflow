import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { createTag, getTags } from '../../services/tagService';

const CreateTag = () => {
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
        const newTag = handleCreateTag(inputValue);
        setSelectedTags((prevSelectedTags) => [...prevSelectedTags, newTag]);
        setOptions([...options, newTag]);
      }
      setInputValue(''); // Reset input field
    }
  };

  // Function to create a new tag via an API call
  const handleCreateTag = (tagName) => {
    try {
      const response = createTag({ name: tagName }); // Call API to create new tag
      return { label: response.data.name, value: response.data.id }; // Return the new tag object
    } catch (error) {
      console.error('Error creating new tag', error);
    }
  };

  const customFilter = (option, inputValue) => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
    <div>
      <CreatableSelect
        isMulti
        createOptionPosition="first"
        value={selectedTags}
        options={options}
        onInputChange={handleInputChange}
        onChange={handleChange}
        inputValue={inputValue}
        onKeyDown={handleKeyDown}
        placeholder="Search or create tags..."
        noOptionsMessage={() => 'No tags found'}
        filterOption={customFilter}
      />
    </div>
  );
};

export default CreateTag;
