import React, { useState } from 'react'
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import SubmitReviewView from './SubmitReviewView';
import ViewReview from './ViewReview';



const CoachScheduleCard = ({name, messageValue, handleSubmitFeedback, ratingValue, slot_id, buttonToggleFalseText, buttonToggleTrueText, start_time, end_time, student_name, timeToLocal}) => {
  const [ buttonToggle, setButtonToggle ] = useState(false)
  
  return (
    <div>
        <Card variant="outlined">
            <CardContent className= "cardStudentName">
              <Typography sx={{ fontSize: 14 }}>{name}</Typography>
              <Typography variant="h5" component="div" className='studentName'>
                with {student_name}
              </Typography>
              <Typography sx={{ fontSize: 14 }}>
                {`${timeToLocal(start_time)} - ${timeToLocal(end_time)}`}
              </Typography>
              <CardActions>
                <Button size="small" onClick={() => setButtonToggle(!buttonToggle)}>{ 
                  buttonToggle ? `${buttonToggleTrueText}` : `${buttonToggleFalseText}`
                  } </Button>
              </CardActions>
              {name === "Upcoming Event" && buttonToggle ? (<SubmitReviewView slot_id ={slot_id} handleSubmitFeedback={handleSubmitFeedback}/>) : null}
              {name === "Ended Session" && buttonToggle ? (<ViewReview messageValue={messageValue} ratingValue={ratingValue} />) : null}
            </CardContent>
        </Card>
    </div>
  )
}

export default CoachScheduleCard