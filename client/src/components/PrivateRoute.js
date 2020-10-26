import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '../redux/store.js';


function PrivateRoute({ component: Component, ...rest }) {
    //this is okay since user mmay not know when token expired

    const login = store.getState().logged_in;
    console.log('private route: logged_in '+login);

    const token = localStorage.getItem('token');
    //setAuth(localStorage.getItem('token'));

    /*console.log('private route: resume()');
    store.dispatch(resume());
    console.log(store.getState());
    const login = store.getState().logged_in;*/

    /*console.log('private route: userInfo()');
    store.dispatch(userInfo());
    console.log(store.getState());*/
  return (
    <Route
      {...rest}
      render={props =>
        true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/landing" />
        )
      }
    />
  );
}

export default PrivateRoute;