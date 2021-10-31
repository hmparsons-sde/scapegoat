import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.div`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border: 1px solid #e7e7e7;
    background-color: #f3f3f3;
  }

  li {
    float: left;
  }

  li a {
    display: block;
    color: #666;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover:not(.active) {
    background-color: #ddd;
  }

  li a.active {
    color: white;
    background-color: #04AA6D;
  }`;

export default function NavBar() {

  return (
      <StyledNav>
        <ul>
          <li><a className='nav-link' href='/'>
          <b>scapegoat*</b>
          </a></li>
          <li><a className='nav-link' href='/products'>
          Products
        </a></li>
        <li><a className='nav-link' href='/orders'>
          Orders
        </a></li>
        <li><a className='nav-link' href='/users'>
          Users
        </a></li>
        <li><a className='nav-link' href='/search'>
          Search
        </a></li>
        </ul>
      </StyledNav>
  )
};
