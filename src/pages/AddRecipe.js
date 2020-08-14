import React from 'react';
import Header from '../components/Header.js';
import RecipeCard from '../components/RecipeCard.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//needs an empty form

class AddRecipe extends React.Component{
    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <div>
            <Header/>
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} m={6} lg={6}>
                    </Col>
                    <Col xs={12} sm={12} m={6} lg={6}>
                    <button>Add Recipe </button>
                    </Col>
                </Row>
                <Row>
                    <RecipeCard/>
                </Row>
            </Container>
            </div>
        )
    }

}

export default AddRecipe;