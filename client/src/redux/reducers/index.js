import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE, LOGIN, LOGOUT, LOAD_USER, SIGNUP, VERIFY } from "../actionType";

const initialState = {
  logged_in: false,
  registered: false,
  added: false,
  token: "",
  recipes: []
};


const recipes = (state = initialState, action) =>{
  switch (action.type) {
    case ADD_RECIPE: {
      //if things went well true, if token expired then remove it from local storage
      if(action.payload.status===200){
        return{
          ...state,
          added:true,
          recipes: [...state.recipes, action.payload.recipe]
        }       
      }
      if(action.payload.status === 401){
        localStorage.removeItem('token');
        return{
          logged_in: false,
          registered: false,
          added: false,
          token:"",
          recipes: []   
        }
      }
      else{
        console.log("recipe error");
        return {state}
      }
    }

    case DELETE_RECIPE:{
      if(action.payload.status===200){
        return{
          ...state,
          recipes: state.recipes.slice(action.index-1, action.index).concat(state.recipes.slice(action.index+1))
        }
      }
      if(action.payload.status===401){
        //remove fom localstorage
        localStorage.removeItem('token');
        return{
          logged_in: false,
          registered: false,
          added: false,
          token:"",
          recipes: []
        }
      }
    }

    case EDIT_RECIPE:{
      //look at the recipe, slice at that point, concat previous point with edit point with end point
      if(action.payload.status===200){
        return{
          ...state,
          recipes: state.recipes.slice(action.index-1, action.index).concat(action.recipe).concat(state.recipes.slice(action.index+1))
        }
      }
      if(action.payload.status===401){
        localStorage.removeItem('token');
        return{
          logged_in: false,
          registered: false,
          added: false,
          token:"",
          recipes: []
        }       
      }
    }


    case LOGIN:{
      if(action.payload.status===200){
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
        return {...state, logged_in:false, registered: false, added:false,token:"", recipes:[]}
    }

  

    case LOAD_USER:{
      //sets the recipe entries into state.recipes
      return {...state, recipes:action.payload.message}
    }

    case VERIFY:{
      console.log(action.payload);
      const token = localStorage.getItem("token");

      if(action.payload.status===200){
        return{...state, logged_in:true, registered:true, added:false, token:token}
      }
      return {...state, logged_in:false, registered: false, added:false,token:"", recipes:[]}
    }

    case SIGNUP:{
      //sets registered to true
      if(action.payload.status===200){
        return {...state, registered:true}
      }
      return {state}
    }

    default:
      return state;
  }
}

export default recipes;