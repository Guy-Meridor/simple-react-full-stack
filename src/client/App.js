import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import LoadFiles from './pages/LoadFiles/LoadFiles'
import ShowFiles from './pages/ShowFiles/ShowFiles'
import Header from './Header/Header'
import Notfound from './pages/NotFound/NotFound'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header/>
        <Switch>
          {/* <Route exact path="/" component={App} /> */}
          <Route path="/show" component={ShowFiles} />
          <Route path="/" exact component={LoadFiles} />
          <Route component={Notfound} />
        </Switch>
      </Router>)
  }
}
