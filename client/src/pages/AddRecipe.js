import React from 'react';
import Header from '../components/Header.js';
import RecipeForm from '../components/RecipeForm.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../components/Footer.js';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';



//add back button to go back to ViewAllRecipe.js
class AddRecipe extends React.Component{

    render(){
        if(!this.props.logged_in){
            return <Redirect to="/login"/>
        }
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



const mapStateToProps = state => ({
    logged_in: state.logged_in
})

export default connect(mapStateToProps)(AddRecipe);