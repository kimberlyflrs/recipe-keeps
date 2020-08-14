import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class EditRecipe extends React.Component{
    constructor(props){
        super(props);
        this.recipe = props.recipe;
        this.title = props.title;
        this.prep = props.prep;
        this.cook = props.cook;
        this.ingridients = props.ingridients;
        this.steps = props.step;
    }
    //upload image

    render(){
        return(
        <div class="form editRecipe">
            <Row>
            <h1>How a Recipe edit looks like</h1>
            </Row>
            <Button>Back to All Recipes</Button>
            <Form>
            <h3>Image goes here</h3>
            <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value="Title Here"></Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>Prep Time:</Form.Label><Form.Control type="text" value="5"></Form.Control> 
            </Form.Group>

            <Form.Group>
            <Form.Label>Cook Time:</Form.Label><Form.Control type="text" value="10"></Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>Ingredients: </Form.Label>
            <Form.Control type="text" value="list of ingredients"></Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>Directions</Form.Label>
            <Form.Control type="textarea" value="list of steps"></Form.Control>
            </Form.Group>

            </Form>


            <Button>Save</Button>
            <Button>Delete</Button>
        </div>

        )
    }

}

export default EditRecipe;