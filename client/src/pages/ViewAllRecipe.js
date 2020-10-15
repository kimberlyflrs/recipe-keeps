import React from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header.js';
import RecipeCard from '../components/RecipeCard.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import {Redirect} from 'react-router-dom';
import { userInfo } from '../redux/actions.js';

//add recipe button takes you to the add recipe page

class ViewAllRecipe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            navAddRecipe: false,
            navRecipe: false, //use this so when a card is clicked we take them to the corresponding card
        }
        this.addRecipe = this.addRecipe.bind(this);
    }


    addRecipe(){
        //navigates to the add recipe page
        this.setState({
            navAddRecipe: true
        })
    }

    render(){
        var content; 
        if(this.state.navAddRecipe){
            return <Redirect to="/addRecipe"/>
        }
        if(this.props.all_recipes.length === 0){
            content = <h2>No recipes</h2>
        }
        else{
            content = this.props.all_recipes.map((x, i)=>
            <RecipeCard key={x._id} id={x._id} recipe={x} index={i}/>); //key must be unique error
            console.log(content);
        }
        return(
            <div>
            <Header/>
            <Container fluid className="padding">
                <Row>
                    <Col xs={12} sm={12} m={12} lg={12}>
                        <Button onClick={this.addRecipe}>Add Recipe</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} m={12} lg={12}>
                        <h1>All Recipes</h1>
                    </Col>
                </Row>
                <Row>
                    {content}
                </Row>
            </Container>
            </div>
        )
    }

}


const mapStateToProps = state =>({
    all_recipes: state.recipes,
  });

  const mapDispatchToProps = {
    userInfo
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewAllRecipe);