import { useNavigate, useParams } from "react-router-dom";
import "./QuestionView.css";
import { getQuestionAndAnswers } from "../services/questionService";
import { useState } from "react";
import { useEffect } from "react";
import PostCard from "../Components/PostCard/PostCard";
import PostModel from "../Models/PostModel";

function QuestionView() {
    const {questionId} = useParams();

    const [loading, setLoading] = useState(true);
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        console.log(questionId);
        setLoading(true);
        getQuestionAndAnswers(questionId).then((response) => {
            let question = new PostModel()
            question.parsePostFromJSON({...response.data, isQuestion: true, isBestAnswer: false});
            console.log(question)
            
            let answers = response.data.answers.map((answer) => {
                let answerModel = new PostModel()
                let isBestAnswer = answer.id === response.data.bestAnswerId
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
    
    if (loading) {
        return <div>Loading...</div>
    } else {
        return <>
            <PostCard post={question} thisVote={false} />
            {answers.map((answer) => <PostCard post={answer} thisVote={false} />)}
        </>
    }
    
}
export default QuestionView;