import axios from "axios";
import React, {useState,useEffect} from "react";
import "./styles/studentStyle.css"
import StudentScheduleCard from "../components/StudentScheduleCard";
import { Typography } from "@mui/material";

const Student = ({ studentEmail, studentPassword, timeToLocal }) => {
  const [studentDisplayInfo, setStudentDisplayInfo] = useState()
  const [render, setRender] = useState(false)

  useEffect(() => {
    const body = JSON.stringify({ email: studentEmail, password: studentPassword })
    axios.post("/student/auth", { body })
    .then((res) => setStudentDisplayInfo(res.data))
  },[render])

  const handleStudentBooking = async (slot_id) => {
    const body = JSON.stringify({ slot_id: slot_id, student_id: studentDisplayInfo?.student_info?.[0]?.id })
    console.log(body)
    await axios.post("/schedule-slot", { body }).catch((e) => console.log(e))
    setRender(!render)
  }
  return(
    <>
      <h1 className="hiText">Hi {studentDisplayInfo?.student_info?.[0]?.name}</h1>
        <div className="studentContainer">
          <div className="allCoachesAvailibilityContainer">
            <div className="allCoachesAvailibilityHeaderContainer">
              <h4>Coach Avalibilities</h4>
            </div>
            <div className="allCoachesAvailibilityCardsContainer">
              {studentDisplayInfo?.available_slots?.length > 0 ?
                studentDisplayInfo?.available_slots?.map((item, index) => {
                  return (
                    <StudentScheduleCard 
                      key={index}
                      title="Available Slot"
                      coach_name={item.coach_name}
                      start_time={item.start_time}
                      end_time={item.end_time}
                      timeToLocal={timeToLocal}
                      slot_id={item.id}
                      handleStudentBooking={handleStudentBooking}
                      buttonRender={true}
                    />
                  );
                })
                : <Typography>No Avalibilities</Typography> 
              }
            </div>
          </div>
          <div className="studentUpComingScheduleContainer">
            <div className="studentUpComingScheduleHeaderContainer">
              <h4>Upcoming Schedule</h4>
            </div>
            <div className="studentUpComingScheduleCardsContainer">
            {studentDisplayInfo?.booked_slots_for_student?.length > 0 ?
                studentDisplayInfo?.booked_slots_for_student?.map((item, index) => {
                  return (
                    <StudentScheduleCard 
                      key={index}
                      title="Available Slot"
                      coach_name={item.coach_name}
                      start_time={item.start_time}
                      end_time={item.end_time}
                      timeToLocal={timeToLocal}
                      slot_id={item.id}
                    />
                  );
                })
                : <Typography>No Avalibilities</Typography> 
              }
            </div>
          </div>
        </div>
    </>
  );
};

export default Student;
