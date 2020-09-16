import React from 'react';
import {connect} from 'react-redux';
import {addRecipe, deleteRecipe, editRecipe} from '../redux/actions';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';


//Recipe Form can display edit mode and create a new recipe

class RecipeForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            recipe: props.recipe,
            name: props.name || "",
            prep: props.prep || "",
            cook: props.cook || "",
            ingridients: props.ingridients || "",
            steps: props.step || "",
    
            newRecipe: props.newRecipe,
            showModal: false,
            index: this.props.index,

            navAllRecipe:false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.backToAllRecipe = this.backToAllRecipe.bind(this);
    }

    handleInputChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        if(this.state.name==="" || this.state.prep === "" || this.state.cook ==="" || this.state.prep==="" || this.state.steps ==="" || this.state.ingridients===""){
            alert("Field cannot be empty");
        }
        else{
            var newRecipe= {
                name:this.state.name,
                prep:this.state.prep,
                cook: this.state.cook,
                ingredients:this.state.ingridients,
                directions: this.state.steps
            }
            if(this.state.newRecipe){
                this.props.addRecipe(newRecipe); //if new call this, else call editRecipe dispatch
            }
            else{
                this.props.editRecipe(newRecipe, this.state.index); //if new call this, else call editRecipe dispatch
            }

            //possibly another function to add it to the database [future]
            //redirect to view recipe page after adding
        }
      }


    deleteRecipe(){
        this.props.deleteRecipe(this.state.index);
        this.handleClose();

    }

    showModal(){
        this.setState({
            showModal:true
        })
    }
  
    handleClose(){
        this.setState({
            showModal: false
        })
    }

    backToAllRecipe(){
        this.setState({
            navAllRecipe:true
        })
    }


    //upload image

    render(){
        if(this.state.navAllRecipe){
            return <Redirect to="viewRecipes"/>
        }
        var buttons;
        if(this.state.newRecipe){
            buttons = <button type="submit">Add Recipe</button>;
        }
        else{
            buttons = <button type="submit">Save</button>;
            var deleteBtn = <button onClick={this.showModal}>Delete</button>;

        }
        return(
        <div className="form editRecipe">
            <Row>
            <h1>How a Recipe Form looks like</h1>
            </Row>
            <Button onClick={this.backToAllRecipe}>Back to All Recipes</Button>
            <Form onSubmit={this.mySubmitHandler}>
            <h3>Image goes here</h3>
            <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange}></Form.Control>
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
            {deleteBtn}


            <Modal
        show={this.state.showModal}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this recipe?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={this.deleteRecipe}>Yes</Button>
        </Modal.Footer>
      </Modal>



        </div>

        )
    }

}

//connect redux dispatch here
const mapDispatchToProps = {
    addRecipe,
    deleteRecipe,
    editRecipe
};

export default connect(null,mapDispatchToProps)(RecipeForm);