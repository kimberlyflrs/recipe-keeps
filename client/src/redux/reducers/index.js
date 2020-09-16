import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE, LOGIN, LOGOUT, DELETE_ACCOUNT } from "../actionType";
import axios from 'axios';

//login switches to true, adds user info into the state
//login switches to false, gets rid of all user info
//delete will get rid of all user info on app and database


//AXIOS DOES NOT GO HERE, DATA WILL BE RECEIVED FROM THE PAYLOAD

const initialState = {
  user: 'email@email.com',
  login: false,
  recipes: [{
      name:'bread',
      prep_time: '5:00',
      cook_time: '30 minutes',
      ingredients: ['flour', '3 bananas', 'walnuts'],
      directions: ['step 1','step 2', 'step 3']
    },
   {
    name:'cookies',
    prep_time: '5:00',
    cook_time: '30 minutes',
    ingredients: ['flour', '3 bananas', 'walnuts'],
    directions: ['step 1','step 2', 'step 3']
    },
    {
      name:'muffin',
      prep_time: '5:00',
      cook_time: '30 minutes',
      ingredients: ['flour', '3 bananas', 'walnuts'],
      directions: ['step 1','step 2', 'step 3']
      },
      {
        name:'muffin2',
        prep_time: '5:00',
        cook_time: '30 minutes',
        ingredients: ['flour', '3 bananas', 'walnuts'],
        directions: ['step 1','step 2', 'step 3']
        }]
};

//we need to make async calls to the database eventually

const recipes = (state = initialState, action) =>{
  switch (action.type) {
    case ADD_RECIPE: {
      return{
        ...state,
        recipes: [...state.recipes, action.recipe]
      }
    }

    case DELETE_RECIPE:{
      return{
        ...state,
        recipes: state.recipes.slice(action.index-1, action.index).concat(state.recipes.slice(action.index+1))
      }
    }

    case EDIT_RECIPE:{
      //look at the recipe, slice at that point, concat previous point with edit point with end point
      console.log('editing');
      console.log(action.recipe);
      console.log(state.recipes);
      return{
        ...state,
        recipes: state.recipes.slice(action.index-1, action.index).concat(action.recipe).concat(state.recipes.slice(action.index+1))
      }
    }


    case LOGIN:{
      console.log('trying to log in');
      axios.get('/users').then(function(response){
        console.log(response.data);
    })
    }


    default:
      return state;
  }
}

export default recipes;