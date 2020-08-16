import React from 'react';
import Header from '../components/Header.js';
import RecipeForm from '../components/RecipeForm.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

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
                    <RecipeForm newRecipe={true}/>
                </Row>
            </Container>
            </div>
        )
    }

}

export default AddRecipe;