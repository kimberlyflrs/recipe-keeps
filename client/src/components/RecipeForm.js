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
            name: props.recipe.name || "",
            prep: props.recipe.prep_time || "",
            cook: props.recipe.cook_time || "",
            ingredients: props.recipe.ingredients || "",
            directions: props.recipe.directions || "",
    
            newRecipe: props.newRecipe,
            showModal: false,
            index: props.index,

            navAllRecipe:false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
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
        console.log('addRecipe has been clicked');

        event.preventDefault();
        var name = document.forms["recipeForm"]["name"].value;
        var prep = document.forms["recipeForm"]["prep"].value;
        var cook = document.forms["recipeForm"]["cook"].value;
        var ingredients = document.forms["recipeForm"]["ingredients"].value;
        var directions = document.forms["recipeForm"]["directions"].value;

        if(name==="" || prep==="" || cook==="" || ingredients==="" || directions==="" ){
            alert("Field cannot be empty");
        }

        else{
            console.log('making new recipe');

            var newRecipe= {
                name: name,
                prep_time: prep,
                cook_time: cook,
                ingredients: ingredients.split("\n"),
                directions: directions
            }
            if(this.state.newRecipe){
                this.addRecipe(newRecipe); //if new call add recipe
            }
            else{
                this.editRecipe(newRecipe, this.state.index); //else call editRecipe dispatch
            }
        }
      }


    async addRecipe(recipe){
        //adds the recipe and then redirects to all recipes
        console.log('addRecipe has been clicked');
        await this.props.addRecipe(recipe);
        if(this.props.added){
            this.backToAllRecipe()
        }
    }

    async editRecipe(recipe, index){
        //edits the recipe and then redirects to all recipes
        console.log('addRecipe has been clicked');
        await this.props.editRecipe(recipe,index);
        if(this.props.added){
            this.backToAllRecipe()
        }
    }

    async deleteRecipe(){
        console.log(this.state.recipe._id);
        await this.props.deleteRecipe(this.state.recipe._id, this.state.index); //pass entry id
        //call the delete api call here
        this.handleClose();
        //navigate to viewallrecipes
        this.backToAllRecipe();

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
            return <Redirect to="/viewRecipes"/>
        }
        var buttons;
        if(this.state.newRecipe){
            buttons = <Button type="submit">Add Recipe</Button>;
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


            <Form name="recipeForm" onSubmit={this.mySubmitHandler}>
                <h3>Image goes here</h3>
            <Form.Group>
            <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Prep Time:</Form.Label>
                <Form.Control name="prep" type="text" value={this.state.prep} onChange={this.handleInputChange}></Form.Control> 
            </Form.Group>

            <Form.Group>
                <Form.Label>Cook Time:</Form.Label>
                <Form.Control name="cook" type="text" value={this.state.cook} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>Ingredients: </Form.Label>
                <Form.Control name="ingredients" type="text" value={this.state.ingredients} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>Directions</Form.Label>
                <Form.Control name="directions" type="textarea" value={this.state.directions} onChange={this.handleInputChange}></Form.Control>
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

const mapStateToProps = state => ({
    added: state.added
})

export default connect(mapStateToProps,mapDispatchToProps)(RecipeForm);