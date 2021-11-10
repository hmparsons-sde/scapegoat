import React, { Component } from 'react';
import firebase from 'firebase/compat/app';
import styled from 'styled-components';
import {AiOutlineLogin, AiOutlineLogout} from 'react-icons/ai';
import { signInUser, signOutUser } from '../../helpers/auth';
// import { Button } from 'reactstrap';
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
      <div>
        <StyledAuth>
      { !user ? <p className='nav-link' onClick={(e) => signInUser(e)}><AiOutlineLogin/></p>
        : <div>
         <p
          className='nav-link'
          onClick={(e) => signOutUser(e)}
        >
          <AiOutlineLogout/>
          </p>
      </div>
      }
      </StyledAuth>
      </div>
    );
  }
}
const StyledAuth = styled.div`
cursor: pointer;
margin-left: 8px;
`;
