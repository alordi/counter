import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends React.Component {
  state = {
    data: null
  };

  constructor(props) {
    super(props);
    this.createCounter = this.createCounter.bind(this);
    this.state = {
      user: "TBA",
      loggedin: false
    };
  }

  async getUser(user) {
    await axios
          .get('/' + user, {
          })
          .then(response => {
            console.log(response.data);
          })
  }

  async getCounter(user, id){
    await axios
          .get('/' + id, {
          })
          .then(response => {
            console.log(response.data);
          })
  }

  async createCounter(value){
    var params = {
      value: value
    }
    await axios
          .post('/', params)
          .then(response => {
            console.log(response.data);
          })
  }

  async upvote(id) {
    await axios
          .put('/' + id + '/upvote', {
          })
          .then(response => {
            console.log(response.data);
          })
  }

  async downvote(id) {
    await axios
          .put('/' + id + '/downvote', {
          })
          .then(response => {
            console.log(response.data);
          })
  }

  async removeCounter(id) {
    await axios
          .delete('/' + id, {
          })
          .then(response => {
            console.log(response.data);
          })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
<<<<<<< HEAD
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={this.createCounter(1)}> New counter</button>
=======
          <button onClick={this.createCounter}> New counter</button>
>>>>>>> ae2055915cc886c3e6cd63db1149ad2d8417afc6
          <a
            className="App-link"
            href="https://github.com/alordi/counter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link to Countr's GitHub Page
          </a>
        </header>
      </div>
    );
  }
}

export default App;
