import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';



class RecipeView extends React.Component{
    constructor(props){
        super();
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
        var ingredients;
        if(this.state.viewAll){
            return <Redirect to="/viewRecipes"/>
        }

        if(this.state.edit){
            var link = "/recipe/edit/"+this.recipe._id
            return <Redirect to={{pathname: link, state:{recipe: this.recipe, index:this.index}} }/>
        }
        console.log(this.props.recipe.ingredients);
        ingredients = this.props.recipe.ingredients.map((item,key)=>
            <li key={key}><span>{item}</span></li>)


        return(
        <div>
            <Row>
            <Col xs={6} sm={6} m={6} lg={6}>
                <Button className="btn-bblue" onClick={this.allRecipes}>Back to All Recipes</Button>
            </Col>
            <Col xs={6} sm={6} m={6} lg={6}>                                    
                <Button className="btn-bblue"onClick={this.editRecipe}>Edit</Button>
            </Col>
            </Row>
            <div className="recipe-bg">
            <Row className="row-space">
                <Col>
                <h1>{this.props.recipe.name}</h1>
                </Col>
            </Row>
            <Row className="row-space">
                <Col className="center-image">
                <img className="responsive" src={this.props.recipe.image} alt="recipe"/>
                </Col>
            </Row>
            <Row className="row-space">
                <Col xs={6} sm={6} m={6} lg={6}>
                    <h5><span className="title">Prep Time:</span> {this.props.recipe.prep_time}</h5>
                </Col>
                <Col xs={6} sm={6} m={6} lg={6}>
                    <h5><span className="title">Cook Time:</span> {this.props.recipe.cook_time}</h5>
                </Col>
            </Row>
            <Row className="row-space">
                <Col xs={12} sm={12} m={12} lg={12}>
                    <h5 className="title">Ingredients:</h5>
                    <ul>{ingredients}</ul>
                </Col>
            </Row>
            <Row className="row-space">
                <Col xs={12} sm={12} m={12} lg={12} className="left">
                    <h5 className="title">Directions:  </h5>
                    <p>{this.props.recipe.directions}</p>
                </Col>
            </Row>
            </div>
        </div>

        )
    }

}

export default RecipeView;