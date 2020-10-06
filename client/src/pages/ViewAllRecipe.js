import React from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header.js';
import RecipeCard from '../components/RecipeCard.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Redirect} from 'react-router-dom';

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


    componentDidMount(){
        //assuming user is valid
        //load all of the users information
        console.log(this.props.all_recipes);
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
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} m={6} lg={6}>
                    </Col>
                    <Col xs={12} sm={12} m={6} lg={6}>
                    <button onClick={this.addRecipe}>Add Recipe </button>
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
  


export default connect(mapStateToProps)(ViewAllRecipe);