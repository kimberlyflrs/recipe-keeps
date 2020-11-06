import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {connect} from 'react-redux';
import {logout} from '../redux/actions';
import {Redirect} from 'react-router-dom';


//Creates a Header component
class Header extends React.Component{
    constructor(props){
        super();
        this.state ={
            toLogin: false
        }
        this.login = props.login;
        this.logout = this.logout.bind(this);

    }

    logout(){
        //nevigates to login
        this.props.logout();
        this.setState({
            toLogin:true
        })
    }

    render(){
        if(this.state.toLogin){
            return <Redirect to="/login"/>
        }
        if(!this.props.logged_in){
            return(
                <Navbar className="sticky-top nav">
                <Navbar.Brand className="header">Recipe Keeps</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link href="/login">Log In</Nav.Link>
                    <Nav.Link href="/signup">Sign Up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>               
            )
        }
        return(
            <Navbar className="sticky-top nav" expand="lg">
            <Navbar.Brand className="header">Recipe Keeps</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Link href="/viewRecipes">Recipes</Nav.Link>
                <Nav.Link href="/login" onClick={this.logout}>Log Out</Nav.Link>
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