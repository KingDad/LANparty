import React, { Component } from 'react'

class App extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch("https://api-v3.igdb.com/keywords",{
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'user-key': '26085dfadb969be0919afbc361218dc2',
      },
      data: "fields created_at,name,slug,updated_at,url;"
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
      .then(response => {
        console.log(response)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    return(
      <p>We did it</p>
    )
  }
}

export default App
