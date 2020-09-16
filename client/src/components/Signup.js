import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../redux/actions';


class SignUp extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            new_user: true,
            info_valid:false
        }
        this.newUser = this.newUser.bind(this);
        this.login = this.login.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
    }

    //check the password, (if no match, show error)
    //check if the account exists (if yes, show error)(else make account)
    //

    //make function to change login to signup
    newUser(){
        this.setState({
            new_user: !(this.state.new_user)
        })
        console.log(this.state.new_user);
    }

    //login
    login(email, password){
    //attempt to find user with this info call the login prop
    //if found
    this.props.login();
        this.setState({
            info_valid: true
        })
    //else show error
    //else show error

    }

    mySubmitHandler = (event) => {
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

    render(){
        if(this.state.info_valid){
            return <Redirect to="/viewRecipes"/>
        }
        if (this.state.new_user){
            return(
                <div className="form">
                    <h1>Login</h1>
                    <Form name="loginForm" onSubmit={this.mySubmitHandler}>
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
                <Form>
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

                    <Button>Create Account</Button>
                </Form>
                <button onClick={()=>this.newUser()}>Already have an account? Login </button>
            </div>

        )
    }

}

const mapDispatchToProps = {
    login
};

export default connect(null,mapDispatchToProps)(SignUp);