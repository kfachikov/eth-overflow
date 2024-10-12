import React, { useState, useEffect } from 'react';
import SearchBar from '../Components/SearchBar/SearchBar';  // Import your SearchBar component
import SearchTag from '../Components/SearchTag/SearchTag';  // Import your TagSearch component
import PostCard from '../Components/PostCard/PostCard';
import ToggleOptions from '../Components/ToggleOptions/ToggleOptions';  // Import your ToggleOptions component
import { getQuestions } from '../services/questionService';  // Import your API function
import { parsePostFromJSON } from '../Models/PostModel';  // Import your parse function
import './Home.css';
import Button, {ButtonSize} from '../Components/Button';

const HomePage = () => {
  const [questions, setQuestions] = useState([]); // Store the list of questions
  const [searchTerm, setSearchTerm] = useState(''); // Track search term
    const [order, setOrder] = useState('createdAt');
  const [tags, setTags] = useState([]); // Track selected tags
  const [loading, setLoading] = useState(true); // Loading state
  const [offset, setOffset] = useState(0); // For pagination
  const pageSize = 10; // Page size

  useEffect(() => {
    setLoading(true);
    getQuestions(searchTerm, tags, offset, pageSize, order).then((response) => {
      setQuestions(response.data);
      setLoading(false);
    });

  }, [offset, searchTerm, tags, order]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Pagination handlers
  const handleNext = () => setOffset(offset + pageSize);
  const handlePrevious = () => setOffset(offset > 0 ? offset - pageSize : 0);

  // Handle Create Question click
  const handleCreateQuestion = () => {
    // This would navigate to a new page or open a modal
    console.log('Create Question button clicked!');
  };

  const handleTagsChange = (tags) => {
    setTags(tags.map(tag => tag.label));
  };

  return (
    <div className="home-page">
      {/* Search Bar */}

      <div className="searchBar gridbox">
        <SearchBar onSearch={handleSearch}/>
      </div>

      <div className="Bars">
        <SearchTag onChange={handleTagsChange}/>
      </div>

      <div className = "sortToggle gridbox">
        <ToggleOptions
          options={['Newest', 'Hot']}
          onToggle={(val) => {
              const newOrder = val === "Newest" ? "createdAt" : "score"
              setOrder(newOrder);
          }}
        ></ToggleOptions>
      </div>

      <div className = "answeredToggle gridbox">
        <ToggleOptions
          options={['Unanswered', 'Answered', 'Solved']}
        ></ToggleOptions>
      </div>

      {/* Create Question Button */}
      <div className="create-question gridbox">
        <button onClick={handleCreateQuestion} className="gridbox createButton">Create Question</button>
      </div>

      {/* Question List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="question-list">
          {questions.length > 0 ? (
            questions.map((question) => {
              return (
                <PostCard key={question.id} post={parsePostFromJSON({...question, isQuestion: true, isBestAnswer: false })} />
              );
            })
          ) : (
            <p>No questions found.</p>
          )}

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={handlePrevious} disabled={offset === 0}>Previous</button>
            <button onClick={handleNext} disabled={questions.length < pageSize}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
