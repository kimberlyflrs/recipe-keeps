import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.login = props.login;
    }

    render(){
        return(
            <Navbar className="sticky-top" bg="light" expand="lg">
            <Navbar.Brand href="#home">Recipe Keeps</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Link href="#home">Log In</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;