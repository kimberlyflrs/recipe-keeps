//add header and RecipeForm

import React from 'react';
import Header from '../components/Header.js';
import RecipeForm from '../components/RecipeForm.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

//needs an empty form
//we access this page from SingleRecipe.js and they click edit


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
                    <RecipeForm index={0} newRecipe={false}/>
                </Row>
            </Container>
            </div>
        )
    }

}

export default AddRecipe;