import React, { Component } from 'react'

const axios = require('axios');
const corsProxy = "https://cors-anywhere.herokuapp.com/";

class GameSearchResult extends Component{
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      gameID: this.props.gameID
    }
  }

  handleClick(){
    this.props.clickAction(this.state.gameID)
  }

  render(){
    return(
      <div className="search-result">
        <p onClick={ this.handleClick }>{this.props.gameTitle}</p>
      </div>
    )
  }
}

export default GameSearchResult
