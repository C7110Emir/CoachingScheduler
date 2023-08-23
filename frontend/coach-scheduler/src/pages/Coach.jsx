import axios from "axios";
import React, { useState, useEffect } from "react";
import "./styles/coachStyle.css"
import { Button, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import CoachScheduleCard from "../components/CoachScheduleCard";

const Coach = ({ coachEmail, coachPassword, timeToLocal }) => {
  const [ coachDisplayData, setCoachDisplayData ] = useState()
  const [ startDate, setStartDate ] = useState()
  const [ render, setRender ] = useState(true)
  useEffect(() => {
    const body = JSON.stringify({ email: coachEmail, password: coachPassword });

    axios.post("/coach/auth", { body })
    .then((res) => setCoachDisplayData(res.data))
  },[render])


  const handleSubmitFeedback = async (message, rating, slot_id) => {
    const body = JSON.stringify({ rating: rating, message: message, slot_id: slot_id, coach_id: coachDisplayData?.coach_info?.[0]?.id });
    console.log(body)
    await axios.post("/submit-feedback", { body }).catch((e) => console.log(e))
    setRender(!render)
  }

  const handleAddAvalibilitySubmit = async (coach_id, start_time) => {
    const end_time = new Date(start_time)
    
    end_time.setHours(end_time.getHours() + 2)

    const new_end_time = end_time.toISOString()
    const body = JSON.stringify({ end_time: new_end_time, start_time: start_time, coach_id: coach_id });

    await axios.post("/coach/add_availibility_slot", { body }).catch((e) => console.log(e))
    setStartDate("")
  }

  return (
    <>
      <h1 className="coachHiText">Hi {coachDisplayData?.coach_info?.[0]?.name}</h1>
      <div className= "coachContainer">
        <div className="upcomingScheduleContainer">
          <div className= "upcomingScheduleHeaderContainer">
            <h4 className="upcomingScheduleHeader">Up Coming Schedule</h4>
          </div>
          <div className="upcomingScheduleCardsContainer">
              { coachDisplayData?.scheduled_slots?.length > 0 ?
                coachDisplayData?.scheduled_slots.map((item, index) => {
                  console.log(item)
                return (
                  <CoachScheduleCard
                    key={index}
                    name="Upcoming Event"
                    coach_id={item.coach_id}
                    slot_id={item.id}
                    start_time={item.start_time}
                    end_time={item.end_time}
                    buttonToggleTrueText="Cancel Rate And End Session"
                    buttonToggleFalseText="Rate and End Session"
                    student_name={item.student_name}
                    student_id={item.student_id}
                    timeToLocal={timeToLocal}
                    handleSubmitFeedback= {handleSubmitFeedback}
                  /> )
              }) : <Typography>No Scheduled Slots</Typography>
              }
          </div>
        </div>
        <div className="addAvailibilityContainer">
            <div className= "addAvailibilityHeaderContainer">
              <h4 className= "addAvailibilityHeader" >Add Avalibility</h4>
            </div>
            <div className="pickDateContainer">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker minValue={new Date()} onChange={(date) => setStartDate(date.toISOString())} value={startDate} label="pick date time" /> <br /> <br />
              </LocalizationProvider>
            </div>
            <div>
              <Button variant="contained" disabled={startDate ? false : true} onClick={() => handleAddAvalibilitySubmit(coachDisplayData?.coach_info?.[0]?.id, startDate)}>Submit Avalibility</Button>
            </div>
        </div>
        <div className="endedSessionsContainer">
          <div className="endedSessionsHeaderContainer">
            <h4 className="endedSessionsHeader">Ended Sessions</h4>
          </div>
          <div className="endedSessionsCardsContainer">
              {coachDisplayData?.ended_sessions?.length > 0 ?
                coachDisplayData.ended_sessions?.map((item, index) => {
                  return (
                    <CoachScheduleCard
                      key={index}
                      name="Ended Session"
                      student_name={item.student_name}
                      slot_id = {item.slot_id}
                      timeToLocal={timeToLocal}
                      start_time={item.start_time}
                      end_time={item.end_time}
                      buttonToggleTrueText="Close Review"
                      buttonToggleFalseText="See The Review"
                      ratingValue= {item.rating}
                      messageValue={item.message}
                    />
                  )
                }) : <Typography>No Ended Sessions</Typography>
              }
          </div>
        </div>
      </div>
    </>
  );
};

export default Coach;
