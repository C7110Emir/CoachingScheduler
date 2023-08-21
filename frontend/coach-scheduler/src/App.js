
import axios from "axios";
import Login from "./pages/Login";
import Home from "./pages/Home";
import React, { useState } from "react";

function App() {
  const [userData, setUserData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [renderValue, setRenderValue] = useState();

  const handleStudentSubmit = async (email, password, value) => {
    console.log(email, password);
    const body = JSON.stringify({ email: email, password: password });
    await axios.post("/student/auth", { body })
    .then(res => res.data)
    .then((data) => {
      setRenderValue(value)
      setIsLoggedIn(true)
      setUserData(data)
    })
  };

  const handleCoachSubmit = async (email, password, value) => {
    const body = JSON.stringify({ email: email, password: password });
    await axios.post("/coach/auth", { body })
    .then(res => res.data)
    .then((data) => {
      setRenderValue(value)
      setIsLoggedIn(true)
      setUserData(data)
    })
    .catch(e => console.log(e)) 
  };
  return (
    <>
      {isLoggedIn ? (
        <Home userdata={userData} renderValue={renderValue} />
      ) : (
        <Login
          handleCoachSubmit={handleCoachSubmit}
          handleStudentSubmit={handleStudentSubmit}
        />
      )}
    </>
  );
}

export default App;
