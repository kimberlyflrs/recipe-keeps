import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';


class RecipeView extends React.Component{
    constructor(props){
        super(props);
        this.index = props.index;
        this.recipe = props.recipe;
        this.state = {
            viewAll:false,
            edit: false
        }
        this.allRecipes = this.allRecipes.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
    }

    //we get to this page from ViewAllRecipe and view recipe is clicked from one of the cards
    //when edit recipe button is clicked, we navigate to EditRecipe.js
    //we should pass the index to it from here

    componentDidMount(){
        console.log("recipe view");
    }

    allRecipes(){
        //return to all recipes
        this.setState({
            viewAll:true
        })
    }

    editRecipe(){
        //navigate to edit mode for recipe
        console.log('going to edit recipe from recipeview');
        this.setState({
            edit: true
        })
    }

    render(){
        if(this.state.viewAll){
            return <Redirect to="/viewRecipes"/>
        }

        if(this.state.edit){
            var link = "/recipe/edit/"+this.recipe._id
            return <Redirect to={{pathname: link, state:{recipe: this.recipe, index:this.index}} }/>
        }


        return(
        <div className="form recipeView">
            <h1>What a Recipe view will look like</h1>
            <Row>
                <Col><Button onClick={this.allRecipes}>Back to All Recipes</Button></Col>
                <Col><Button onClick={this.editRecipe}>Edit Recipe</Button></Col>
            </Row>
            <h3>Image goes here</h3>
            <h1>{this.props.recipe.name}</h1>
            <Row>
        <Col><h3>Prep Time: {this.props.recipe.prep_time}</h3></Col>
        <Col><h3>Cook Time: {this.props.recipe.cook_time}</h3></Col>
            </Row>
            <h3>Ingredients: </h3>
            <p>{this.props.recipe.ingredients}</p>
            <h3>Directions</h3>
            <p>{this.props.recipe.directions}</p>
        </div>

        )
    }

}

export default RecipeView;