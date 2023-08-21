import React from "react";
import Coach from "./Coach";
import Student from "./Student";

const Home = ({ userData, renderValue }) => {
  return (
    <>
    {console.log(userData)}
      {renderValue === 1 ? (
        <Student studentData={userData} />
      ) : (
        <Coach coachData={userData} />
      )}
    </>
  );
};

export default Home;
