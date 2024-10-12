import React, { useState } from 'react';
import VoteButton from '../VoteButton/VoteButton';
import './QuestionCard.css';

const QuestionCard = ({ data }) => {
  const { title, content, username, timestamp } = data;

  // State to track voting: 1 for upvote, -1 for downvote, 0 for no vote
  const [voteState, setVoteState] = useState(0);

  const handleVote = (isUpvote) => {
    // Toggle between upvote, downvote, and neutral
    if (isUpvote) {
      setVoteState(voteState === 1 ? 0 : 1); // Toggle upvote (1 if upvoted, else neutral)
    } else {
      setVoteState(voteState === -1 ? 0 : -1); // Toggle downvote (-1 if downvoted, else neutral)
    }

    // TODO: Call an API to update the vote status
  };

  return (
    <div className="question-card">
      {/* Question Title */}
      <h3 className="question-title">{title}</h3>

      {/* Question Content (limited to 3 lines) */}
      <p className="question-content">{content}</p>

      {/* User Info and Timestamp */}
      <div className="question-info">
        <span className="username">{username}</span>
        <span className="timestamp">{timestamp}</span>
      </div>

      {/* Upvote and Downvote Buttons */}
      <div className="vote-buttons">
        <VoteButton
          isUpvote={true}
          onClick={handleVote}
          isClicked={voteState === 1} // Active if upvoted
        />
        <VoteButton
          isUpvote={false}
          onClick={handleVote}
          isClicked={voteState === -1} // Active if downvoted
        />
      </div>
    </div>
  );
};

export default QuestionCard;
