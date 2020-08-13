import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class RecipeCard extends React.Component{
    constructor(props){
        super(props);
        this.recipe = props.recipe;
    }

    render(){
        return(
        <Card bg="light" style={{width: '18rem'}}>
            <Card.Body>
                <Card.Img variant="top" src=""/>
                <Card.Title>Title</Card.Title>
                <Card.Text>Small Description here</Card.Text>
                <Button>View Recipe</Button>
            </Card.Body>
        </Card>

        )
    }

}

export default RecipeCard;