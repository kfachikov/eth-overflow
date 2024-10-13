import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import Login from "./Login/Login";
import NewPost from "./NewPost/NewPost";
import QuestionView from "./QuestionView/QuestionView";
import UserProfile from "./UserProfile/UserProfile";
import HomePage from "./Home/Home";
import Header from "./Header/Header";

import { accountContext } from "./contexts/userContext";
import httpService from "./services/httpService";

const throttle = (mainFunction, delay) => {
  let timerFlag = null; // Variable to keep track of the timer

  // Returning a throttled version 
  return (...args) => {
    if (timerFlag === null) { // If there is no timer currently running
      mainFunction(...args); // Execute the main function 
      timerFlag = setTimeout(() => { // Set a timer to clear the timerFlag after the specified delay
        timerFlag = null; // Clear the timerFlag to allow the main function to be executed again
      }, delay);
    }
  };
}

function App() {
  const [account, setAccount] = useState(null);
    
  // Function to fetch the user profile
  const fetchUserProfile = () => {
    httpService.get('/user/me').then(response => {
      setAccount(response.data);
    }).catch(error => {
      console.error("Error fetching user profile:", error);
    });
  };

  // UseEffect to fetch profile on user interaction
  useEffect(() => {
    // Initial fetch on mount
    fetchUserProfile();

    // Throttle the function to reduce API calls
    const throttledFetch = throttle(() => {
      fetchUserProfile();
    }, 15000); // Throttle to once every 15 seconds

    // Listen to user actions and trigger throttled profile fetch
    window.addEventListener('click', throttledFetch);
    // window.addEventListener('keypress', throttledFetch);
    // window.addEventListener('scroll', throttledFetch);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('click', throttledFetch);
      // window.removeEventListener('keypress', throttledFetch);
      // window.removeEventListener('scroll', throttledFetch);
    };
  }, []);

  return (
    <>
      <accountContext.Provider value={{ account }}>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/question/create" element={<NewPost />} />
          <Route path="/question/:questionId" element={<QuestionView />} />
          <Route path="/userprofile/:username" element={<UserProfile />} />
        </Routes>
      </accountContext.Provider>
    </>
  );
}

export default App;
