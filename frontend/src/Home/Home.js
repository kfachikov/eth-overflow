import React, { useState, useEffect } from 'react';
import SearchBar from '../Components/SearchBar/SearchBar';  // Import your SearchBar component
import QuestionCard from '../Components/QuestionCard/QuestionCard';  // Import your QuestionCard component
import ToggleOptions from '../Components/ToggleOptions/ToggleOptions';  // Import your ToggleOptions component
import { getQuestions } from '../services/questionService';  // Import your API function
import './Home.css';

const HomePage = () => {
  const [questions, setQuestions] = useState([]); // Store the list of questions
  const [searchTerm, setSearchTerm] = useState(''); // Track search term
  const [loading, setLoading] = useState(true); // Loading state
  const [offset, setOffset] = useState(0); // For pagination
  const pageSize = 10; // Page size

  useEffect(() => {
    setLoading(true);
    getQuestions(searchTerm, offset, pageSize).then((response) => {
      setQuestions(response.data);
      setLoading(false);
    });
  }, [offset, searchTerm]);

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

  return (
    <div className="home-page">
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      <ToggleOptions
        options={['Newest', 'Hot']}
      ></ToggleOptions>

      {/* Create Question Button */}
      <div className="create-question">
        <button onClick={handleCreateQuestion}>Create Question</button>
      </div>

      {/* Question List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="question-list">
          {questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard key={question.id} data={question} />
            ))
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
