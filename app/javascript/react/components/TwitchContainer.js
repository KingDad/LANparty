import React, { Component } from 'react'

class TwitchContainer extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const EMBED_URL = 'https://player.twitch.tv/js/embed/v1.js';
    let player;
    const script = document.createElement('script');
    script.setAttribute(
      'src',
      EMBED_URL
    );
    script.addEventListener('load', () => {
      player = new Twitch.Player('twitch-embed', {
        width: "100%",
        height: 480,
        channel: this.props.stream
      });
      player.addEventListener(Twitch.Player.ONLINE, ()=>{
        let container = document.getElementById('twitch-container')
        container.style.display = "inline-block"
      })
      player.addEventListener(Twitch.Player.OFFLINE, ()=>{
        let container = document.getElementById('twitch-container')
        container.style.display = "none"
      })
    });
    document.body.appendChild(script);
  }

  render(){
    return(
      <div id="twitch-container">
        <div id="twitch-embed"></div>
        <iframe
          frameBorder="0"
          scrolling="no"
          id="chat-embed"
          src={`https://www.twitch.tv/embed/${this.props.stream}/chat`}
          height="480"
          width="30%">
        </iframe>
      </div>
    )
  }
}

export default TwitchContainer
