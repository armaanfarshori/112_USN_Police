import React, { Component } from 'react'
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import { Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { connect } from 'react-redux';
import { loadUser } from './store/actions/authActions';

export class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/signUp" component={SignUp} />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(loadUser())
  }
}

export default connect(null, mapDispatchToProps)(App);

