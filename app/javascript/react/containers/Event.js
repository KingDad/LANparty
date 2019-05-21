import React, { Component } from 'react'
import TwitchContainer from '../components/TwitchContainer'
import GameTile from '../components/GameTile'

class Event extends Component {
  constructor(props){
    super(props)
    this.printDate = this.printDate.bind(this)
    this.grabID = this.grabID.bind(this)
    this.clickAttend = this.clickAttend.bind(this)
    this.clickView = this.clickView.bind(this)
    this.handleAttend = this.handleAttend.bind(this)
    this.handleView = this.handleView.bind(this)
    this.clickDelete = this.clickDelete.bind(this)
    this.goToEdit = this.goToEdit.bind(this)
    this.state = {
      event: null,
      attendees: null,
      viewers: null,
      currentUserAttendanceType: null
    }
  }

  grabID(){
    return this.state.event.id
  }

  componentDidMount() {
    let eventID = this.props.params.id
    fetch(`/api/v1/events/${eventID}`)
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
        console.log(response)
        this.setState({
          event: response.event,
          attendees: response.event.attendees,
          viewers: response.event.viewers,
          currentUserAttendanceType: response.event.current_user_attendance_type
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleAttend(eventID){
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch(`/api/v1/attendances`, {
      method: 'POST',
      body: JSON.stringify({event_id: this.state.event.id, user_id: this.state.event.user_id, attendance_type: 'attending'}),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleView(eventID){
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch(`/api/v1/attendances`, {
      method: 'POST',
      body: JSON.stringify({event_id: this.state.event.id, user_id: this.state.event.user_id, attendance_type: 'viewing'}),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  clickAttend(){
    if (this.state.event.user_id){
      let newAttendees = this.state.attendees
      let newViewers = this.state.viewers
      let attendanceType = this.state.currentUserAttendanceType
      this.handleAttend(this.grabID())
      if (this.state.currentUserAttendanceType === "attending") {
        newAttendees -= 1
        this.setState({
          currentUserAttendanceType: "none",
          attendees: newAttendees
        })
      } else if (this.state.currentUserAttendanceType === "viewing") {
        newAttendees += 1
        newViewers -= 1
        this.setState({
          currentUserAttendanceType: "attending",
          attendees: newAttendees,
          viewers: newViewers
        })
      } else {
        newAttendees += 1
        this.setState({
          currentUserAttendanceType: "attending",
          attendees: newAttendees
        })
      }
    }
  }

  clickView(){
    if (this.state.event.user_id){
      let newAttendees = this.state.attendees
      let newViewers = this.state.viewers
      let attendanceType = this.state.currentUserAttendanceType
      this.handleView(this.grabID())
      if (this.state.currentUserAttendanceType === "viewing") {
        newViewers -= 1
        this.setState({
          currentUserAttendanceType: "none",
          viewers: newViewers
        })
      } else if (this.state.currentUserAttendanceType === "attending") {
        newAttendees -= 1
        newViewers += 1
        this.setState({
          currentUserAttendanceType: "viewing",
          attendees: newAttendees,
          viewers: newViewers
        })
      } else {
        newViewers += 1
        this.setState({
          currentUserAttendanceType: "viewing",
          viewers: newViewers
        })
      }
    }
  }

  clickDelete(){
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    let eventID = this.props.params.id
    fetch(`/api/v1/events/${eventID}`, {
      method: 'DELETE',
      body: JSON.stringify({id: eventID}),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}(${response.statusText})` ,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    return window.location.href = '/events'
  }

  printDate(timestamp){
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let dateTime = new Date(timestamp)
    let year = dateTime.getFullYear()
    let month = dateTime.getMonth()
    let date = dateTime.getDate()
    let day = dateTime.getDay()
    let time = dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', timeZone: 'UTC'})
    return `${daysOfWeek[day]} ${monthNames[month]} ${date}, ${year} at ${time}`
  }

  goToEdit(){
    return window.location.href = `/events/${this.state.event.id}/edit`
  }

  render(){
    let eventTitle
    let eventDescription
    let eventDateTime
    let eventStream
    let twitchPieces
    let gameTiles
    let attendees
    let viewers
    let adminButtons

    if(this.state.event){
      eventTitle = this.state.event.formatted_title
      eventDescription = this.state.event.description
      eventDateTime = this.printDate(this.state.event.event_datetime)
      eventStream = this.state.event.twitch_stream
      twitchPieces = <TwitchContainer stream={eventStream} />
      gameTiles = this.state.event.playables.map((game) => {
        return(
          <GameTile key={ game.id } gameID={ game.game_id } />
        )
      })
      if (this.state.attendees > 0){
        attendees = <span className="attendee-count">{ this.state.attendees } Attending</span>
      }
      if (this.state.viewers > 0){
        viewers = <span className="viewer-count">{ this.state.viewers } Viewing</span>
      }
      if (this.state.event.creator_id === this.state.event.user_id){
        adminButtons = (
          <div>
            <button onClick={this.goToEdit}>Edit</button>
            <button onClick={this.clickDelete}>Delete</button>
          </div>
        )
      }
    }

    return(
      <div className="container">
        <h2>{eventTitle}<div id="header-underline"></div></h2>
        {twitchPieces}
        {gameTiles}
        <p>{eventDescription}</p>
        <p>{eventDateTime}</p>
        { attendees }
        { viewers }
        <button id="attend" onClick={this.clickAttend}>Attend</button>
        <button onClick={this.clickView}>View</button>
        { adminButtons }
      </div>
    )
  }
}

export default Event
