import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



class SignUp extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            new_user: true
        }
        this.newUser = this.newUser.bind(this);
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

    render(){
        if (this.state.new_user){
            return(
                <div className="form">
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
                <button onClick={()=>this.newUser()}>Already have an account? Login </button>
            </div>

        )
    }

}

export default SignUp;