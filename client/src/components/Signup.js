import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../redux/actions';
import { getFromStorage, setInStorage} from '../utils/storage.js';


class SignUp extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            new_user: true,
            info_valid:false,
            token: ''
        }
        this.newUser = this.newUser.bind(this);
        this.login = this.login.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
    }

    //check the password, (if no match, show error)
    //check if the account exists (if yes, show error)(else make account)
    //

    componentDidMount(){
        //we will be checking if there is a token present
        const token = getFromStorage('the_main_app');
        //console.log(token.token);
        //console.log(this.state);
        try{

            fetch('/verify?token='+token.token)
            .then(res=>res.json())
            .then(data => {
                console.log(data);
                if(data.status){
                    this.setState({
                        info_valid:true,
                        token: token,
                    })
                    console.log('i set the token');
                }
                else{
                    console.log('whoops');
                    this.setState({
                        info_valid:false
                    })
                }
            })
        }catch(err){
            console.log('no token available');
        }
    }

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
    /*this.props.login();
        this.setState({
            info_valid: true
        })*/
    console.log("here it's the login function");
    fetch('/login', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.forms["loginForm"]["email"].value,
            password: document.forms["loginForm"]["password"].value
        })
    }).then(res =>res.json())
    .then(data => {
        console.log(data);
        if(data.status){
            setInStorage('the_main_app', {token: data.token});
            this.setState({
                token: data.token,
                new_user:false,
                info_valid: true
            })
        }
        else{
            console.log('Error: '+data.message)
        }
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
        if(this.state.token){
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