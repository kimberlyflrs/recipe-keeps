import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login, userInfo} from '../redux/actions';

//Signup can only be accessed if there is no token
class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            new_user: true,
            info_valid:false,
        }
        this.newUser = this.newUser.bind(this);
        this.login = this.login.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
    }

    componentDidMount(){
        //we will be checking if there is a token present
        //if yes, then redirect them to the home page
        console.log('mounted component');
        /*const token = localStorage.getItem('token');

        if(token){//if there is a token present
            console.log(token);
            try{
                fetch('https://localhost:5000/verify?token='+token.token)
                .then(res=>res.json())
                .then(data => {
                    console.log(data);
                    if(data.status){
                        this.setState({
                            info_valid:true,
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
        else{
            //do nothing and render page as normal
            console.log('no token available');
        }*/
    }

    //make function to change login to signup
    newUser(){
        this.setState({
            new_user: !(this.state.new_user)
        })
        console.log(this.state.new_user);
    }

    //login
    async login(email, password){
        console.log("here it's the login function");
        await this.props.login(email,password);
        console.log(this.props.loggedIn)
        if(this.props.loggedIn){
            this.props.userInfo();
        }
        else{
            console.log('invalid login info')
        }
    }


    register(name, email, password){
        //await the registration
        //now login
        //success then load the use info
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
        if(this.props.loggedIn){
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
    login,
    userInfo
};

const mapStateToProps = state => ({
    loggedIn: state.logged_in
})

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);