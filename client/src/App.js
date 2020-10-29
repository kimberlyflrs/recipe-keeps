import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ViewAllRecipe from './pages/ViewAllRecipe';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import SingleRecipe from './pages/SingleRecipe';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';

/*
if no token or expired, show the login page
if token valid, show the view all recipe page

when going to pages make sure they are logged in and token is not expired
*/


function App() {
  return (
    <Router>
      <Switch>
      <Redirect exact from="/" to="/signup" />
        <Route exact path="/signup" component={SignupPage}></Route>
        <Route exact path="/login" component={LoginPage}></Route>
        <PrivateRoute exact path="/addRecipe" component={AddRecipe}></PrivateRoute>
        <PrivateRoute exact path="/viewRecipes" component={ViewAllRecipe}></PrivateRoute>
        <PrivateRoute exact path="/recipe/edit/:editRecipe"  component={(props) => <EditRecipe {...props}/>}></PrivateRoute>
        <PrivateRoute exact path="/recipe/view/:id"  component={(props) => <SingleRecipe {...props}/>}></PrivateRoute>
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
