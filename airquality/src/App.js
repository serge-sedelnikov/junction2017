import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    }
  }

  /**
   * On component did mount
   */
  componentDidMount() {
    let url = 'https://woodcityapiqa.azurewebsites.net/api/v1/GraphQL';
    let query = {
      query: "{ building(id:\"Junction2017\") { airquality { co2, timestamp }}}"
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    })
      .then(res => res.json())
      .then(data => this.setState({
        data
      }))
  }

  render() {

    if (!this.state.data) {
      return 'loading...';
    }

    return (
      <div className="App">
        <pre>
          <code>{JSON.stringify(this.state.data, null, 2)}</code>
        </pre>
      </div>
    );
  }
}

export default App;
