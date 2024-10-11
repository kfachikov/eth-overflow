import './App.css';

import {Routes, Route} from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import NewPost from "./NewPost/NewPost";
import Question from "./Question/Question";
import UserProfile from "./UserProfile/UserProfile";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/question/:question_id" element={<Question />} />
        <Route path="/userprofile/:username" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
