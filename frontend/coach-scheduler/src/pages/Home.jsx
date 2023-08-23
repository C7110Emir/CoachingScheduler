import React from "react";
import Coach from "./Coach";
import Student from "./Student";

const Home = ({ userEmail, userPassword, renderValue, timeToLocal }) => {
  return (
    <>
      {renderValue === "1" ? (
        <Student studentEmail={userEmail} timeToLocal={timeToLocal} studentPassword={userPassword}/>
      ) : (
        <Coach coachEmail={userEmail} timeToLocal={timeToLocal} coachPassword={userPassword}/>
      )}
    </>
  );
};

export default Home;


