import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Header from './Header/Header'
import AllSongs from './pages/Songs/AllSongs'
import Song from './pages/Songs/Song'
import Words from './pages/Words/Words'
import Notfound from './pages/NotFound/NotFound'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header/>
        <Switch>
          <Route path="/words/:word" component={Words} />
          <Route path="/songs/:id" component={Song} />
          <Route path="/" exact component={AllSongs} />
          <Route component={Notfound} />
        </Switch>
      </Router>)
  }
}
