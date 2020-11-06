import React from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header.js';
import RecipeCard from '../components/RecipeCard.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer.js';
import Loading from '../components/Loading.js';
import Form from 'react-bootstrap/Form';

import {Redirect} from 'react-router-dom';
import { userInfo, loading } from '../redux/actions.js';

//add recipe button takes you to the add recipe page

class ViewAllRecipe extends React.Component{
    constructor(props){
        super();
        this.state = {
            navAddRecipe: false,
            navRecipe: false, //use this so when a card is clicked we take them to the corresponding card
            filterList: []
        }
        this.addRecipe = this.addRecipe.bind(this);
        this.tryAgain = this.tryAgain.bind(this);
        this.searchList = this.searchList.bind(this);
    }

    async componentDidMount(){
        this.props.loading();
        await this.props.userInfo();
        this.setState({
            filterList: this.props.all_recipes
        })
    }
    

    addRecipe(){
        //navigates to the add recipe page
        this.setState({
            navAddRecipe: true
        })
    }

    searchList(){
        //returns a filtered list
        console.log("searching through list");
        var name = document.getElementById('searchbar').value;
        const filter = this.props.all_recipes.filter(recipe =>
            {
                return recipe.name.toLowerCase().includes(name.toLowerCase())
            })
        this.setState({
            filterList: filter
        })
    }


    async tryAgain(){
        //let's the user reload recipes again
        this.props.loading();
        await this.props.userInfo();
    }

    render(){
        var content; 
        if(this.state.navAddRecipe){
            return <Redirect to="/addRecipe"/>
        }
        if(!this.props.logged_in){
            return <Redirect to="/login"/>
        }
        if(this.props.all_recipes.length === 0){
            content = <h2>No recipes</h2>
        }

        content = this.state.filterList.map((x, i)=>
            <div className="center2">
                <RecipeCard key={x._id} id={x._id} recipe={x} index={i} image={x.image}/>
            </div>)

        if(this.props.isLoading){
            return(
            <div>
                <Header/>
                <Container fluid className="padding">
                    <Row className="spacing">
                        <Col xs={12} sm={12} m={12} lg={12}>
                            <Loading/>
                        </Col>
                    </Row>
                </Container>
            </div>)
        }
        if(this.props.error !== ""){
            return(
                <div>
                    <Header/>
                    <Container fluid className="padding">
                        <Row className="spacing">
                            <Col xs={12} sm={12} m={12} lg={12}>
                                <h3>Cannot get Recipes At This Time</h3>
                                <Button className="center" onClick={this.tryAgain}>Try Again</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>)
        }
        else{
        return(
            <div>
            <Header/>
            <Container fluid className="padding">
                <Row className="spacing">
                    <Col xs={12} sm={12} m={12} lg={12}>
                        <h1>All Recipes</h1>
                    </Col>
                </Row>

                <Row className="spacing center">
                    <Col xs={12} sm={12} m={6} lg={6} className="my-auto">
                    <Form>
                        <Form.Group as={Row}>
                        <Form.Label column sm={2}>Search: </Form.Label>
                        <Col sm="10">
                        <Form.Control placeholder="Search for Recipes" name="searchbar" id="searchbar" onChange={this.searchList}></Form.Control>
                        </Col>
                        </Form.Group>
                    </Form>
                    </Col>

                    <Col xs={12} sm={12} m={6} lg={6} className="my-auto">
                    <Button className="btn-edit" onClick={this.addRecipe}>Add Recipe</Button>
                    </Col>
                </Row>
                <Row>
                    {content}
                </Row>
            </Container>
            <Footer/>
            </div>
        )}
    }

}


const mapStateToProps = state =>({
    all_recipes: state.recipes,
    logged_in: state.logged_in,
    isLoading: state.isLoading,
    error: state.error
  });

  const mapDispatchToProps = {
    userInfo,
    loading,
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewAllRecipe);