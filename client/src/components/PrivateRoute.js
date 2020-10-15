import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '../redux/store.js';
import {resume, userInfo} from '../redux/actions';


function PrivateRoute({ component: Component, ...rest }) {
    //this is okay since user mmay not know when token expired
    console.log('state before resume() '+ store.getState().logged_in)    
    console.log('state after resume() '+ store.getState().logged_in)
    const token = store.getState().logged_in;
    store.dispatch(resume());
    store.dispatch(userInfo());
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/landing" />
        )
      }
    />
  );
}

export default PrivateRoute;