import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '../redux/store.js';


function PrivateRoute({ component: Component, ...rest }) {

    const login = store.getState().logged_in;
    console.log('private route: logged_in '+login);

  return (
    <Route
      {...rest}
      render={props =>
        login ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;