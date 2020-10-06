import React from "react";
import { Route, Redirect } from "react-router-dom";


var token = localStorage.getItem('token');
console.log(token);
console.log(token == true);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    token !== ""
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

export default PrivateRoute;