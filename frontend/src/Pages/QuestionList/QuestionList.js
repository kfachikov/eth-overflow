import React, { useState, useEffect } from 'react';
import PostCard from '../../Components/PostCard/PostCard'; // Assuming PostCard is already built
import PostModel from '../../Models/PostModel'; // Assuming PostModel is already built
import './QuestionList.css';

import { getQuestions } from '../../services/questionService';
import { Vote } from '../../Components/PostModel';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]); // Store the questions
  const [loading, setLoading] = useState(true);   // Loading state
  const [offset, setOffset] = useState(0);        // Track the offset for pagination
  const pageSize = 10;                            // Page size (always 10)

  // Function to fetch questions from API
  const fetchQuestions = async (offset, pageSize) => {
    setLoading(true);
    try {
      const data = getQuestions(offset, pageSize);
      setQuestions(data); // Assuming API returns an array of questions
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
    setLoading(false);
  };

  // Fetch questions when the component mounts or the offset changes
  useEffect(() => {
    fetchQuestions(offset, pageSize);
  }, [offset]);

  // Handle Next Page
  const handleNext = () => {
    setOffset(offset + pageSize);
  };

  // Handle Previous Page
  const handlePrevious = () => {
    if (offset > 0) {
      setOffset(offset - pageSize);
    }
  };

  return (
    <div className="question-list-page">
      <h1>Questions</h1>
      {loading ? (
        <p>Loading...</p> // Show loading state
      ) : (
        <>
          {/* Render the Question Cards */}
          {questions.map((question) => (
            <PostCard post={PostModel.parsePostFromJSON(questionJSON)} isCollapsed={true} thisVote={Vote.NEUTRAL}/>
          ))}

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={handlePrevious} disabled={offset === 0}>
              Previous
            </button>
            <button onClick={handleNext} disabled={questions.length < pageSize}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionList;
