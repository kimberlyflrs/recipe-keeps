import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class NotFoundPage extends React.Component{

    render(){
        return(
            <div>
            <Header/>
            <Container fluid className="padding">
                <Row className="center">
                    <Col>
                    <h1>404</h1>
                    </Col>
                </Row>
                <Row className="center">
                    <Col>
                    <h1>Page Not Found!</h1>
                    </Col>
                </Row>
            </Container>
            <Footer/>
            </div>
        )
    }

}

export default NotFoundPage;