import React, { Component } from 'react';
import mqtt from 'mqtt';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    // state of the application
    this.state = {
      // messages received from mqtt
      messages: [],
      connected: false,
      connecting: false
    }
  }

  componentDidMount() {
    this.connectToMqtt();
  }

  // connect to mqtt
  connectToMqtt() {
    this.setState({
      ...this.state,
      connecting: true
    });
    let client  = mqtt.connect({
      host: 'localhost',
      port: 9001
    });
    client.on('connect', () => {
      this.setState({
        ...this.state,
        connecting: false,
        connected: true
      });
      client.subscribe('location/+/tagEntered');
      client.subscribe('location/+/tagLeft');
	  client.subscribe('smartshelf/nur/inventory');
    })
     
    client.on('message', (topic, message) => {
      // message is Buffer
      console.log(message.toString())
      this.setState({
        ...this.state,
        messages: [
          ...this.state.messages,
          `${topic} - ${message.toString()}`
        ]
      })
    })
  }

  render() {
    let { connecting, connected, messages } = this.state;

    return (  
      <div className="App">
        <h1>Messages from MQTT.</h1>
        <h4>mqtt.intelligentpackaging.online</h4>
        {connecting ? <span>connecting to mqtt...</span> : null}
        {connected ? <span>connected!</span> : null }
        <hr />
        <pre>
          {messages.map((message, index) =>(
            <code key={index}>{index}. {message}<br/></code>
          ))}
        </pre>

      </div>
    );
  }
}

export default App;
