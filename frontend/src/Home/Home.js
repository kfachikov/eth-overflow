import React, { useState, useEffect } from 'react';
import SearchBar from '../Components/SearchBar/SearchBar';  // Import your SearchBar component
import QuestionCard from '../Components/QuestionCard/QuestionCard';  // Import your QuestionCard component
import ToggleOptions from '../Components/ToggleOptions/ToggleOptions';  // Import your ToggleOptions component
import './Home.css';

const HomePage = () => {
  const [questions, setQuestions] = useState([]); // Store the list of questions
  const [filteredQuestions, setFilteredQuestions] = useState([]); // For filtered results
  const [searchTerm, setSearchTerm] = useState(''); // Track search term
  const [loading, setLoading] = useState(true); // Loading state
  const [offset, setOffset] = useState(0); // For pagination
  const pageSize = 10; // Page size

  // Simulated questions data
  const allQuestions = [
    { id: 1, title: "How does React manage state?", content: "React uses state...", username: "john_doe", timestamp: "2 hours ago" },
    { id: 2, title: "What is the virtual DOM?", content: "The virtual DOM...", username: "jane_smith", timestamp: "1 hour ago" },
    // Add more questions here...
  ];

  // Fetch questions (simulating API call)
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const paginatedQuestions = allQuestions.slice(offset, offset + pageSize); // Paginate
      setQuestions(paginatedQuestions);
      setFilteredQuestions(paginatedQuestions); // Initially, no filter
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, [offset]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = questions.filter((q) => q.title.toLowerCase().includes(term.toLowerCase()));
    setFilteredQuestions(filtered);
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
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <QuestionCard key={question.id} data={question} />
            ))
          ) : (
            <p>No questions found.</p>
          )}

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={handlePrevious} disabled={offset === 0}>Previous</button>
            <button onClick={handleNext} disabled={filteredQuestions.length < pageSize}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
