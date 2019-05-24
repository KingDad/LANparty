import React from 'react'

const TextAreaField = props => {
  return(
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <textarea id={props.id} name={props.name} value={props.content} onChange={props.handleChange}></textarea>
    </div>
  )
}

export default TextAreaField
