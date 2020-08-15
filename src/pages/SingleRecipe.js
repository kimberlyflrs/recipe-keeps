//add header and recipe view
import React from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header.js';
import RecipeView from '../components/RecipeView.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


//for each item, make a recipe card

class SingleRecipe extends React.Component{
    constructor(props){
        super(props);
        this.view = this.view.bind(this);
    }

    view(){
        console.log(this.props.all_recipes)
    }

    render(){
        return(
            <div>
            <Header/>
            <Container fluid>
                <Row>
                    <RecipeView/>
                </Row>
            </Container>
            </div>
        )
    }

}


const mapStateToProps = state =>({
    all_recipes: state.recipes,
  });
  


export default connect(mapStateToProps)(SingleRecipe);