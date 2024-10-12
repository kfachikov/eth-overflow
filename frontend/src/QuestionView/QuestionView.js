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
            var question = new PostModel()
            question.parsePostFromJSON({...response.data, isQuestion: true, isBestAnswer: false});
            console.log(question)

            setQuestion(question);
            setLoading(false);
        });
    
      }, []);
    
    if (loading) {
        return <div>Loading...</div>
    } else {
        return <PostCard post={question} thisVote={false} />
    }
    
}
export default QuestionView;