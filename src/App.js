import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import logo from './logo.png'
import './App.css'

import PostsPage from './pages/Posts'
import PostPage from './pages/Post'

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
                <Route exact path="/" component={PostsPage} />
                <Route exact path="/post/:id" component={PostPage}/>
                <Redirect exact from='*' to='/' />
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;
