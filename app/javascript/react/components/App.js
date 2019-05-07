import React, { Component } from 'react'

const axios = require('axios');
const corsProxy = "https://cors-anywhere.herokuapp.com/";

class App extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){


    axios({
  url: corsProxy + "https://api-v3.igdb.com/games/?search=street%20fighter&fields=name",
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'user-key': '26085dfadb969be0919afbc361218dc2'
  },
  data: "fields name;"
})
  .then(response => {
      console.log(response.data);
  })
  .catch(err => {
      console.error(err);
  });
  }

  render(){
    return(
      <p>We did it, bois!</p>
    )
  }
}

export default App
