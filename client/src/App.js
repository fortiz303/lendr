import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    authtoken: false,
    username: false,
    transactions: [],
    passwordInput: '',
    usernameInput: ''
  };

  componentDidMount = () => {
    // fetch('/api/v1/users')
    //   .then(res => res.json())
    //   .then(users => {
    //     console.log(users)
    //   });
  };

  handlePasswordInput = (e) => {
    this.setState({
      passwordInput: e.target.value
    })
  };

  handleUsernameInput = (e) => {
    this.setState({
      usernameInput: e.target.value
    })
  };

  authenticate = () => {
    const {passwordInput, usernameInput} = this.state;
    
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const opts = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        user_name: usernameInput,
        password: passwordInput
      })
    };

    fetch(`/api/v1/authenticate`, opts)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          authtoken: data.token,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React!!!</h1>
        </header>
        <input onChange={this.handleUsernameInput} type="text" />
        <input onChange={this.handlePasswordInput} type="password" />
        <button onClick={this.authenticate}>Authenticate</button>
      </div>
    );
  }
}

export default App;
