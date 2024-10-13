import { useNavigate, useParams } from "react-router-dom";
import "./QuestionView.css";
import { getQuestionAndAnswers } from "../services/questionService";
import { useContext, useState } from "react";
import { useEffect } from "react";
import PostCard from "../Components/PostCard/PostCard";
import PostModel from "../Models/PostModel";
import { accountContext } from "../contexts/userContext";

function QuestionView() {
    const {questionId} = useParams();
    const {account} = useContext(accountContext);
    const [loading, setLoading] = useState(true);
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);

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
    
    if (loading) {
        return <div>Loading...</div>
    } else {
        return <>
            <PostCard 
                post={question}
                thisVote={false}
                userIsQuestionAuthor={false} 
                userIsThisAuthor={account.id === question.authorId}
            />
            {answers.map((answer, index) =>
                <PostCard 
                    key={index} 
                    post={answer} 
                    thisVote={false} 
                    userIsQuestionAuthor={account.id === question.authorId}
                    userIsThisAuthor={account.id === answer.authorId}>
                </PostCard>
            )}
        </>
    }
    
}
export default QuestionView;