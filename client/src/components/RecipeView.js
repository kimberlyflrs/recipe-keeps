import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';


class RecipeView extends React.Component{
    constructor(props){
        super(props);
        this.recipe = props.recipe;
        this.index = props.index;
    }

    //we get to this page from ViewAllRecipe and view recipe is clicked from one of the cards
    //when edit recipe button is clicked, we navigate to EditRecipe.js
    //we should pass the index to it from here

    render(){
        return(
        <div class="form recipeView">
            <h1>What a Recipe view will look like</h1>
            <Row>
                <Col><Button>Back to All Recipes</Button></Col>
                <Col><Button>Edit Recipe</Button></Col>
            </Row>
            <h3>Image goes here</h3>
            <h1>Title here</h1>
            <Row>
                <Col><h3>Prep Time: </h3></Col>
                <Col><h3>Cook Time: </h3></Col>
            </Row>
            <h3>Ingredients: </h3>
            <p>List of Ingredients here</p>
            <h3>Directions</h3>
            <p>List of Steps here</p>
        </div>

        )
    }

}

export default RecipeView;