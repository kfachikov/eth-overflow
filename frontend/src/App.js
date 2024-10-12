import React, {useEffect, useState} from 'react';
import './App.css';

import {Routes, Route} from "react-router-dom";
import Login from "./Login/Login";
import NewPost from "./NewPost/NewPost";
import Question from "./Question/Question";
import UserProfile from "./UserProfile/UserProfile";
import HomePage from './Home/Home';

import { accountContext } from './contexts/userContext';
import httpService from './services/httpService';

function App() {

  const [account, setAccount] = useState(null)

  useEffect(() =>{
    httpService.get('/user/me').then(response =>{
        setAccount(response.data)
    }
  )}, [])

  return (
    <>
      <accountContext.Provider value={{ account }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/question/:question_id" element={<Question />} />
          <Route path="/userprofile/:username" element={<UserProfile />} />
        </Routes>
      </accountContext.Provider>
    </>
  );
}

export default App;
