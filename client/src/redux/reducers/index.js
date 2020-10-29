import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE, LOGIN, LOGOUT, LOAD_USER, SIGNUP, VERIFY, DELETE_ACCOUNT, ERROR, IS_LOADING } from "../actionType";
import axios from "axios";

function setAuth(token){
  if (token) {
    axios.defaults.headers.common = {'Authorization': `bearer `+token};
  } else {
    delete axios.defaults.headers.common;
  }
};

const initialState = {
  logged_in: false,
  registered: false,
  added: false,
  token: "",
  recipes: [],
  isLoading: false,
  error: ""
};


const recipes = (state = initialState, action) =>{
  switch (action.type) {

    case LOGIN:{
      if(action.payload.status===200){
        localStorage.setItem("token", action.payload.acessToken);
        setAuth(localStorage.getItem('token'));
        return {...state, registered:true, token:action.payload.acessToken, logged_in:true, isLoading:false, error:""}
      }
      else{
        return {...state, error:"Error: Invalid Login Information"}
      }
    }





    case SIGNUP:{
      if(action.payload.status===200){
        return {...state, registered:true, error:""}
      }
      return {...state, error:"Error: Cannot Sign Up"}
    }





    case LOGOUT:{
        localStorage.removeItem("token");
        return {...state, logged_in:false, registered: false, added:false,token:"", recipes:[], isLoading:false, error:""}
    }

  

    case LOAD_USER:{
      if(action.payload.status===200){
        var token = localStorage.getItem('token');
        return {...state, logged_in:true, registered: true, added:false, token:token, recipes:action.payload.message, isLoading:false, error:""}
      }
      if(action.payload.status===500){
        return{...state, error:"Cannot load recent entries at this time"};
      }
      localStorage.removeItem('token')
      return {...state, logged_in:false, registered: false, added:false,token:"", recipes:[], isLoading:false, error:""}
    }

    case VERIFY:{
      console.log(action.payload);
      const token = localStorage.getItem("token");

      if(action.payload.status===200){
        return{...state, logged_in:true, registered:true, added:false, token:token, isLoading:false, error:""}
      }
      localStorage.removeItem('token');
      return {...state, logged_in:false, registered: false, added:false,token:"", recipes:[], isLoading:false, error:""}
    }





    case ADD_RECIPE: {
      if(action.payload.status===200){
        return{...state, added:true, recipes: [...state.recipes, action.payload.recipe],isLoading:false, error:""}       
      }
      if(action.payload.status === 401){
        localStorage.removeItem('token');
        return{...state, logged_in: false, registered: false, added: false, token:"", recipes: [], isLoading:false, error:" "}
      }
      else{
        console.log("recipe error");
        return {...state, error:"Error: Cannot Add Recipe. Try Again."}
      }
    }





    case DELETE_RECIPE:{
      if(action.payload.status===200){
        return{...state,recipes: state.recipes.slice(action.index-1, action.index).concat(state.recipes.slice(action.index+1)), error:""}
      }
      if(action.payload.status===401){
        localStorage.removeItem('token');
        return{...state, logged_in: false, registered: false, added: false, token:"",recipes: [],isLoading:false, error:""}
      }
      else{
        return {...state, error:"Cannot delete recipe at this time"}
      }
    }





    /* falls through */
    case EDIT_RECIPE:{
      if(action.payload.status===200){
        return{...state,added:true, recipes: state.recipes.slice(action.index-1, action.index).concat(action.recipe).concat(state.recipes.slice(action.index+1)), isLoading:false, error:""}
      }
      if(action.payload.status===401){
        localStorage.removeItem('token');
        return{...state,logged_in: false,registered: false,added: false,token:"",recipes: [],isLoading:false, error:""}       
      }
      else{
        return{...state, error:"Cannot make changes to recipe at this time"}
      }
    }



    /* falls through */
    case IS_LOADING:{
      return {...state, isLoading:true}
    }




    case ERROR:{
      return {...state, error:action.payload, isLoading:false}
    }





    case DELETE_ACCOUNT:{
      if(action.payload.status===200){
        localStorage.removeItem('token');
        return{...state,logged_in: false,registered: false,added: false,token:"",recipes: [],isLoading:false}       
      }
      else{
        return{...state}
      }
    }





    default:
      return state;
  }
}

export default recipes;