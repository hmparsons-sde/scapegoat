import React from 'react';
import {
  Navbar,
  Nav,
  NavLink,
  NavbarBrand
} from 'reactstrap';

export default function NavBar() {

  return (
  <div className="container-fluid w-100">
    <Navbar className="justify-content-between" color="faded" light>
      <NavbarBrand href="/">scapegoat*</NavbarBrand>
        <Nav className="m-auto" navbar>
          <NavLink className='nav-link' href='/'>
            Home
          </NavLink>
          <br/>
        <NavLink className='nav-link' href='/products'>
          Products
        </NavLink>
      </Nav>
    </Navbar>
  </div>
  )
};
