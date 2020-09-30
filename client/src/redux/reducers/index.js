import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE, LOGIN, LOGOUT, LOAD_USER, DELETE_ACCOUNT, SIGNUP, LOAD_INFO } from "../actionType";

//login switches to true, adds user info into the state
//login switches to false, gets rid of all user info

//AXIOS DOES NOT GO HERE, DATA WILL BE RECEIVED FROM THE PAYLOAD

const initialState = {
  logged_in: false,
  registered: false,
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
      if(action.payload.status){
        console.log('success');
        //set the token
        localStorage.setItem("token", action.payload.acessToken);
        console.log("token has been set "+action.payload.acessToken);
        return {...state, logged_in:true}
      }
      else{
        console.log("can't login");
        return {state}
      }
    }

    case LOAD_USER:{
      //sets the recipe entries into state.recipes
      return {...state, recipes:action.payload.message}
    }

    case SIGNUP:{
      //sets registered to true
      if(action.payload.status){
        return {...state, registered:true}
      }
      return {state}
    }

    default:
      return state;
  }
}

export default recipes;