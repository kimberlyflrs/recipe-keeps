import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header.js';
import SignUp from './Signup';
import RecipeCard from './RecipeCard';
import RecipeView from './RecipeView';
import EditRecipe from './EditRecipe';


function App() {
  return (
    <div>

      <RecipeCard/>
      <SignUp login={false} />
      <RecipeView/>
      <EditRecipe/>
    </div>
  );
}

export default App;
