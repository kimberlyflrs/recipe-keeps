import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import LandingPage from './pages/LandingPage';
import ViewAllRecipe from './pages/ViewAllRecipe';
import AddRecipe from './pages/AddRecipe';


/*
if no token, show the login page
if token valid, show the view all recipe page
*/

function App() {
  return (
    <div>
      <AddRecipe/>
    </div>
  );
}

export default App;
