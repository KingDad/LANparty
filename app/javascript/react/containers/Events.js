import React, { Component } from 'react'
import { Link } from 'react-router'

class Events extends Component{
  constructor(props){
    super(props)
    this.state = {
      events: null
    }
  }

  componentDidMount() {
    fetch(`/api/v1/events`)
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
        this.setState({events: response.events})
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let events

    if (this.state.events) {
      events = this.state.events.map(event => {
        return (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>{event.title}</Link>
          </li>
        )
      })
    }
    return(

      <div className="container">
        <ul>
          {events}
        </ul>
        <a href="/events/new">Create New Event</a>
      </div>
    )
  }
}

export default Events
