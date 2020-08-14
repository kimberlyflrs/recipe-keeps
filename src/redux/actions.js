import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE, LOGIN, LOGOUT, DELETE_ACCOUNT} from './actionType';

export const addRecipe = () => ({
    type: ADD_RECIPE
})

export const deleteRecipe = () => ({
    type: DELETE_RECIPE
})

export const editRecipe = () => ({
    type: EDIT_RECIPE
})




export const LOGIN = () => ({
    type: LOGIN
})

export const LOGOUT = () => ({
    type: LOGOUT
})




export const DELETE_ACCOUNT = () => ({
    type: DELETE_ACCOUNT
})