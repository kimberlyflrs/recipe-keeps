import React from 'react';
import Header from '../components/Header.js';
import EditRecipe from '../components/EditRecipe.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//needs an empty form

class AddRecipe extends React.Component{
    constructor(props){
        super(props);
        
    }

    addRecipe(){
        //adds a recipe to the user's recipe
    }

    render(){
        return(
            <div>
            <Header/>
            <Container fluid>
                <Row>
                    <EditRecipe title="Chip" newRecipe="true"/>
                </Row>
            </Container>
            </div>
        )
    }

}

export default AddRecipe;