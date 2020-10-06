import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {connect} from 'react-redux';
import {logout} from '../redux/actions';
import {Redirect} from 'react-router-dom';



class Header extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            toLanding: false
        }
        this.login = props.login;
        this.logout = this.logout.bind(this);

    }

    logout(){
        this.props.logout();
        //navigate to the LandingPage
        this.setState({
            toLanding:true
        })
    }

    render(){
        if(this.state.toLanding){
            return <Redirect to="/"/>
        }
        if(!this.props.logged_in){
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
        return(
            <Navbar className="sticky-top" bg="light" expand="lg">
            <Navbar.Brand href="#home">Recipe Keeps</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Link href="#home" onClick={this.logout}>Log Out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => ({
    logged_in: state.logged_in
})

const mapDispatchToProps = {
    logout
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);