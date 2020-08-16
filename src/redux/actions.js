import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE, LOGIN, LOGOUT, DELETE_ACCOUNT} from './actionType';

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




export const login = () => ({
    type: LOGIN
})

export const logout = () => ({
    type: LOGOUT
})




export const deleteAccount = () => ({
    type: DELETE_ACCOUNT
})