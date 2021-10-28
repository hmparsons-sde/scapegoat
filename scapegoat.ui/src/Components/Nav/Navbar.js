import React from 'react';
import {
  Navbar,
  Nav,
  NavLink,
  NavbarBrand
} from 'reactstrap';

export default function NavBar() {

  return (
  <div>
    <Navbar color="faded" light>
      <NavbarBrand href="/">scapegoat*</NavbarBrand>
        <Nav className="m-auto" navbar>
          <NavLink className='nav-link' href='/'>
            Home
          </NavLink>
        <br />
        <NavLink className='nav-link' href='/products'>
          Products
        </NavLink>
        <br />
        <NavLink className='nav-link' href='/orders'>
          Orders
        </NavLink>
        <br />
        <NavLink className='nav-link' href='/users'>
          Users
        </NavLink>
        <br />
      </Nav>
    </Navbar>
  </div>
  )
};
