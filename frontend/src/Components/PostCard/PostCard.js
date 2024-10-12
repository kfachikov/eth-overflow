import React, { useState } from 'react';
import VoteButton from '../VoteButton/VoteButton';
import './PostCard.css';
import Button from '../Button';
import { ButtonSize } from '../Button';

const Vote = Object.freeze({
  UPVOTE: 1,
  NEUTRAL: 0,
  DOWNVOTE: -1
})

const PostCard = (props) => {
  const { post, thisVote, isCollapsed } = props;
  
  console.log(post.score)
  const [voteState, setVoteState] = useState(thisVote);
  const [isBestAnswer, setIsBestAnswer] = useState(post.isBestAnswer);
  const [score, setScore] = useState(post.score)

  const handleVote = (vote) => {
    const voteDelta = vote - voteState
    setScore(score + voteDelta)
    setVoteState(vote);
  };

  const handleSelectBest = () => {
    setIsBestAnswer(!isBestAnswer);
  }

  return (
    <div className={"post-card" + (isBestAnswer ? " selected-answer-card" : "")}>
      <div className="vote-buttons">
        <VoteButton
          isUpvote={true}
          onClick={() => handleVote(voteState !== Vote.UPVOTE ? Vote.UPVOTE : Vote.NEUTRAL)}
          isClicked={voteState === Vote.UPVOTE} // Active if upvoted
        />
        <div>{score}</div>
        <VoteButton
          isUpvote={false}
          onClick={() => handleVote(voteState !== Vote.DOWNVOTE ? Vote.DOWNVOTE : Vote.NEUTRAL)}
          isClicked={voteState === Vote.DOWNVOTE} // Active if downvoted
        />
        {isBestAnswer ? 
          <div onClick={handleSelectBest} className="selected-checkmark">✔</div> : 
          <div onClick={handleSelectBest} className="unselected-checkmark">✔</div>
        }
      </div>

      <div className="post-body">
        {post.isQuestion ? 
          <h3 className='post-title'>{post.title}</h3>: <></>}
        {post.isQuestion && isCollapsed ? 
          <p className='collapsed-content'>{post.content}</p> : null}
        {!(post.isQuestion && isCollapsed) ?
          <p className='post-content'>{post.content}</p> : null}
        <div className="post-info">
          <span className="tags-box">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">{tag.name}</span>
            ))}
          </span>
          
          <div>
            <span className="username">{post.username}</span>
            <span className="timestamp">{post.timestamp}</span>
          </div>
        </div>
        <div className="author-panel">
            <span className="edit-link">Edit</span>
            <span className="delete-link">Delete</span>
          </div>
      </div>
    </div>
  );
};

export default PostCard;
export { Vote };