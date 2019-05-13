import React, { Component } from 'react'
import GameSearchResult from './GameSearchResult'

const axios = require('axios')
const corsProxy = "https://cors-anywhere.herokuapp.com/"

class SearchBar extends Component{
  constructor(props){
    super(props);
    this.search = this.search.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      searchResults: [],
      typingTimer: null
    }
  }

  search(query){
    let queryTerm
    if (query.includes(" ")){
      queryTerm = query.split(" ").join("%20")
    }
    else{
      queryTerm = query
    }
    axios({
      url: corsProxy + `https://api-v3.igdb.com/games/?search=${queryTerm}&fields=name`,
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'user-key': '26085dfadb969be0919afbc361218dc2'
      },
      data: "fields name;"
    })
    .then(response => {
      console.log(response.data)
      this.setState({searchResults: response.data});
    })
    .catch(err => {
        console.error(err);
    });
  }

  onChange = event => {
    let value = event.target.value;
    if (value !== ''){
      clearTimeout(this.state.typingTimer)
      this.setState({typingTimer: setTimeout((() => this.search(value)), 500)})
    }
    else{
      clearTimeout(this.state.typingTimer)
      this.setState({searchResults: []})
    }
  };

  render(){
    let searchResults = this.state.searchResults.map((result) => {
      return <GameSearchResult key={ result.id } gameTitle={ result.name } gameID={ result.id } clickAction={ this.props.resultClickAction }/>
    })

    return(
      <div>
        <input
          type="text"
          value={ this.state.query }
          onChange={ this.onChange }
        />
        <ul>
          { searchResults }
        </ul>
      </div>
    )
  }
}

export default SearchBar
