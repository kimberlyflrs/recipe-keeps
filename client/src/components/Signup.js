import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login, signup, userInfo} from '../redux/actions';

//Signup can only be accessed if there is no token
class SignUp extends React.Component{
    constructor(props){
        super()
        this.state = {
            new_user: true,
            info_valid:false,
            errors: {}
        }
        this.newUser = this.newUser.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.myRegisterSubmit = this.myRegisterSubmit.bind(this);
    }





    newUser(){
    //switches from login to signup
        this.setState({
            new_user: !(this.state.new_user)
        })
    }



    async login(email, password){
        console.log("here it's the login function");
        await this.props.login(email,password);
    }




    async register(email, password){
        //await the registration
        console.log("here is the register function");
        await this.props.signup(email,password);
        //if signup successful call the login with the same info
        //else show the error
        console.log("this.props.register "+ this.props.registered);
        if(this.props.registered){ //successful register
            this.login(email,password);
        }
        else{//error
            console.log("Cannot register at this time");
        }

    }



      myRegisterSubmit = (event) => {
        //checks if inputs are not empty
        event.preventDefault();
        var isValid = true;

        var email = document.forms["signupForm"]["email"].value;
        var pass = document.forms["signupForm"]["password"].value;
        var confirmpass = document.forms["signupForm"]["confirmPassword"].value;
        var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/;
        var errors = {};


        if(pass.match(regex)===null){
            console.log('regex')
            isValid=false;
            errors["pass"]="Password must contain 1 number, 1 lowercase letter, 1 uppercase letter and between 8-20 characters";
        }
        if(pass !== confirmpass){
            isValid=false;
            errors["confirm"] = "Passwords do not match";
        }
        if(!isValid){
            console.log(errors);
            this.setState({
                errors: errors
            })
        }
        else{
            this.register(email,pass);
        }
      }



    render(){
        if(this.props.loggedIn){
            return <Redirect to="/viewRecipes"/>
        }
        if(!this.state.new_user){
            return <Redirect to="/login"/>
        }
        return(
            <div className="form">
                <h1 className="landingElement">Sign Up</h1>
                <p className="center error">{this.props.error}</p>
                <Form name="signupForm" onSubmit={this.myRegisterSubmit}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" placeholder="Enter Email" name="email" id="email"></Form.Control>
                    <div className="error">
                        {this.state.errors.email}
                    </div>

                    <Form.Label className="landing-space">Password</Form.Label>
                    <Form.Control required type="password" placeholder="Enter Password" name="password" id="password"></Form.Control>
                    <Form.Text id="passwordHelpBlock" muted>
                        Must be 8-20 characters long.
                    </Form.Text>
                    <div className="error">
                            {this.state.errors.pass}
                    </div>
                    

                    <Form.Label className="landing-space">Confirm Password</Form.Label>
                    <Form.Control required type="password" placeholder="Confirm Password" name="confirmPassword" id="confirmpassword"></Form.Control>
                    <div className="error">
                            {this.state.errors.confirm}
                    </div>


                    <div className="center">
                        <Button variant="create" type="submit">Create Account</Button>
                    </div>
                </Form>
                <div className="center">
                    <Button variant="link" onClick={()=>this.newUser()}>Already have an account? Login </Button>
                </div>
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
    registered: state.registered,
    error: state.error
})

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);