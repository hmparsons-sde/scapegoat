import React, { Component } from 'react';
import firebase from 'firebase/compat/app';
import { signInUser, signOutUser } from '../../helpers/auth';
export default class Auth extends Component {
  state = {
    user: null,
    authed: null,
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { user } = this.state;

    return (
      <>
      { !user ? <button className='nav-link btn btnLogin' onClick={(e) => signInUser(e)}>Login</button>
        : <>
      <div className='row'>
          <p>{user?.displayName}!</p>
         <ul
          className='nav-link btn btnSecondary'
          onClick={(e) => signOutUser(e)}
        >
          Logout
          </ul>
        </div>
      </>
      }
      </>
    );
  }
}
