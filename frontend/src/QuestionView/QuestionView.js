import { useNavigate, useParams } from "react-router-dom";
import "./QuestionView.css";
import { getQuestionAndAnswers } from "../services/questionService";
import { useState } from "react";
import { useEffect } from "react";
import PostCard from "../Components/PostCard/PostCard";
import PostModel from "../Models/PostModel";
import Button, { ButtonSize } from "../Components/Button";
import MarkdownIt from "markdown-it";
import markdownItKatex from "markdown-it-katex"; // For rendering TeX formulas
import "katex/dist/katex.min.css"; // Import Katex CSS

function QuestionView() {
  const { questionId } = useParams();

  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showCreateAnswer, setShowCreateAnswer] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const mdParser = new MarkdownIt().use(markdownItKatex);

  useEffect(() => {
    console.log(questionId);
    setLoading(true);
    getQuestionAndAnswers(questionId).then((response) => {
      let question = new PostModel();
      question.parsePostFromJSON({
        ...response.data,
        isQuestion: true,
        isBestAnswer: false,
      });
      console.log(question);

      let answers = response.data.answers.map((answer) => {
        let answerModel = new PostModel();
        let isBestAnswer = answer.id === response.data.bestAnswerId;
        answerModel.parsePostFromJSON({
          ...answer,
          tags: [],
          isQuestion: false,
          isBestAnswer: isBestAnswer,
        });
        return answerModel;
      });

      setAnswers(answers);
      setQuestion(question);
      setLoading(false);
    });
  }, []);

  const handleCreateAnswer = () => {
    // noice animation???
    setShowCreateAnswer(!showCreateAnswer);
  };

  const handleSubmitAnswer = () => {
    // TODO
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <PostCard post={question} thisVote={false} />
        {answers.map((answer) => (
          <PostCard post={answer} thisVote={false} />
        ))}
        <div className={showCreateAnswer ? "hide" : "show"}>
          <Button
            onClick={handleCreateAnswer}
            text="Create Answer"
            ButtonSize={ButtonSize.LARGE}
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
      </>
    );
  }
}
export default QuestionView;
