import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Login from '../components/Login.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class LoginPage extends React.Component{

    render(){
        return(
            <div>
            <Header/>
            <Container fluid className="padding">
                <Row>
                    <Col xs={12} sm={12} m={6} lg={6} className="landingsection verticalAlign">
                        <div className="lsbg">
                            <h4>Store your recipes in one secure place</h4>
                            <h4>View on mobile and on desktop</h4>
                            <h4>Print out your recipe any time</h4>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} m={6} lg={6} className="parent">
                        <Login/>
                    </Col>
                </Row>
            </Container>
            <Footer/>
            </div>
        )
    }

}

export default LoginPage;