import React, { Component } from 'react'
import TwitchContainer from '../components/TwitchContainer'

class Event extends Component {
  constructor(props){
    super(props)
    this.printDate = this.printDate.bind(this)
    this.state = {
      event: null
    }
  }

  componentDidMount() {
    let eventId = this.props.params.id
    fetch(`/api/v1/events/${eventId}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(response => {
        this.setState({event: response})
        console.log(this.state)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  printDate(timestamp){
    var monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let dateTime = new Date(timestamp)
    let year = dateTime.getFullYear()
    let month = dateTime.getMonth()
    let date = dateTime.getDate()
    let day = dateTime.getDay()
    let time = dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

    return `${daysOfWeek[day]} ${monthNames[month]} ${date}, ${year} at ${time}`
  }

  render(){
    let eventTitle
    let eventDescription
    let eventDateTime
    let eventStream
    let twitchPieces

    if(this.state.event){
      eventTitle = this.state.event.title
      eventDescription = this.state.event.description
      eventDateTime = this.printDate(this.state.event.event_datetime)
      eventStream = this.state.event.twitch_stream
      twitchPieces = <TwitchContainer stream={eventStream} />
    }

    return(
      <div className="container">
        <h2>{eventTitle}</h2>
        {twitchPieces}
        <p>{eventDescription}</p>
        <p>{eventDateTime}</p>
      </div>
    )
  }
}

export default Event
