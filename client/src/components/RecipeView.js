import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import Holder from './holder.svg';



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
        <div className="form">
            <Row>
            <Col xs={6} sm={6} m={6} lg={6}>
                <Button onClick={this.allRecipes}>Back to All Recipes</Button>
            </Col>
            <Col xs={6} sm={6} m={6} lg={6}>                    
                <Button onClick={this.editRecipe}>Edit Recipe</Button>
            </Col>
            </Row>
            <h1>{this.props.recipe.name}</h1>
            <img src={Holder} alt="recipe"/>
            <Row>
            <Col xs={6} sm={6} m={6} lg={6}>
                <h3>Prep Time: {this.props.recipe.prep_time}</h3>
            </Col>
            <Col xs={6} sm={6} m={6} lg={6}>
                <h3>Cook Time: {this.props.recipe.cook_time}</h3>
            </Col>
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