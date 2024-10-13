import React, { useEffect, useState } from "react";
import VoteButton from "../VoteButton/VoteButton";
import "./PostCard.css";
import { deleteAnswer } from "../../services/answerService";
import "./PostCard.css";
import {createCommentQuestion, getQuestionAndAnswers, voteQuestion} from "../../services/questionService";
import {createCommentAnswer, getComments, voteAnswer } from "../../services/answerService";
import { useNavigate } from "react-router-dom";
import { ButtonSize } from "../Button";
import Button from "../Button";
import { editAnswer } from "../../services/answerService";

import "../../QuestionView/QuestionView.css";

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
  const {
    post,
    thisVote,
    isCollapsed,
    isBestAnswer,
    userIsQuestionAuthor,
    userIsThisAuthor,
    updateBestAnswer,
    parentQuestionId,
    refreshParent,
    onAnswerDelete
  } = props;
  const navigate = useNavigate();

  const [voteState, setVoteState] = useState(thisVote);
  const [score, setScore] = useState(post.score);
  const [editBoxVisibility, setEditBoxVisibility] = useState(false);
  const [editBoxContent, setEditBoxContent] = useState(post.content);
  const [comments, setComments] = useState(post.comments);

  const mdParser = new MarkdownIt().use(markdownItKatex);

  const handleVote = (vote) => {
    setVoteState(vote);
  };

  const handleSelectBest = () => {
    updateBestAnswer();
  };

  useEffect(() => {
    if (voteState === undefined) return;

    if (post.isQuestion) {
      voteQuestion(post.postId, voteState).then((response) => {
        setScore(response.data.score);
      });
    } else {
      voteAnswer(post.postId, voteState).then((response) => {
        setScore(response.data.score);
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
      deleteAnswer(parentQuestionId, post.postId).then(() => {
        onAnswerDelete(post.postId);
      }).catch((error) => {
        alert("Failed to delete the answer!");
      });
    }
  };

  const handleUpdate = (shouldBeOn) => {
    if (post.isQuestion) {
      navigate(`/question/${post.postId}/edit`, { state: JSON.stringify(post) });
    } else {
      setEditBoxVisibility(shouldBeOn);
    }
  };

  const handleEditAnswer = () => {
    editAnswer(parentQuestionId, post.postId, editBoxContent);
    setEditBoxVisibility(false);
    refreshParent();
  };

  const handleDiscardChanges = () => {
    setEditBoxVisibility(false);
  }
  
  const [comment, setComment] = useState(''); // State to hold comment input

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      // If comment is not empty or only spaces
      if (post.isQuestion) {
        createCommentQuestion(post.postId, comment).then(() => {
          setComment('');

          getQuestionAndAnswers(post.postId).then((response) => {
            setComments(response.data.comments);
          })
        })
      } else {
        createCommentAnswer(post.postId, comment).then(() => {
          setComment('');

          getComments(post.postId).then((response) => {
            setComments(response.data);
          })
        })
      }
    }
  };

  const renderComments = () => {
    if (comments.length === 0) {
      return <span className="small-p">No comments yet.</span>
    } else {
      return comments.map((comment, index) => (
          <div key={index} className="comment">
            <div className='comment-info'>
              <span className="comment-username">{comment.author.username}</span>
              <span className="comment-timestamp">{formatDate(comment.createdAt)}</span>
            </div>
            <div className="comment-content">{comment.content}</div>
          </div>
      ));
    }
  };


  return (
    <>
    <div
      className={
        "post-card" +
        (post.isQuestion ? " question" : " answer") +
        (isBestAnswer ? " selected-answer-card" : "")
      }
    >
      <div className="post-card-body">
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
        <div 
          onClick={isCollapsed ? () => navigate('/question/' + post.postId) : () => {}}
          className={"post-body" + (isCollapsed ? " clickable-question" : "")}
        >
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
              <span className="edit-link" onClick={() => handleUpdate(true)}>Edit</span>
              <span className="delete-link" onClick={handleDelete}>Delete</span>
          </div> : null
        }
      </div>
    </div>
    {!isCollapsed ?
      <div className="post-comments">
          {/* Render Comments Section */}
          {!isCollapsed && (
              <div className="comments-section">
                <span className="small=p"><b>Comments</b></span>
                {renderComments()}
                {(
                    <div className='post-comment-area'>
                      <textarea
                          placeholder="Add a comment..."
                          value={comment} // Controlled input
                          onChange={(e) => setComment(e.target.value)}
                      />
                      <Button onClick={handleCommentSubmit} text="Post Comment" size={ButtonSize.SMALL}></Button>
                    </div>
                )}
              </div>
          )}
        </div> : null
      }
    {editBoxVisibility ?
      <div>
        <h5>Edit answer:</h5>
        <div className="editor-container">
          <div className="editor-group">
              <textarea
              className="input-field"
              value={editBoxContent}
              onChange={(e) => setEditBoxContent(e.target.value)}
              placeholder="Write your answer here.&#10;&#8204;&#10;&#8204;&#10;Markdown and Latex supported.&#10;&#8204;&#10;&#8204;&#10;Preview on the right."
              ></textarea>
          </div>
          <div className="editor-group">
              <div
              className="input-preview"
              dangerouslySetInnerHTML={{
                  __html: mdParser.render(editBoxContent),
              }}
              ></div>
          </div>
        </div>
        <div className="button-container">
          <Button
              onClick={handleDiscardChanges}
              text="Discard Changes"
              ButtonSize={ButtonSize.SMALL}
              isDelete={true}
          ></Button>
          <Button
              onClick={handleEditAnswer}
              text="Submit Changes"
              ButtonSize={ButtonSize.SMALL}
          ></Button>
        </div>
    </div> : null}
  </div>
  </>
  );
}

export default PostCard;
export { Vote };
