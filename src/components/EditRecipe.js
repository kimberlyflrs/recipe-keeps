import React from 'react';
import {connect} from 'react-redux';
import {addRecipe} from '../redux/actions';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


//change name to recipe form

class EditRecipe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            recipe: props.recipe,
            title: props.title || "",
            prep: props.prep || "",
            cook: props.cook || "",
            ingridients: props.ingridients || "",
            steps: props.step || "",
    
            newRecipe: props.newRecipe,

            validated: false,
            setValidated: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
    }

    handleInputChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        if(this.state.title==="" || this.state.prep === "" || this.state.cook ==="" || this.state.prep==="" || this.state.steps ==="" || this.state.ingridients===""){
            alert("Field cannot be empty");
        }
        else{
            var newRecipe= {
                title:this.state.title,
                prep:this.state.prep,
                cook: this.state.cook,
                ingredients:this.state.ingridients,
                directions: this.state.steps
            }
            this.props.addRecipe(newRecipe);
            //possibly another function to add it to the database [future]
            //redirect to view recipe page after adding
        }
      }

  


    //upload image

    render(){
        if(this.state.newRecipe){
            var buttons = <button type="submit">Add Recipe</button>;
        }
        else{
            var buttons = <div><button>Save</button><button>Delete</button></div>;

        }
        return(
        <div className="form editRecipe">
            <Row>
            <h1>How a Recipe Form looks like</h1>
            </Row>
            <Button>Back to All Recipes</Button>
            <Form onSubmit={this.mySubmitHandler}>
            <h3>Image goes here</h3>
            <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" value={this.state.title} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>

            <Form.Group controlId="formPrep">
        <Form.Label>Prep Time:</Form.Label><Form.Control name="prep" type="text" value={this.state.prep} onChange={this.handleInputChange}></Form.Control> 
            </Form.Group>

            <Form.Group controlId="formCook">
        <Form.Label>Cook Time:</Form.Label><Form.Control name="cook" type="text" value={this.state.cook} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>

            <Form.Group controlId="formIngredients">
            <Form.Label>Ingredients: </Form.Label>
        <Form.Control name="ingridients" type="text" value={this.state.ingridients} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>

            <Form.Group controlId="formDirections">
            <Form.Label>Directions</Form.Label>
        <Form.Control name="steps" type="textarea" value={this.state.steps} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>

            {buttons}
            </Form>

        </div>

        )
    }

}

//connect redux dispatch here
const mapDispatchToProps = {
    addRecipe
};

export default connect(null,mapDispatchToProps)(EditRecipe);