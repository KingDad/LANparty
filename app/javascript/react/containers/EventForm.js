import React, { Component } from 'react'
import GameSearchBar from '../components/GameSearchBar'
import GameTile from '../components/GameTile'
import TextField from '../components/TextField'
import DateTimeField from '../components/DateTimeField'

class EventForm extends Component {
  constructor(props){
    super(props)
    this.takeChange = this.takeChange.bind(this)
    this.createEvent = this.createEvent.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addGame = this.addGame.bind(this)
    this.state = {
      title: "",
      description: "",
      eventDateTime: "",
      twitchStream: "",
      gameIDs: []
    }
  }

  takeChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  createEvent(payload){
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch(`/api/v1/events`, {
      method: 'POST',
      body: JSON.stringify(payload),
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

  handleFormSubmit(event){
    event.preventDefault();
    let formPayload = {
      title: this.state.title,
      description: this.state.description,
      event_datetime: this.state.eventDateTime,
      twitch_stream: this.state.twitchStream,
      playables: this.state.gameIDs
    }
    this.createEvent(formPayload);
  }

  addGame(gameID){
    let currentListOfGames = this.state.gameIDs
    let newListOfGames = currentListOfGames.concat(gameID)
    this.setState({ gameIDs: newListOfGames })
  }

  render(){
    let gameTiles

    if (this.state.gameIDs.length > 0){
      gameTiles = this.state.gameIDs.map((ID) =>{
        return(
          <GameTile key={ ID } gameID={ ID } />
        )
      })
    }

    return(
      <div className="container">
        <h2>Create a New Event</h2>
        <form id="event-form" onSubmit={this.handleFormSubmit}>
          <TextField name="title" id="title" label="Title:" content={this.state.title} handleChange={this.takeChange} />
          <TextField name="description" id="description" label="Description:" content={this.state.description} handleChange={this.takeChange} />
          <TextField name="twitchStream" id="twitchStream" label="Name of Twitch Stream:" content={this.state.twitchStream} handleChange={this.takeChange} />
          <DateTimeField name="eventDateTime" content={this.state.eventDateTime} handleChange={this.takeChange} />
          <label>Search for Games:</label>
          <GameSearchBar resultClickAction={ this.addGame }/>
          { gameTiles }
          <input type="submit" value="Create Event" />
        </form>
      </div>
    )
  }
}

export default EventForm
