import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


export default class NavUser extends Component {



    render() {
        return (
            <Navbar bg="primary" variant="dark">

   <Navbar.Brand >Digital Wallet</Navbar.Brand>
    <Nav className="ml-auto">
      <Link className="nav-link" to={{ pathname:"/home", state: this.props.user }}>Home</Link>
      <Link className="nav-link" to={{ pathname:"/cashOut", state: this.props.user }}>CashOut</Link>
      <Link className="nav-link" to={{ pathname:"/cashIn", state: this.props.user }}>CashIn</Link>
      <Link className="nav-link" to={{ pathname:"/profile", state: this.props.user }}>Profile</Link>
   
    
    
    </Nav>
    <DropdownButton  alignRight id="dropdown-basic-button" title={this.props.user.firstName +" "+ this.props.user.lastName}> 
  <Dropdown.Item href="/">Sign out</Dropdown.Item>
 </DropdownButton> 
  </Navbar>

        )
    }
}
