import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login, signup, userInfo} from '../redux/actions';

//Signup can only be accessed if there is no token
class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            new_user: false,
            info_valid:false,
        }
        this.newUser = this.newUser.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.myLoginSubmit = this.myLoginSubmit.bind(this);
        this.myRegisterSubmit = this.myRegisterSubmit.bind(this);
    }

    componentDidMount(){
        console.log('mounted component');
    }





    newUser(){
    //switches from login to signup
        this.setState({
            new_user: !(this.state.new_user)
        })
        console.log(this.state.new_user);
    }



    async login(email, password){
        console.log("here it's the login function");
        await this.props.login(email,password);
        console.log(this.props.loggedIn)
        if(this.props.loggedIn){
            this.props.userInfo();//loads the user info to redux
        }
        else{
            console.log('invalid login info')
        }
    }




    async register(email, password){
        //await the registration
        console.log("here is the register function");
        await this.props.signup(email,password);
        //if signup successful call the login with the same info
        //else show the error
        console.log("this.props.register "+ this.props.registered);
        if(this.props.registered){
            this.login(email,password);
        }
        else{
            console.log("Cannot register at this time");
        }

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
            console.log('good to go');
            this.login(email,pass);
        }
      }



      myRegisterSubmit = (event) => {
        //checks if inputs are not empty
        event.preventDefault();
        var email = document.forms["signupForm"]["email"].value;
        var pass = document.forms["signupForm"]["password"].value;
        var confirmpass = document.forms["signupForm"]["confirmPassword"].value;


        if(email==="" || pass===""){
            alert("Field cannot be empty");
        }
        if(pass !== confirmpass){
            alert("Passwords do not match");
        }
        else{
            this.register(email,pass);
        }
      }



    render(){
        if(this.props.loggedIn){
            return <Redirect to="/viewRecipes"/>
        }
        if (this.state.new_user){
            return(
                <div className="form">
                    <h1>Login</h1>
                    <Form name="loginForm" onSubmit={this.myLoginSubmit}>
                        <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" name="email"></Form.Control>
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" name="password"></Form.Control>
                        </Form.Group>

                        <Button type="submit">Login</Button>
                    </Form>
                    <button onClick={()=>this.newUser()}>New to RecipeKeeps? Sign Up</button>
                </div>
            )
        }
        return(
            <div className="form">
                <h1>Sign Up</h1>
                <Form name="signupForm" onSubmit={this.myRegisterSubmit}>
                    <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" name="email"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" name="password"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword"></Form.Control>
                    </Form.Group>

                    <Button type="submit">Create Account</Button>
                </Form>
                <button onClick={()=>this.newUser()}>Already have an account? Login </button>
            </div>

        )
    }

}

const mapDispatchToProps = {
    login,
    userInfo,
    signup
};

const mapStateToProps = state => ({
    loggedIn: state.logged_in,
    registered: state.registered
})

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);