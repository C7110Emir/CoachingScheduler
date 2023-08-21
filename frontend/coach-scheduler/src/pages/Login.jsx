import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import "./styles/loginStyle.css";

const Login = ({ handleCoachSubmit, handleStudentSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Student Login" value="1" />
            <Tab label="Coach Login" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TextField
            id="standard-basic"
            label="Student Email"
            className="studentEmail"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Student Password"
            className="studentPassword"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button
            variant="outlined"
            onClick={() => handleStudentSubmit(email, password, value)}
            className="loginButton"
            fullWidth={true}
          >
            Log In
          </Button>
        </TabPanel>
        <TabPanel value="2">
          <TextField
            id="standard-basic"
            label="Coach Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Coach Password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button
            variant="outlined"
            onClick={() => handleCoachSubmit(email, password, value)}
            className="loginButton"
            fullWidth={true}
          >
            Log In
          </Button>
        </TabPanel>
      </TabContext>
      {/* <div>
        <h1> Student Login</h1>
      </div>
      <div className="studentLoginContainer">
        <TextField
          id="standard-basic"
          label="Student Email"
          className="studentEmail"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          label="Student Password"
          className="studentPassword"
          variant="standard"
        />
      </div>
      <div className="verticalLineContainer">
        <hr className="verticalLine"></hr>
      </div>
      <div>
        <h1>Coach Login</h1>
      </div>
      <div className="coachLoginContainer">
        <TextField id="standard-basic" label="Coach Email" variant="standard" />
        <TextField
          id="standard-basic"
          label="Coach Password"
          variant="standard"
        />
      </div> */}
    </div>
  );
};

export default Login;
