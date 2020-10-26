import React from 'react';
import Header from '../components/Header.js';
import RecipeForm from '../components/RecipeForm.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../components/Footer.js';



//add back button to go back to ViewAllRecipe.js
class AddRecipe extends React.Component{

    render(){
        return(
            <div>
            <Header/>
            <Container fluid className="padding center">
                <Row>
                    <Col>
                    <RecipeForm recipe={{}} newRecipe={true}/>
                    </Col>
                </Row>
            </Container>
            <Footer/>
            </div>
        )
    }

}

export default AddRecipe;