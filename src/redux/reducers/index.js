import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE, LOGIN, LOGOUT, DELETE_ACCOUNT } from "../actionType";



const initialState = {
  user: 'email@email.com',
  login: true,
  recipes: [{
      name:'bread',
      prep_time: '5:00',
      cook_time: '30 minutes',
      ingredients: ['flour', '3 bananas', 'walnuts'],
      directions: ['step 1','step 2', 'step 3']
    },
   {
    name:'bread',
    prep_time: '5:00',
    cook_time: '30 minutes',
    ingredients: ['flour', '3 bananas', 'walnuts'],
    directions: ['step 1','step 2', 'step 3']
    }]
};

//cannot be smaller than 1 or greater than 60
const recipes = (state = initialState, action) =>{
  switch (action.type) {
    case ADD_RECIPE: {
      return{
        ...state,
        recipes: [...state.recipes, action.recipe]
      }
    }


    default:
      return state;
  }
}

export default recipes;