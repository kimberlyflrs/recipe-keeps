import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import Holder from './holder.svg';


class RecipeCard extends React.Component{
    constructor(props){
        super(props);
        this.recipe = props.recipe;
        this.index = props.index;
        this.id = props.id;
        this.state={
            navRecipe:false,
        }
        this.goToRecipe = this.goToRecipe.bind(this);
    }

    //view recipe btn should take the user to the singleRecipe page
    goToRecipe(){
        //set it ready to navigate to specific recipe page
        console.log(this.props.id);
        this.setState({
            navRecipe: true,
        })
    }

    componentDidMount(){
        //console.log(this.recipe);
    }


    render(){
        if(this.state.navRecipe){
            var link = "/recipe/view/"+this.recipe._id
            return <Redirect to={{pathname: link, state:{recipe: this.recipe}}} /> //pass props here
        }


        return(
        <Card bg="light" style={{width: '18rem'}} className="card">
            <Card.Img variant="top" src={Holder} />
            <Card.Body>
                <Card.Title>{this.recipe.name}</Card.Title>
                <Button onClick={this.goToRecipe}>View Recipe</Button>
            </Card.Body>
        </Card>

        )
    }

}

export default RecipeCard;