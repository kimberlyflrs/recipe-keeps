import React from 'react';
import Header from '../components/Header.js';
import RecipeForm from '../components/RecipeForm.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


//we access this page from SingleRecipe.js and they click edit


class EditRecipe extends React.Component{

    render(){
        return(
            <div>
            <Header/>
            <Container fluid>
                <Row>
                    <RecipeForm index={this.props.location.state.index} newRecipe={false} recipe={this.props.location.state.recipe}/>
                </Row>
            </Container>
            </div>
        )
    }

}

export default EditRecipe;