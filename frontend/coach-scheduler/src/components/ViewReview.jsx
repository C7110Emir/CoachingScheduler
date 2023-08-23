import React from 'react'
import { Rating, TextField } from '@mui/material';

const ViewReview = ({ratingValue, messageValue}) => {
  return (
    <div>
        <Rating
            name="simple-controlled"
            value={ratingValue}
            readOnly
        />
        <br />
        <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          value={messageValue}
          multiline
          disabled
        />
    </div>
  )
}

export default ViewReview