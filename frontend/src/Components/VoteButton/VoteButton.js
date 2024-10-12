import React from 'react';
import './VoteButton.css';

const VoteButton = ({ isUpvote, onClick, isClicked }) => {
  // No internal state for clicked status, rely on the isClicked prop
  const handleClick = () => {
    onClick(isUpvote);
  };

  return (
    <div
      className={`triangle ${isUpvote ? 'up' : 'down'} ${isClicked ? 'active' : ''}`}
      onClick={handleClick}
    />
  );
};

export default VoteButton;
