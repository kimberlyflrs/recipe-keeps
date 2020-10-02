import React from 'react';
import Header from '../components/Header.js';
import RecipeForm from '../components/RecipeForm.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';



//add back button to go back to ViewAllRecipe.js
class AddRecipe extends React.Component{

    render(){
        return(
            <div>
            <Header/>
            <Container fluid>
                <Row>
                    <RecipeForm recipe={{}} newRecipe={true}/>
                </Row>
            </Container>
            </div>
        )
    }

}

export default AddRecipe;