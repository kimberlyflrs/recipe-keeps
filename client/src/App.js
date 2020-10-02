import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import ViewAllRecipe from './pages/ViewAllRecipe';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import SingleRecipe from './pages/SingleRecipe';


/*
if no token, show the login page
if token valid, show the view all recipe page

when going to pages make sure they are logged in and token is not expired
*/

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/addRecipe" component={AddRecipe}></Route>
        <Route exact path="/viewRecipes" component={ViewAllRecipe}></Route>
        <Route exact path="/recipe/edit/:editRecipe" render={(props) => <EditRecipe {...props}/>}></Route>
        <Route exact path="/recipe/view/:id" render={(props) => <SingleRecipe {...props}/>}></Route>
      </Switch>
    </Router>
  );
}

export default App;
