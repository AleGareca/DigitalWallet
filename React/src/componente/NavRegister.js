import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export default class NavRegister extends Component {
 
  render() {
    return (
      <Navbar bg="primary" variant="dark">
   <Navbar.Brand >Digital Wallet</Navbar.Brand>
 
   <Nav className="ml-auto">

   <Nav.Link href="/login">SingIn</Nav.Link>
   </Nav>  
  </Navbar>
    )
  }
}
