import React, { Component } from 'react'

const axios = require('axios');
const corsProxy = "https://cors-anywhere.herokuapp.com/";

class GameTile extends Component{
  constructor(props){
    super(props)
    this.clickDelete = this.clickDelete.bind(this)
    this.state = {
      gameCover: null,
      gameName: null
    }
  }

  componentDidMount(){
    let coverID
    let gameName
    axios.get(corsProxy + `https://api-v3.igdb.com/games/${this.props.gameID}?fields=*`, {
      headers: {
        "user-key": "26085dfadb969be0919afbc361218dc2",
        Accept: "application/json"
      }
    })
    .then(response => {
      coverID = response.data[0].cover
      gameName = response.data[0].name
      if (coverID !== undefined){
        axios.get(corsProxy + `https://api-v3.igdb.com/covers/${coverID}?fields=url`, {
          headers: {
            "user-key": "26085dfadb969be0919afbc361218dc2",
            Accept: "application/json"
          }
        })
        .then(response => {
          this.setState({
            gameCover: response.data[0].url,
            gameName: gameName
          })
        })
        .catch(e => {
          console.log("error", e);
        });
      }
      else{
        this.setState({
          gameName: gameName
        })
      }
    })
    .catch(e => {
      console.log("error", e);
    });
  }

  clickDelete(){
    this.props.deleteFunction(this.props.gameID)
  }

  render(){
    let gameTitle
    let coverImg
    let deleteButton

    if (this.state.gameName){
      gameTitle = <p className="game-title">{this.state.gameName}</p>
    }

    if (this.state.gameCover){
      coverImg = <img src={`https:${this.state.gameCover}`} alt="No Cover Art Available" className="cover-art"/>
    }
    else{
      coverImg = <i className="fas fa-gamepad"></i>
    }

    if (this.props.deletable === true){
      deleteButton = <button className="delete-button" onClick={this.clickDelete}><i className="fas fa-times-circle"></i></button>
    }

    return(
      <div className="game-tile">
        { deleteButton }
        { gameTitle }
        { coverImg }
      </div>
    )
  }
}

export default GameTile
