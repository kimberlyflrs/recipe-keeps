import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE, LOGIN, LOGOUT, LOAD_USER, SIGNUP, VERIFY, IS_LOADING, ERROR} from './actionType';
import axios from 'axios';
import setAuth from '../utils/setAuth.js';

function auth(){
    setAuth(localStorage.token);
}

/*
* User login and sign up
*/

//Login
export const login = (email, password) => async dispatch =>{
    try {
        const res = await axios.post('/api/auth/login', 
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
        dispatch({
            type: ERROR,
            payload: "Cannot Login At This Time. Try Again."
        })
    }
}



//Sign up for new user
export const signup = (email, password) => async dispatch =>{
    try {
        const res = await axios.post('/api/auth/signup', 
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
        dispatch({
            type: ERROR,
            payload: "Cannot Signup At This Time. Try Again."
        })
    }
}




/*
* User info and verification
*/



//Checks if token is valid
export const resume = () => dispatch =>{
    //checks if crendentials are valid
    console.log('resume');
    const token = localStorage.getItem('token');
    axios.post('/api/auth/verify',
        {token: token},
        {headers: {'Content-Type': 'application/json'}}   
        ).then(result=>{
            dispatch({
                type: VERIFY,
                payload: result.data
            });
            auth();
        }).catch(error=>{
            console.log(error);
        })

}


//Loads the user info
export const userInfo = () => async dispatch =>{
    if(localStorage.token){
        setAuth(localStorage.token);
    }
    try{
        const res =  await axios.get('/api/foodentries/entries', 
        {headers: {
            'Content-Type': 'application/json'}
        })
        dispatch({
            type: LOAD_USER,
            payload: res.data
            });
    }
    catch(err){
        dispatch({
            type: ERROR,
            payload: "Cannot Get Recipes At This Time. Try Again."
        })
    } 
}




/* 
* MODIFYING A RECIPE SECTION
*/


//Adds an existing Recipe
export const addRecipe = (formdata) => async dispatch =>{
    try {
        const res = await axios.post('/api/foodentries/add',
        formdata   
        );
        console.log(res.data);
        dispatch({
            type: ADD_RECIPE,
            payload: res.data
        });
    } 
    catch (error) {
        dispatch({
            type: ERROR,
            payload: "Cannot Add Recipe At This Time. Try Again."
        })
    }
}


//Deletes an existing Recipe
export const deleteRecipe = (id, index, imageKey) => async dispatch =>{
    try{
        const res = await axios.post('/api/foodentries/delete',
        {id: id,
        imageKey: imageKey},
        {headers: {'Content-Type': 'application/json'}},        
        );
        dispatch({
            type: DELETE_RECIPE,
            index: index,
            payload: res.data
            })
    }
    catch(error){
        dispatch({
            type: ERROR,
            payload: "Cannot Delete Recipe At This Time. Try Again."
        })
    }
}


//Edits an Existing Recipe
export const editRecipe = (recipe, index) => async dispatch =>{
    try{
        const res = await axios.post('/api/foodentries/edit',
        recipe        
        )
        dispatch({type: EDIT_RECIPE,
            recipe:recipe,
            index: index,
            payload: res.data
        })
    }
    catch(error){
        dispatch({
            type: ERROR,
            payload: "Not Able To Connect to Server At This Time. Try Again."
        })
    }
}


/*
* LOGOUT
*/


//Logs the user out
export const logout = () => async dispatch => (
    dispatch({
    type: LOGOUT
    })
)



/*
* LOADING
*/

export const loading=()=>dispatch=>{
    dispatch({
        type: IS_LOADING
    })
}




/*
* ERROR
*/

export const error = (message)=>dispatch=>{
    dispatch({
        type: ERROR,
        payload: message
    })
}