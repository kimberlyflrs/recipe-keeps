import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';


class RecipeCard extends React.Component{
    constructor(props){
        super();
        this.recipe = props.recipe;
        this.index = props.index;
        this.id = props.id;
        this.state={
            navRecipe:false,
        }
        this.goToRecipe = this.goToRecipe.bind(this);
    }



    goToRecipe(){
        this.setState({
            navRecipe: true,
        })
    }


    render(){
        if(this.state.navRecipe){
            var link = "/recipe/view/"+this.recipe._id
            return <Redirect to={{pathname: link, state:{recipe: this.recipe, index:this.index}}} />
        }

        return(
        <Card bg="light" style={{width: '18rem'}} className="card">
            <Card.Img variant="top" src={this.recipe.image} />
            <Card.Body>
                <Card.Title>{this.recipe.name}</Card.Title>
                <Button onClick={this.goToRecipe}>View Recipe</Button>
            </Card.Body>
        </Card>

        )
    }

}

export default RecipeCard;