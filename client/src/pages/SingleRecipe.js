import React from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header.js';

import Footer from '../components/Footer.js';
import RecipeView from '../components/RecipeView.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


//for each item, make a recipe card
//maybe put the back button here to go back to ViewAllRecipe.js

class SingleRecipe extends React.Component{
    constructor(props){
        super(props);
        this.view = this.view.bind(this);
    }

    view(){
        console.log(this.props.all_recipes)
    }

    componentDidMount(){
        console.log(this.props.location.state.recipe);
        console.log("recipe index: "+ this.props.location.state.index);
    }

    render(){
        return(
            <div>
            <Header/>
            <Container fluid className="padding center">
                <Row>
                <Col xs={12} sm={12} m={12} lg={12}>
                    <RecipeView recipe={this.props.location.state.recipe} index={this.props.location.state.index}/>
                </Col>
                </Row>
            </Container>
            <Footer/>
            </div>
        )
    }

}


const mapStateToProps = state =>({
    all_recipes: state.recipes,
    logged_in: state.logged_in
  });
  


export default connect(mapStateToProps)(SingleRecipe);