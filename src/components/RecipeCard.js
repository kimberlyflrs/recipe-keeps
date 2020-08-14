import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class RecipeCard extends React.Component{
    constructor(props){
        super(props);
        this.title = props.title;
        this.prep = props.prep;
    }

    render(){
        return(
        <Card bg="light" style={{width: '18rem'}}>
            <Card.Body>
                <Card.Img variant="top" src=""/>
                <Card.Title>{this.title}</Card.Title>
                <Card.Text>{this.prep}</Card.Text>
                <Button>View Recipe</Button>
            </Card.Body>
        </Card>

        )
    }

}

export default RecipeCard;