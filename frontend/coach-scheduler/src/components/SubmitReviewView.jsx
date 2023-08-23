import React, { useState } from 'react'
import { Rating, TextField, Button } from '@mui/material';

const SubmitReviewView = ({slot_id, handleSubmitFeedback}) => {
    const [ratingValue, setRatingValue] = useState(0)
    const [textValue, setTextValue] = useState("")

  return (
    <div className="submitReviewContainer">
        <Rating
            name="simple-controlled"
            value={ratingValue}
            onChange={(event, newValue) => {
                setRatingValue(newValue);
            }}
        />
        <br />
        <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          value={textValue}
          multiline
          onChange={(e) => setTextValue(e.target.value)}
        />
        <br />
        <Button variant="contained" onClick={() => { 
            handleSubmitFeedback(textValue, ratingValue, slot_id)
            setRatingValue("")
            setTextValue("")
            }} >Submit FeedBack</Button>
    </div>
  )
}

export default SubmitReviewView;