import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE, LOGIN, LOGOUT, DELETE_ACCOUNT, LOAD_USER, LOAD_INFO, SIGNUP} from './actionType';
import axios from 'axios';
import setAuth from '../utils/setAuth.js';

function auth(){

    setAuth(localStorage.token);
}


export const userInfo = () => async dispatch =>{
    //loads the user info (name, food entries)
    console.log('we are getting the user info rn');
    try{
        const res =  await axios.get('/login', 
        {headers: {
            'Content-Type': 'application/json'}
        });
        dispatch({
            type: LOAD_USER,
            payload: res.data
            });
    }
    catch(err){
            console.log(err);
    } 
}



export const login = (email, password) => async dispatch =>{
    //checks if there is a user with that credential

    try {
        const res = await axios.post('/login', 
        {"email": email,
         "password": password},
        {headers: {'Content-Type': 'application/json'}}   
        );
        dispatch({
            type: LOGIN,
            payload: res.data
        });

        auth();//add authorization
    } 
    catch (error) {
        console.log('error caught in action.js');
    }
}




export const signup = (email, password) => async dispatch =>{
    //checks if there is a user with that credential

    try {
        const res = await axios.post('/signup', 
        {"email": email,
         "password": password},
        {headers: {'Content-Type': 'application/json'}}   
        );
        dispatch({
            type: SIGNUP,
            payload: res.data
        });

    } 
    catch (error) {
        console.log('error caught in action.js');
    }
}


export const resume = () => async dispatch =>{
    //checks if there is a user with that credential

    try {
        const res = await axios.post('/verify',
        {headers: {'Content-Type': 'application/json'}}   
        );
        dispatch({
            type: LOGIN,
            payload: res.data
        });

        auth();//add authorization errors
    } 
    catch (error) {
        console.log('error caught in action.js');
    }
}



export const logout = () => ({
    type: LOGOUT
})




export const deleteAccount = () => ({
    type: DELETE_ACCOUNT
})



export const addRecipe = (recipe) => ({
    type: ADD_RECIPE,
    recipe: recipe
})

export const deleteRecipe = (index) => ({
    type: DELETE_RECIPE,
    index: index
})

export const editRecipe = (recipe, index) => ({
    type: EDIT_RECIPE,
    recipe:recipe,
    index: index
})