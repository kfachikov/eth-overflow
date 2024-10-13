import { useNavigate, useParams } from "react-router-dom";
import "./QuestionView.css";
import { getQuestionAndAnswers } from "../services/questionService";
import { useContext, useState } from "react";
import { useEffect } from "react";
import PostCard from "../Components/PostCard/PostCard";
import PostModel from "../Models/PostModel";
import Button, { ButtonSize } from "../Components/Button";
import MarkdownIt from "markdown-it";
import markdownItKatex from "markdown-it-katex"; // For rendering TeX formulas
import "katex/dist/katex.min.css"; // Import Katex CSS
import { accountContext } from "../contexts/userContext";
import { selectBestAnswer } from "../services/questionService";
import { postAnswer } from "../services/answerService";

function QuestionView() {
  const { account } = useContext(accountContext);
  const { questionId } = useParams();

  const onAnswerDelete = () => {
      refreshData()
  }

  useEffect(() => {
      console.log(questionId);
      console.log(account);
      setLoading(true);
      getQuestionAndAnswers(questionId).then((response) => {
          console.log(response.data)
          let question = new PostModel()
          question.parsePostFromJSON({...response.data, isQuestion: true, isBestAnswer: false});
          console.log(question)
          
          let answers = response.data.answers.map((answer) => {
              let answerModel = new PostModel()
              let isBestAnswer = answer.id === response.data.selectedAnswerId;
              answerModel.parsePostFromJSON({
                  ...answer,
                  tags: [],
                  isQuestion: false, 
                  isBestAnswer: isBestAnswer}
              );
              return answerModel;
          });

          setAnswers(answers);
          setQuestion(question);
          setLoading(false);
      });
  
    }, []);
    
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [bestAnswerId, setBestAnswerId] = useState(null);
  const [showCreateAnswer, setShowCreateAnswer] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const mdParser = new MarkdownIt().use(markdownItKatex);

  const updateBestAnswer = (answerId) => {
    let selectedAnswerId = null;
    if (answerId !== bestAnswerId) {
      selectedAnswerId = answerId;
    }

    selectBestAnswer(questionId, selectedAnswerId);
    setBestAnswerId(selectedAnswerId);
    setTimeout(refreshData, 10);
  };

  const refreshData = () => {
    console.log(questionId);
    console.log(account);
    setLoading(true);
    getQuestionAndAnswers(questionId).then((response) => {
      if (!response.data)
          return;
      console.log(response.data);
      let question = new PostModel();
      question.parsePostFromJSON({
        ...response.data,
        isQuestion: true,
        isBestAnswer: false,
      });

      let answers = response.data.answers.map((answer) => {
        let answerModel = new PostModel();
        let isBestAnswer = answer.id === response.data.selectedAnswerId;
        answerModel.parsePostFromJSON({
          ...answer,
          tags: [],
          isQuestion: false,
          isBestAnswer: isBestAnswer,
        });
        if (isBestAnswer) {
          setBestAnswerId(answerModel.postId);
        }
        return answerModel;
      });

      setAnswers(answers);
      setQuestion(question);
      setLoading(false);
    });
  };

  useEffect(() => {}, [bestAnswerId]);

  useEffect(() => refreshData, []);

  function compareAnswers(a, b) {
    if (a.postId == bestAnswerId) {
      return -1;
    }
    if (b.postId == bestAnswerId) {
      return 1;
    }
    if (a.votes < b.votes) {
      return 1;
    }
    if (a.votes > b.votes) {
      return -1;
    }
    return 0;
  }

  const handleCreateAnswer = () => {
    // noice animation???
    setShowCreateAnswer(!showCreateAnswer);
  };

  const handleSubmitAnswer = async () => {
    await postAnswer(questionId, editorContent);
    setEditorContent(""); // clear the editor
    setShowCreateAnswer(false); // fold the editor back
    refreshData(); // refresh website
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <PostCard
          post={question}
          thisVote={question.thisVote}
          isBestAnswer={false}
          userIsQuestionAuthor={false}
          userIsThisAuthor={account.id === question.authorId}
          updateBestAnswer={() => {}}
        />

        <div className={showCreateAnswer ? "hide" : "show"}>
          <Button
            onClick={handleCreateAnswer}
            text="Answer Question"
            ButtonSize={ButtonSize.MEDIUM}
          ></Button>
        </div>

        <div className={showCreateAnswer ? "show" : "hide"}>
          <div className="editor-container">
            <div className="editor-group">
              <textarea
                className="input-field"
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                placeholder="Write your answer here.&#10;&#8204;&#10;&#8204;&#10;Markdown and Latex supported.&#10;&#8204;&#10;&#8204;&#10;Preview on the right."
              ></textarea>
            </div>
            <div className="editor-group">
              <div
                className="input-preview"
                dangerouslySetInnerHTML={{
                  __html: mdParser.render(editorContent),
                }}
              ></div>
            </div>
          </div>
          <div className="button-container">
            <Button
              onClick={handleCreateAnswer}
              text="Discard Answer"
              ButtonSize={ButtonSize.LARGE}
              isDelete={true}
            ></Button>
            <Button
              onClick={handleSubmitAnswer}
              text="Submit Answer"
              ButtonSize={ButtonSize.LARGE}
            ></Button>
          </div>
        </div>

        {answers.length === 0 ? <h4>There are still no answers to this question</h4> : <h4>Answers:</h4>}
        {answers.sort(compareAnswers).map((answer, index) => (
          <PostCard
            key={index}
            post={answer}
            thisVote={answer.thisVote}
            isBestAnswer={answer.postId === bestAnswerId}
            userIsQuestionAuthor={account.id === question.authorId}
            userIsThisAuthor={account.id === answer.authorId}
            updateBestAnswer={() => updateBestAnswer(answer.postId)}
            parentQuestionId={questionId}
            refreshParent={refreshData}
            onAnswerDelete={onAnswerDelete}>
          ></PostCard>
        ))}
      </>
    );
  }
}
export default QuestionView;
