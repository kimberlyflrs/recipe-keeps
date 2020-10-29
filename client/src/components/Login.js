import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login, userInfo} from '../redux/actions';

//Signup can only be accessed if there is no token
class Login extends React.Component{
    constructor(props){
        super()
        this.state = {
            new_user: false,
            info_valid:false,
        }
        this.newUser = this.newUser.bind(this);
        this.login = this.login.bind(this);
        this.myLoginSubmit = this.myLoginSubmit.bind(this);
    }





    newUser(){
    //switches from login to signup
        document.getElementById('email').value='';
        document.getElementById('password').value='';
        if(this.state.new_user){
            document.getElementById('confirmpassword').value='';
        }
        this.setState({
            new_user: !(this.state.new_user)
        })
    }



    async login(email, password){
        console.log("here it's the login function");
        await this.props.login(email,password);
    }




    myLoginSubmit = (event) => {
        //checks if inputs are not empty
        event.preventDefault();
        var email = document.forms["loginForm"]["email"].value;
        var pass = document.forms["loginForm"]["password"].value;

        if(email==="" || pass===""){
            alert("Field cannot be empty");
        }
        else{
            this.login(email,pass);
        }
      }





    render(){
        if(this.props.loggedIn){
            return <Redirect to="/viewRecipes"/>
        }
        if (this.state.new_user){
            return <Redirect to="/signup"/>
        }
            return(
                <div className="form">
                    <h1 className="landingElement">Login</h1>
                    <p className="center error">{this.props.error}</p>
                    <Form name="loginForm" onSubmit={this.myLoginSubmit}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" name="email" id="email"></Form.Control>


                        <Form.Label className="landing-space">Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" name="password" id="password"></Form.Control>

                        <div className="center">
                        <Button className="btn-login" type="submit">Login</Button>
                        </div>
                    </Form>
                    <div className="center">
                        <Button variant="link" onClick={()=>this.newUser()}>New to RecipeKeeps? Sign Up</Button>
                    </div>
                </div>
            )

    }

}

const mapDispatchToProps = {
    login,
    userInfo,
};

const mapStateToProps = state => ({
    loggedIn: state.logged_in,
    error: state.error
})

export default connect(mapStateToProps,mapDispatchToProps)(Login);