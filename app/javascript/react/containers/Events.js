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
        let events = response
        console.log(response)
        this.setState({events: events})
        console.log(this.state)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let events

    if (this.state.events) {
      events = this.state.events.map(event => {
        return (
          <Link to={`/events/${event.id}`} key={event.id}>{event.title}</Link>
        )
      })
    }
    return(

      <div className="container">
        {events}
      </div>
    )
  }
}

export default Events
