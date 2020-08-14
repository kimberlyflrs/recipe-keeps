import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import LandingPage from './pages/LandingPage';
import ViewAllRecipe from './pages/ViewAllRecipe';


/*
if no token, show the login page
if token valid, show the view all recipe page
*/

function App() {
  return (
    <div>
      <LandingPage/>
    </div>
  );
}

export default App;
