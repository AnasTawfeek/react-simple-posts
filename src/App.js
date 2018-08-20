import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import logo from './logo.png'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="A.T.U Logo" />
          <h1 className="App-title">A.T.U Book</h1>
        </header>
        <div className="App-container">
            <Switch>
                <Route exact path="/" render={props => <div>Posts</div>} />
                <Route exact path="/post/:id" render={props => <div>Single post: {props.match.params.id}</div>}/>
                <Redirect exact from='*' to='/' />
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;
