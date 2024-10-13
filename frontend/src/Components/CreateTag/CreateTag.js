import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { createTag, getTags } from "../../services/tagService";

const CreateTag = ({ onChange, tags }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]); // Available tag options
  const [selectedTags, setSelectedTags] = useState([]); // Selected tags

  // Fetch tags from API when component loads
  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    setSelectedTags(tags);
  }, [tags]);

  const fetchTags = async () => {
    try {
      const response = await getTags();
      setOptions(
        response.data.map((tag) => ({ label: tag.name, value: tag.id }))
      );
    } catch (error) {
      console.error("Error fetching tags", error);
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
    if (event.key === "Enter" && inputValue) {
      console.log("here");
      const existingTag = options.find(
        (option) => option.label.toLowerCase() === inputValue.toLowerCase()
      );

      if (existingTag) {
        // Tag exists, select it
        setSelectedTags((prevSelectedTags) => [
          ...prevSelectedTags,
          existingTag,
        ]);
      } else {
        // Tag doesn't exist, create it through API
        const newTag = handleCreateTag(inputValue);
        setSelectedTags((prevSelectedTags) => [...prevSelectedTags, newTag]);
        setOptions([...options, newTag]);
      }
      setInputValue(""); // Reset input field
    }
  };

  // Function to create a new tag via an API call
  const handleCreateTag = async (tagName) => {
    try {
      const response = await createTag({ name: tagName }); // Call API to create new tag
      return { label: response.data.name, value: response.data.id }; // Return the new tag object
    } catch (error) {
      console.error("Error creating new tag", error);
    }
  };

  const customFilter = (option, inputValue) => {
    console.log("first" + option.label);
    console.log(inputValue);
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
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

  return (
    <div>
      <CreatableSelect
        styles={customStyles}
        isMulti
        createOptionPosition="first"
        value={selectedTags}
        options={options}
        onInputChange={handleInputChange}
        onChange={handleChange}
        inputValue={inputValue}
        onKeyDown={handleKeyDown}
        placeholder="Search or create tags..."
        noOptionsMessage={() => "No tags found"}
        filterOption={customFilter}
      />
    </div>
  );
};

export default CreateTag;
