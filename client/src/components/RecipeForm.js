import React from 'react';
import {connect} from 'react-redux';
import {addRecipe, deleteRecipe, editRecipe, userInfo, loading, error} from '../redux/actions';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import Loading from '../components/Loading.js';


//Recipe Form can display edit mode and create a new recipe

class RecipeForm extends React.Component{
    constructor(props){
        super();
        this.state = {
            recipe: props.recipe,
            name: props.recipe.name || "",
            prep: props.recipe.prep_time || "",
            cook: props.recipe.cook_time || "",
            ingredients: props.recipe.ingredients.join(",") || "", 
            directions: props.recipe.directions || "",
            image: props.recipe.image ||"",//preview image
            key: props.recipe.imageKey || "", //previous image key 
            location: props.recipe.image || "", //previous image name
            file: "", //image file
    
            newRecipe: props.newRecipe, //true or false [if true, empty form else preload it with info]
            showModal: false,
            index: props.index,//used to index in backend and redux state
            link: "",

            navBackRecipe:false,
            navAllRecipe:false //go to all recipes
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.backToAllRecipe = this.backToAllRecipe.bind(this);
        this.previewImage = this.previewImage.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.fileSize = this.fileSize.bind(this);
    }

    async componentDidMount(){
        await this.props.userInfo();
        console.log("component mounting: "+typeof this.state.ingredients);
    }

    handleInputChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        const file = document.getElementById('recipe_image').files;

        const formData = new FormData(); 
        formData.append("img", file[0]); 

        var name = document.getElementById("name").value;
        var prep = document.forms["recipeForm"]["prep"].value;
        var cook = document.forms["recipeForm"]["cook"].value;
        var ingredients = document.forms["recipeForm"]["ingredients"].value;
        var directions = document.forms["recipeForm"]["directions"].value;


        formData.append("name", name);
        formData.append("prep_time", prep);
        formData.append("cook_time", cook);
        formData.append("ingredients", ingredients);
        formData.append("directions", directions);

    
        this.props.loading();
        if(this.state.newRecipe){
            formData.append("imgKey", " ");
            formData.append("imgLoc", " ");
            this.addRecipe(formData);
        }
        else{
            //passing new recipe and image, index, old filename
            formData.append("index", this.state.index);
            formData.append("imgKey", this.state.key);
            formData.append("imgLoc", this.state.location);
            this.editRecipe(formData, this.state.index);
        }
      }


    async addRecipe(recipe){
        //adds the recipe and then redirects to all recipes
        await this.props.addRecipe(recipe);
        if(this.props.added){//check for an error instead (if successful, or token expired attempt back to all recipe)
            this.backToAllRecipe()
        }
    }


    async editRecipe(recipe, index){
        //edits the recipe and then redirects to all recipes
        console.log(this.state.ingredients);
        await this.props.editRecipe(recipe,index, this.state.key);
        console.log(typeof this.state.ingredients);
        var ingredientsList = this.state.ingredients.split(",");
        if(this.props.added){
            var recipe_copy = {
                name: this.state.name,
                prep_time: this.state.prep,
                cook_time: this.state.cook,
                ingredients: ingredientsList, //check this out
                directions: this.state.directions,
                image: this.state.image,//preview image
                imageKey: this.state.key, //previous image key 
                _id: this.state.recipe._id
            }
            this.setState({
                recipe: recipe_copy,
                navBackRecipe:true,
                link: "/recipe/view/"+this.state.recipe._id
            })
        }
    }

    async deleteRecipe(){
        //Deletes a recipe from DB and then redirects to all recipes page
        this.props.loading();
        await this.props.deleteRecipe(this.state.recipe._id, this.state.index, this.state.key);
        this.handleClose();
        this.backToAllRecipe(true);

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

    backToAllRecipe(deleteRecipe){
        //if new recipe, go back to all recipes
        //if recipe exists, go back to that recipe
        if(this.state.newRecipe || deleteRecipe===true){
            this.setState({
                navAllRecipe:true
            })
        }
        else{
            console.log(this.state.recipe._id);
            this.setState({
                navBackRecipe:true,
                link: "/recipe/view/"+this.state.recipe._id
            })
        }
    }


    previewImage(event){
        //allows the user to preview image before uploading
        var size = this.fileSize(event.target.files[0]);
        console.log(size);
        if(size){
            this.props.error("")
            this.setState({
                image: URL.createObjectURL(event.target.files[0]),
              })
        }
        else{
            this.deleteImage();
            this.props.error("File must be < 2 MB.")
        }

    }

    deleteImage(){
        //removes the image file
        document.getElementById('recipe_image').value = null; 
        this.setState({
            file: "",
            image: "",
            imageKey: "",
            location: ""
        })
    }

    fileSize(file){
        //checks that the file size is under mb
        //returns true if meets size, false if otherwise
        var size= file.size;
        if (size>2000000){//2 mb
            return false
        }
        return true
    }



    render(){
        if(this.state.navAllRecipe){
            return <Redirect to="/viewRecipes"/>
        }
        if(!this.props.loggedIn){
            return <Redirect to="/login"/>
        }
        if(this.state.navBackRecipe){
            console.log(this.state.link);
            console.log(this.state.recipe);
            return <Redirect to={{pathname: this.state.link, state:{recipe: this.state.recipe, index:this.state.index}} }/>
        }
        var buttons;
        var title;
        if(this.state.newRecipe){
            buttons = <Button type="submit" className="btn-bblue">Add Recipe</Button>;
            title = "Add a Recipe";
        }
        else{
            buttons = <Button type="submit" className="btn-bblue">Save</Button>;
            var deleteBtn = <Button className="btn-delete" variant="danger" onClick={this.showModal}>Delete</Button>;
            title = "Editing a Recipe";

        }

        if(this.props.isLoading){
            return(
                <Loading/>
            )
        }

        else{
        return(
        <div className="form center editRecipe">
            <Row className="spacing">
                <Col>
                <Button className="btn-bblue" onClick={this.backToAllRecipe}>Back To Recipe</Button>
                </Col>
                <Col className="right">
                {deleteBtn}
                </Col>
            </Row>

            <h1>{title}</h1>
            <p className="center error">{this.props.error_message}</p>
            <Form name="recipeForm" onSubmit={this.mySubmitHandler}> 
            <Form.Group as={Row} className="left-text spacing">
                <Form.Label column sm="2" className="title">Recipe Name</Form.Label>
                <Col sm="10">
                <Form.Control type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange}></Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="left-text spacing">
                <Form.Label column sm="12" className="title">Image Upload</Form.Label>
            </Form.Group>
            <Form.Group as={Row} className="left-text">
                <Col xs="12" sm="12" md="4" lg="4">
                    <Form.File id="recipe_image" accept="image/*" onChange={this.previewImage}>
                    </Form.File>
                </Col>
                <Col xs="12" sm="12" md="4" lg="4">
                    <img src={this.state.image} className="recipe-image" id="preview" alt="No file found"/>
                </Col>
                <Col xs="12" sm="12" md="4" lg="4">
                    <Button onClick={this.deleteImage}>Remove Image</Button>
                </Col>
            </Form.Group>


            <Form.Row className="left-text spacing">
                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" className="title">Prep Time:</Form.Label>
                        <Col sm="7">
                        <Form.Control name="prep" type="text" value={this.state.prep} onChange={this.handleInputChange}></Form.Control> 
                        </Col>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" className="title">Cook Time:</Form.Label>
                        <Col sm="7">
                        <Form.Control name="cook" type="text" value={this.state.cook} onChange={this.handleInputChange}></Form.Control>
                        </Col>
                    </Form.Group>
                </Col>
            </Form.Row>

            <Form.Group className="left-text spacing">
            <Form.Label className="title">Ingredients: (Separate each ingredient with a comma ',')</Form.Label>
                <Form.Control name="ingredients" as="textarea" rows="4" value={this.state.ingredients} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>

            <Form.Group className="left-text spacing">
            <Form.Label className="title">Directions</Form.Label>
                <Form.Control name="directions" as="textarea" rows="4" value={this.state.directions} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>

            {buttons}
            </Form>


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
          <Button variant="danger" onClick={this.deleteRecipe}>Yes</Button>
        </Modal.Footer>
      </Modal>

        </div>
        )}
    }
}





const mapDispatchToProps = {
    addRecipe,
    deleteRecipe,
    editRecipe,
    userInfo,
    loading,
    error
};

const mapStateToProps = state => ({
    added: state.added,
    loggedIn: state.logged_in,
    isLoading: state.isLoading,
    error_message: state.error
})

export default connect(mapStateToProps,mapDispatchToProps)(RecipeForm);