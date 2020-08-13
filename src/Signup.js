import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.login = props.login;
    }

    //check the password, (if no match, show error)
    //check if the account exists (if yes, show error)(else make account)
    //

    render(){
        if (this.login){
            return(
                <div class="form">
                    <h1>Login</h1>
                    <Form>
                        <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email"></Form.Control>
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password"></Form.Control>
                        </Form.Group>

                        <Button>Login</Button>
                    </Form>
                    <a href="">New to RecipeKeeps? Sign Up</a>
                </div>
            )
        }
        return(
            <div class="form">
                <h1>Sign Up</h1>
                <Form>
                    <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password"></Form.Control>
                    </Form.Group>

                    <Button>Create Account</Button>
                </Form>
                <a href="">Already have an account? Login </a>
            </div>

        )
    }

}

export default SignUp;