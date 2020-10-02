import React from 'react';
import Header from '../components/Header.js';
import RecipeForm from '../components/RecipeForm.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


//we access this page from SingleRecipe.js and they click edit


class EditRecipe extends React.Component{
    constructor(props){
        super(props);
        //pass the index here
        
    }

    render(){
        return(
            <div>
            <Header/>
            <Container fluid>
                <Row>
                    <RecipeForm index={0} newRecipe={false} recipe={this.props.location.state.recipe}/>
                </Row>
            </Container>
            </div>
        )
    }

}

export default EditRecipe;