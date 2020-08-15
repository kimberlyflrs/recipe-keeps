import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE, LOGIN, LOGOUT, DELETE_ACCOUNT} from './actionType';

export const addRecipe = (recipe) => ({
    type: ADD_RECIPE,
    recipe: recipe
})

export const deleteRecipe = () => ({
    type: DELETE_RECIPE
})

export const editRecipe = () => ({
    type: EDIT_RECIPE
})




export const login = () => ({
    type: LOGIN
})

export const logout = () => ({
    type: LOGOUT
})




export const deleteAccount = () => ({
    type: DELETE_ACCOUNT
})