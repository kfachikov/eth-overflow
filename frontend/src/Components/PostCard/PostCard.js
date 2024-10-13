import React, { useContext, useEffect, useState } from "react";
import VoteButton from "../VoteButton/VoteButton";
import { voteQuestion } from "../../services/questionService";
import { voteAnswer } from "../../services/answerService";
import { accountContext } from "../../contexts/userContext";
import "./PostCard.css";
import { useNavigate } from "react-router-dom";
import { editPost } from "../../services/postService";
import { ButtonSize } from "../Button";
import Button from "../Button";
import { editAnswer } from "../../services/answerService";
import "../../QuestionView/QuestionView.css";

import MarkdownIt from "markdown-it";
import markdownItKatex from "markdown-it-katex"; // For rendering TeX formulas
import "katex/dist/katex.min.css"; // Import Katex CSS

const Vote = Object.freeze({
  UPVOTE: 1,
  NEUTRAL: 0,
  DOWNVOTE: -1,
});

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
    refreshParent
  } = props;
  const navigate = useNavigate();

  const [voteState, setVoteState] = useState(thisVote);
  const [score, setScore] = useState(post.score);
  const [editBoxVisibility, setEditBoxVisibility] = useState(false);
  const [editBoxContent, setEditBoxContent] = useState(post.content);

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

  const toggleEdit = (shouldBeOn) => {
    if (!post.isQuestion) {
      setEditBoxVisibility(shouldBeOn);
    } else {
      // edit question
    }
  }

  const handleEditAnswer = () => {
    editAnswer(parentQuestionId, post.postId, editBoxContent);
    setEditBoxVisibility(false);
    refreshParent();
  };

  const handleDiscardChanges = () => {
    setEditBoxVisibility(false);
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
          isBestAnswer ? (
            <div
              onClick={handleSelectBest}
              className="selected-checkmark enabled"
            >
              ✔
            </div>
          ) : (
            <div
              onClick={handleSelectBest}
              className="unselected-checkmark enabled"
            >
              ✔
            </div>
          )
        ) : isBestAnswer ? (
          <div className="selected-checkmark">✔</div>
        ) : null}
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
              <span
                onClick={() =>
                  navigate("/home", { label: tag.name, value: tag.id })
                }
                key={index}
                className="tag"
              >
                {tag.name}
              </span>
            ))}
          </span>

          <div>
            <span className="username">{post.username}</span>
            <span className="timestamp">{post.timestamp}</span>
          </div>
        </div>
        {userIsThisAuthor ? (
          <div className="author-panel">
            <span onClick={() => toggleEdit(true)}className="edit-link">Edit</span>
            <span className="delete-link">Delete</span>
          </div>
        ) : null}
      </div>
    </div>
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
    </>
  );
};

export default PostCard;
export { Vote };
