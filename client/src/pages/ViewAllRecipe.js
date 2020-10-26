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
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

import {Redirect} from 'react-router-dom';
import { userInfo, loading } from '../redux/actions.js';

//add recipe button takes you to the add recipe page

class ViewAllRecipe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            navAddRecipe: false,
            navRecipe: false, //use this so when a card is clicked we take them to the corresponding card
            sort: false
        }
        this.addRecipe = this.addRecipe.bind(this);
        this.sortNewToOld = this.sortNewToOld.bind(this);
        this.sortOldToNew = this.sortOldToNew.bind(this);
        this.tryAgain = this.tryAgain.bind(this);
    }

    async componentDidMount(){
        console.log('view all recipe already mounted');
        this.props.loading();
        await this.props.userInfo();
    }
    

    addRecipe(){
        //navigates to the add recipe page
        this.setState({
            navAddRecipe: true
        })
    }

    sortNewToOld(){
        //sorts recipe new to old
        this.setState({
            sort:true
        })
    }

    sortOldToNew(){
        //sorts recipe old to new
        this.setState({
            sort:false
        })
    }

    async tryAgain(){
        //let's the user reload recipes again
        this.props.loading();
        await this.props.userInfo();
    }

    render(){
        console.log('view all recipe page');
        var content; 
        if(this.state.navAddRecipe){
            return <Redirect to="/addRecipe"/>
        }
        if(!this.props.logged_in){
            return <Redirect to="/landing"/>
        }
        if(this.props.all_recipes.length === 0){
            content = <h2>No recipes</h2>
        }
        else{
            if(this.state.sort){
                content = this.props.all_recipes;
                content.reverse();
                console.log('new to old')
                console.log(this.props.all_recipes);
                content = content.map((x, i)=>
                <div className="center2">
                <RecipeCard key={x._id} id={x._id} recipe={x} index={i} image={x.image}/>
                </div>)
            }
            else{
                console.log('old to new')
                console.log(this.props.all_recipes);
                content = this.props.all_recipes.map((x, i)=>
                <div className="center2">
                <RecipeCard key={x._id} id={x._id} recipe={x} index={i} image={x.image}/>
                </div>
            )   
                content.reverse()};
        }
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
                    <Col xs={6} sm={6} m={6} lg={6}>
                    <Button className="btn-edit" onClick={this.addRecipe}>Add Recipe</Button>
                    </Col>
                    <Col xs={6} sm={6} m={6} lg={6}>
                        <DropdownButton id="dropdown-basic-button" title="Sort">
                            <Dropdown.Item onClick={this.sortNewToOld}>Newest to Oldest</Dropdown.Item>
                            <Dropdown.Item onClick={this.sortOldToNew}>Oldest to Newest</Dropdown.Item>
                        </DropdownButton>
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