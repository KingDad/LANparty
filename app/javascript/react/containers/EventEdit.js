import React, { Component } from 'react'
import GameSearchBar from '../components/GameSearchBar'
import GameTile from '../components/GameTile'
import TextField from '../components/TextField'
import DateTimeField from '../components/DateTimeField'

class EventEdit extends Component {
  constructor(props){
    super(props)
    this.validateSubmission = this.validateSubmission.bind(this)
    this.takeChange = this.takeChange.bind(this)
    this.sendUpdates = this.sendUpdates.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addGame = this.addGame.bind(this)
    this.removeGame = this.removeGame.bind(this)
    this.state = {
      event: null,
      title: "",
      description: "",
      eventDateTime: "",
      twitchStream: "",
      gameIDs: [],
      errors: {}
    }
  }

  validateSubmission(submission){
    let titlePresent;
    let dateTimePresent;
    if(submission.title.trim() === "" && submission.event_datetime.trim() === ""){
      let newError = {emptyTitle: "Please provide an event title before submitting", emptyDateTime: "Please provide a date and time before submitting"};
      this.setState({errors: newError});
      titlePresent = false;
      dateTimePresent = false;
    }
    else if (submission.title.trim() === ""){
      let newError = {emptyTitle: "Please provide an event title before submitting"};
      this.setState({errors: newError});
      titlePresent = false;
      let errorState = this.state.errors;
      delete errorState.emptyDateTime;
    }
    else if(submission.event_datetime.trim() === ""){
      let newError = {emptyDateTime: "Please provide a date and time before submitting"};
      this.setState({errors: newError});
      dateTimePresent = false;
    }
    else{
      let errorState = this.state.errors;
      delete errorState.emptyTitle;
      delete errorState.emptyDateTime;
      this.setState({errors: errorState});
      titlePresent = true;
      dateTimePresent = true;
    }

    if (titlePresent === true && dateTimePresent === true){
      return true
    }
    else{
      console.log(this.state.errors);
      return false
    }
  }

  takeChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  sendUpdates(payload){
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    let eventId = this.props.params.id
    fetch(`/api/v1/events/`, {
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
    .then(response => response.json())
    .then(body => {
      return window.location.href = `/events/${body.event.id}`
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleFormSubmit(event){
    event.preventDefault();
    let formPayload = {
      id: this.state.event.id,
      title: this.state.title,
      description: this.state.description,
      event_datetime: this.state.eventDateTime,
      twitch_stream: this.state.twitchStream,
      playables: this.state.gameIDs
    }
    if(this.validateSubmission(formPayload)){
      this.sendUpdates(formPayload);
    }
  }

  addGame(gameID){
    let currentListOfGames = this.state.gameIDs
    let newListOfGames = currentListOfGames.concat(gameID)
    this.setState({ gameIDs: newListOfGames })
  }

  removeGame(gameID){
    let listOfGames = this.state.gameIDs
    let gameIndex = listOfGames.indexOf(gameID)
    if (gameIndex > -1){
      listOfGames.splice(gameIndex, 1)
    }
    this.setState({gameIDs: listOfGames})
  }

  componentDidMount(){
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
        console.log(response.event)
        let gameIDs = []
        let reformattedDatetime
        response.event.playables.forEach((playable) =>{
          gameIDs.push(playable.game_id)
        })
        reformattedDatetime = response.event.event_datetime.slice(0, 16)
        this.setState({
          event: response.event,
          title: response.event.formatted_title,
          description: response.event.description,
          eventDateTime: reformattedDatetime,
          twitchStream: response.event.twitch_stream,
          gameIDs: gameIDs
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
      console.log(this.props.params)
  }

  render(){
    let gameTiles
    let title
    let errorDiv
    let errorItems

    if(Object.keys(this.state.errors).length > 0){
      errorItems = Object.values(this.state.errors).map(error =>{
        return(
          <li key={error}>{error}</li>
        );
      })
      errorDiv = <div>{errorItems}</div>;
    }

    if (this.state.gameIDs.length > 0){
      gameTiles = this.state.gameIDs.map((ID) =>{
        return(
          <GameTile key={ID} gameID={ID} deletable={true} deleteFunction={this.removeGame} />
        )
      })
    }
    if (this.state.event){
      title = <h2>Update "{`${this.state.event.formatted_title}`}"<div id="header-underline"></div></h2>
    }

    return(
      <div className="container">
        {title}
        <form id="event-form" onSubmit={this.handleFormSubmit} action="localhost:3000/events">
          {errorDiv}
          <TextField name="title" id="title" label="Title:" content={this.state.title} handleChange={this.takeChange} />
          <TextField name="description" id="description" label="Description:" content={this.state.description} handleChange={this.takeChange} />
          <TextField name="twitchStream" id="twitchStream" label="Name of Twitch Stream:" content={this.state.twitchStream} handleChange={this.takeChange} />
          <DateTimeField name="eventDateTime" content={this.state.eventDateTime} handleChange={this.takeChange} />
          <label>Search for Games:</label>
          <GameSearchBar resultClickAction={ this.addGame }/>
          { gameTiles }
          <button id="form-submit">Update Event</button>
        </form>
      </div>
    )
  }
}

export default EventEdit
