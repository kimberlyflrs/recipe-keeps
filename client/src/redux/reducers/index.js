import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE, LOGIN, LOGOUT, LOAD_USER, DELETE_ACCOUNT, SIGNUP } from "../actionType";

//login switches to true, adds user info into the state
//login switches to false, gets rid of all user info

//AXIOS DOES NOT GO HERE, DATA WILL BE RECEIVED FROM THE PAYLOAD

const initialState = {
  logged_in: false,
  registered: false,
  added: false,
  recipes: []
};


const recipes = (state = initialState, action) =>{
  switch (action.type) {
    case ADD_RECIPE: {
      //if things went well true
      if(action.payload.status){
        return{
          ...state,
          added:true,
          recipes: [...state.recipes, action.payload.recipe]
        }       
      }
      else{
        console.log("recipe error");
        return {state}
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


    case LOGOUT:{
        //remove the token, sets all user info blank
        localStorage.removeItem("token");
        return {...state, logged_in:false, registered: false, added:false, recipes:[]}
    }

  

    case LOAD_USER:{
      //sets the recipe entries into state.recipes
      console.log("Loading user information");
      console.log(action.payload.message);
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