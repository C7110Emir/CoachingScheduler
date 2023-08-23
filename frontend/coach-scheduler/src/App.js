
import axios from "axios";
import Login from "./pages/Login";
import Home from "./pages/Home";
import React, { useState } from "react";

function App() {
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [renderValue, setRenderValue] = useState();
  const [error, setError] = useState(null);
  
  const userLogIn = async (email, password, value, url) => {
    const body = JSON.stringify({ email: email, password: password });
    console.log(value, 213412412412412546132512)
    try {
      const fetchData = await axios.post(`/${url}/auth`, { body })
      setUserEmail(email)
      setUserPassword(password)
      setRenderValue(value)
      setIsLoggedIn(true)
    } catch (e) {
      console.log(e, 1241241241)
      setError(e.message)
    }
  };
  

  const handleStudentSubmit = async (email, password, value) => {
    console.log("usingStudentHandle")
    console.log(email, password);
    userLogIn(email,password,value, "student")
  };

  const handleCoachSubmit = (email, password, value) => {
    console.log("usingCoachHandle")
    userLogIn(email, password, value, "coach")
  };
  const timeToLocal = (time) => {    
    // Create a Date object from the ISO string
    const timeIso = new Date(time);
    
    // Define the target timezone
    const targetTimezone = "America/New_York"; // Change this to your desired timezone
    
    // Function to convert Date to a formatted ISO string in a specific timezone
    function convertToTimezone(date, timezone) {
      return date.toLocaleString("en-US", { timeZone: timezone, timeZoneName: "short" });
    }
    
    // Convert the original Date to the target timezone
    const returnTime = convertToTimezone(timeIso, targetTimezone);
    
    return returnTime
  }
  return (
    <>
      {error ? `Error happened on api call: ${error.message}` : null}
      {isLoggedIn ? (
        <Home userEmail={userEmail} timeToLocal={timeToLocal} userPassword={userPassword} renderValue={renderValue} />
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
