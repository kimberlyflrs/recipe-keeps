import React from 'react';
import Header from '../components/Header.js';
import RecipeForm from '../components/RecipeForm.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Footer from '../components/Footer.js';


//we access this page from SingleRecipe.js and they click edit


class EditRecipe extends React.Component{

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
                    <RecipeForm index={this.props.location.state.index} newRecipe={false} recipe={this.props.location.state.recipe}/>
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

export default connect(mapStateToProps)(EditRecipe);