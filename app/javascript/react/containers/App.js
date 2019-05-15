import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import Home from './Home'
import Events from './Events'
import Event from './Event'
import EventForm from './EventForm'
import User from './User'

export const App = props => {

    return(
      <Router history={browserHistory}>
        <Route path="/" component={ Events }/>
        <Route path="/events" component={ Events }/>
        <Route path="/events/new" component={ EventForm }/>
        <Route path="/events/:id" component={ Event }/>
        <Route path="/users/:id" component={ User }/>
      </Router>
    )
}

export default App
