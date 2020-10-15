import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE, LOGIN, LOGOUT, DELETE_ACCOUNT, LOAD_USER, SIGNUP, VERIFY} from './actionType';
import axios from 'axios';
import setAuth from '../utils/setAuth.js';

//if token expires, remove authentication and remove token [dispatch logout]

function auth(){
    setAuth(localStorage.token);
    console.log('i set the auth')
}


export const userInfo = () => async dispatch =>{
    //loads the user info (name, food entries)
    console.log('we are getting the user info rn');
    auth();
    try{
        const res =  await axios.get('/api/foodentries/entries', 
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
        console.log('error caught in action.js');
    }
}




export const signup = (email, password) => async dispatch =>{
    //checks if there is a user with that credential
    console.log('inside signup actions.js');
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
        console.log('error caught in action.js');
    }
}

//MAY DELETE
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



export const logout = () => async dispatch => (
    //remove token
    dispatch({
    type: LOGOUT
    })
)




export const deleteAccount = () => ({
    type: DELETE_ACCOUNT
})



export const addRecipe = (recipe) => async dispatch =>{
    //adds a recipe to the entries
    try {
        const res = await axios.post('/api/foodentries/add',
        {recipe: recipe},
        {headers: {'Content-Type': 'application/json'}}   
        );
        dispatch({
            type: ADD_RECIPE,
            payload: res.data
        });
    } 
    catch (error) {
        console.log('error caught in action.js');
    }
}


//TEST THIS OUT
export const deleteRecipe = (id, index) => async dispatch =>{
    try{
        const res = await axios.post('/api/foodentries/delete',
        {id: id},
        {headers: {'Content-Type': 'application/json'}},        
        );
        dispatch({
            type: DELETE_RECIPE,
            index: index,
            payload: res.data
            })
    }
    catch(error){
        console.log(error);
    }
}


//TEST THIS OUT
export const editRecipe = (recipe, index) => async dispatch =>{
    try{
        const res = await axios.put('/api/foodentries/edit',
        {index: index,
        updatedObject: recipe},
        {headers: {'Content-Type': 'application/json'}}        
        )
        dispatch({type: EDIT_RECIPE,
            recipe:recipe,
            index: index,
            payload: res.data
        })
    }
    catch(error){
        console.log(error);
    }
}