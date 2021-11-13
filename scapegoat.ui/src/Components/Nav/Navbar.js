import React from 'react';
import styled from 'styled-components';
import Auth from '../../Views/UserViews/Auth';

const StyledNav = styled.div`
  background-color: #ffe8d6;
  color: #4B4F3F;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border: 1px solid #e7e7e7;
    background-color: #ffe8d6;
    color: #4B4F3F;
  }

  li {
    float: left;
  }

  li a {
    display: block;
    color: #4B4F3F;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover:not(.active) {
    background-color: #ffe8d6;
  }

  li a.active {
    color: #FDF1E9;
    background-color: #4B4F3F;
  }
  
  img {
    height: 25px;
    width: 30px;
    right: 0;
  }

  `;

export default function NavBar({user, isAdmin}) {
   return (
      <StyledNav>
        <ul>
          <li><a className='nav-link' href='/'>
          <b>scapegoat*</b>
          </a></li>
          <li><a className='nav-link' href='/products'>
          Products
          </a></li>
          <li><a className='nav-link' href='/search'>
            Search
          </a></li>
          {user &&
          <>
            <li><a className='nav-link' href='/cart'>
              Cart
            </a></li>
            <li><a className='nav-link' href='/payments'>
              Payments
            </a></li>
            <li><a className='nav-link' href='/dashboard'>
              My Dashboard
            </a></li>
          </>
          }
          {isAdmin &&
            <li><a className='nav-link' href='/users'>
              Admin
            </a></li>
          }
          <li>
          <Auth/>
          </li>
        </ul>
      </StyledNav>
  )
};
