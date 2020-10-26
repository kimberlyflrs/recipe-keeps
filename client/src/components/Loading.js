import React from 'react';
import Spinner from 'react-bootstrap/spinner';

//Creates a loading component
class Loading extends React.Component{

    render(){
        return(
        <div className="center">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            <h6>Loading</h6>
        </div>
        )
        
    }
}




export default Loading;