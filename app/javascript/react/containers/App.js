import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import Home from './Home'
import Events from './Events'
import Event from './Event'
import EventNew from './EventNew'
import EventEdit from './EventEdit'
import User from './User'

export const App = props => {

    return(
      <Router history={browserHistory}>
        <Route path="/" component={ Events }/>
        <Route path="/events" component={ Events }/>
        <Route path="/events/new" component={ EventNew }/>
        <Route path="/events/:id" component={ Event }/>
        <Route path="/events/:id/edit" component={ EventEdit }/>
        <Route path="/users/:id" component={ User }/>
      </Router>
    )
}

export default App
