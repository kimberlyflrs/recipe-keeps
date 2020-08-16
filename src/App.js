import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import LandingPage from './pages/LandingPage';
import ViewAllRecipe from './pages/ViewAllRecipe';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';


/*
if no token, show the login page
if token valid, show the view all recipe page
*/

function App() {
  return (
    <div>
      <EditRecipe/>
    </div>
  );
}

export default App;
