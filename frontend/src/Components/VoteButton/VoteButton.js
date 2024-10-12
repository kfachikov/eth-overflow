import React from 'react';
import './VoteButton.css'; // Optional for styling if not using inline CSS

const VoteButton = ({ isUpvote, onClick }) => {
  const [clicked, setClicked] = React.useState(false);
  const handleClick = () => {
    setClicked(!clicked);
    
    if (onClick) {
        onClick(isUpvote, clicked); // Invoke the function with the boolean state
    }
  };

  return (
    <div
      className={`triangle ${isUpvote ? 'up' : 'down'} ${clicked ? 'active' : ''}`}
      onClick={handleClick}
    />
  );
};

export default VoteButton;
