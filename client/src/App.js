import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import ViewAllRecipe from './pages/ViewAllRecipe';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import SingleRecipe from './pages/SingleRecipe';

/*
if no token or expired, show the login page
if token valid, show the view all recipe page

when going to pages make sure they are logged in and token is not expired
*/
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('token') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <PrivateRoute exact path="/addRecipe" component={AddRecipe}></PrivateRoute>
        <PrivateRoute exact path="/viewRecipes" component={ViewAllRecipe}></PrivateRoute>
        <PrivateRoute exact path="/recipe/edit/:editRecipe" component={EditRecipe} render={(props) => <EditRecipe {...props}/>}></PrivateRoute>
        <PrivateRoute exact path="/recipe/view/:id" component={SingleRecipe} render={(props) => <SingleRecipe {...props}/>}></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
