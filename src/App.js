import React from 'react';
import './App.css';

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';

import Navbar from './Navbar';

import Home from './Home';
import Menu from './Menu';
import Contact from './Contact';
import Landing from './Landing';

class App extends React.Component {
  // router is taking the url, to decide which Component Route to render
  // Switch is saying we only want one Route from his children
  render() {
    return (
      <Router>
        <div>
          {/* look at this comment OMG */}
          <Route exact path='/home' component={Landing} />
          <Navbar />
          <Switch>
            <Route exact path='/home' component={Home} />
            <Route exact path='/menu' component={Menu} />
            <Route exact path='/contact' component={Contact} />
            <Redirect from='/' to='/home' />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
