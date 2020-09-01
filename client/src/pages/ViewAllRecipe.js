import React from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header.js';
import RecipeCard from '../components/RecipeCard.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


//add recipe button takes you to the add recipe page

class ViewAllRecipe extends React.Component{
    constructor(props){
        super(props);
        this.view = this.view.bind(this);
    }

    view(){
        console.log(this.props.all_recipes)
    }

    render(){
        var content = this.props.all_recipes.map((x, i)=>
            <RecipeCard key={i} title={x.name} prep={x.prep_time} index={i}/>
        );
        return(
            <div>
            <Header/>
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} m={6} lg={6}>
                    </Col>
                    <Col xs={12} sm={12} m={6} lg={6}>
                    <button>Add Recipe </button>
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