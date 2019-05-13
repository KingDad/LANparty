import React from 'react'

const DateTimeField = props => {
  return(
    <div>
      <label htmlFor={props.name}>Date and Time of Event:</label>
      <input type="datetime-local" id="event-time" name={props.name} value={props.content} onChange={props.handleChange}/>
    </div>
  )
}

export default DateTimeField
