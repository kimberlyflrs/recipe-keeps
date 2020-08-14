import React from 'react';
import Header from '../components/Header.js';
import Signup from '../components/Signup.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class LandingPage extends React.Component{
    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <div>
            <Header/>
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} m={6} lg={6}>
                        <p>hello</p>
                    </Col>
                    <Col xs={12} sm={12} m={6} lg={6}>
                    <Signup/>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }

}

export default LandingPage;