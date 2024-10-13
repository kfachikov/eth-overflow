<<<<<<< Updated upstream








import './App.css';
=======
import React, { useEffect, useState } from "react";
import {Routes, Route, Navigate} from "react-router-dom";


import Login from "./Login/Login";
import NewPost from "./NewPost/NewPost";
import QuestionView from "./QuestionView/QuestionView";
import UserProfile from "./UserProfile/UserProfile";
import HomePage from "./Home/Home";
import Header from './Header/Header';
>>>>>>> Stashed changes

import { accountContext } from "./contexts/userContext";
import httpService from "./services/httpService";

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    httpService.get("/user/me").then((response) => {
      setAccount(response.data);
    });
  }, []);

  return (
    <>
      <accountContext.Provider value={{ account }}>
        <Header/>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/newpost" element={<NewPost />} />
<<<<<<< Updated upstream
          <Route path="/question/create" element={<NewPost />} />
=======
>>>>>>> Stashed changes
          <Route path="/question/:questionId" element={<QuestionView />} />
          <Route path="/userprofile/:username" element={<UserProfile />} />
        </Routes>
      </accountContext.Provider>
    </>
  );
}

export default App;
