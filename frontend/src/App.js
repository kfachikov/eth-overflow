import './App.css';

import {Routes, Route} from "react-router-dom";
import Login from "./Login/Login";
import NewPost from "./NewPost/NewPost";
import Question from "./Question/Question";
import UserProfile from "./UserProfile/UserProfile";
import HomePage from './Home/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/question/:question_id" element={<Question />} />
        <Route path="/userprofile/:username" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
