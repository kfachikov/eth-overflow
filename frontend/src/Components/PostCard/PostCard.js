import React, { useContext,useEffect, useState } from "react";
import VoteButton from "../VoteButton/VoteButton";
import "./PostCard.css";
import { voteQuestion } from "../../services/questionService";
import { deleteAnswer, voteAnswer } from "../../services/answerService";
import {accountContext} from "../../contexts/userContext";
import "./PostCard.css";
import { useNavigate } from "react-router-dom";

import { deleteQuestion } from '../../services/questionService';

import MarkdownIt from "markdown-it";
import markdownItKatex from "markdown-it-katex"; // For rendering TeX formulas
import "katex/dist/katex.min.css"; // Import Katex CSS

const Vote = Object.freeze({
  UPVOTE: 1,
  NEUTRAL: 0,
  DOWNVOTE: -1,
});

const formatDate = (str) => str.replace(
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).*$/,
  '$1-$2-$3 $4:$5'
);

const PostCard = (props) => {
  const { post, thisVote, isCollapsed, userIsQuestionAuthor, userIsThisAuthor, onAnswerDelete } = props;
  const navigate = useNavigate();

  const [voteState, setVoteState] = useState(thisVote);
  const [isBestAnswer, setIsBestAnswer] = useState(post.isBestAnswer || false);
  const [score, setScore] = useState(post.score);

  const mdParser = new MarkdownIt().use(markdownItKatex);

  const handleVote = (vote) => {
    setVoteState(vote);
  };

  const handleSelectBest = () => {
    setIsBestAnswer(!isBestAnswer);
  };

  useEffect(() => {
    if (voteState === undefined) return;

    if (post.isQuestion) {
      voteQuestion(post.postId, voteState).then((response) => {
        setScore(response.data.score);
      });
    } else {
      voteAnswer(post.postId, voteState).then((response) => {
        setScore(response.data.score)
      });
    }
  }, [voteState]);

  const handleDelete = () => {
    if (post.isQuestion) {
      deleteQuestion(post.postId).then(() => {
        navigate('/home');
      }).catch((error) => {
        alert("Failed to delete the question!");
      }); 
    } else {
      deleteAnswer(post.postId).then(() => {
        onAnswerDelete(post.postId);
      }).catch((error) => {
        alert("Failed to delete the answer!");
      });
    }
  }
  return (
    <div
      className={
        "post-card" +
        (post.isQuestion ? " question" : " answer") +
        (isBestAnswer ? " selected-answer-card" : "")
      }
    >
      <div className="vote-buttons">
        <VoteButton
          isUpvote={true}
          onClick={() =>
            handleVote(voteState !== Vote.UPVOTE ? Vote.UPVOTE : Vote.NEUTRAL)
          }
          isClicked={voteState === Vote.UPVOTE} // Active if upvoted
        />
        <div className="score">{score}</div>
        <VoteButton
          isUpvote={false}
          onClick={() =>
            handleVote(
              voteState !== Vote.DOWNVOTE ? Vote.DOWNVOTE : Vote.NEUTRAL
            )
          }
          isClicked={voteState === Vote.DOWNVOTE} // Active if downvoted
        />
        {userIsQuestionAuthor ? (
            isBestAnswer
              ? <div onClick={handleSelectBest} className="selected-checkmark enabled">✔</div>
              : <div onClick={handleSelectBest} className="unselected-checkmark enabled">✔</div>
          ) : (
            isBestAnswer
              ? <div className="selected-checkmark">✔</div>
              : null
          ) 
        }
      </div>

      <div className="post-body">
        {post.isQuestion ? <h3 className="post-title">{post.title}</h3> : <></>}
        {post.isQuestion && isCollapsed ? (
          <p
            className="collapsed-content"
            dangerouslySetInnerHTML={{ __html: mdParser.render(post.content) }}
          ></p>
        ) : null}
        {!(post.isQuestion && isCollapsed) ? (
          <p
            className="post-content"
            dangerouslySetInnerHTML={{ __html: mdParser.render(post.content) }}
          ></p>
        ) : null}
        <div className="post-info">
          <span className="tags-box">
            {post.tags.map((tag, index) => (
              <span onClick={()=>navigate('/home', {label:tag.name, value: tag.id})} key={index} className="tag">
                {tag.name}
              </span>
            ))}
          </span>

          <div>
            <span className="username">{post.username}</span>
            <span className="timestamp">{formatDate(post.timestamp)}</span>
          </div>
        </div>
        {userIsThisAuthor ? 
          <div className="author-panel">
              <span className="edit-link">Edit</span>
              <span className="delete-link" onClick={handleDelete}>Delete</span>
          </div> : null
        }
      </div>
    </div>
  );
};

export default PostCard;
export { Vote };
