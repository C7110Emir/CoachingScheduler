import React from 'react'
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';


const StudentScheduleCard = ({title, coach_name, start_time, end_time, timeToLocal, slot_id, handleStudentBooking, buttonRender}) => {
  return (
    <Card className="availiblityCard">
        <CardContent className= "availableSpotCardContent">
            <Typography sx={{ fontSize: 14 }}>{title}</Typography>
            <Typography variant="h5" component="div" className='coach_name'>
                with {coach_name}
              </Typography>
            <Typography>
            {`${timeToLocal(start_time)} - ${timeToLocal(end_time)}`}
            </Typography>
            { buttonRender ? 
                <CardActions>
                    <Button size="small" onClick={() => handleStudentBooking(slot_id)}>Book Now</Button>
                </CardActions> : null
            }
        </CardContent>
    </Card>
  )
}

export default StudentScheduleCard