import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
import { setIngredients } from '../actions/burgerBuilder';


const initialState = {
    ingredients : null,  
    totalPrice: 15,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 25,
    cheese: 35,
    meat: 30,
    bacon: 35
};

const addIngredient = (state, action)=>{
    const updatedIngredient = {[action.ingredientName]:state.ingredients[action.ingredientName]+1}
            const  updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state,updatedState);

};

const removeIngredient = (state,action) =>{
    const updatedIng = {[action.ingredientName]:state.ingredients[action.ingredientName]-1}
    const  updatedIns = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIns,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state,updatedSt);
}

const setIngredient = (state,action) =>{
    return updateObject(state,{
        ingredients:{
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice:15,
        error:false
       
    }); 
}

const fetchIngredientFailed = (state, action) =>{
    return updateObject(state,{ error:true});
}

const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient( state,action);
            
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
            
        case actionTypes.SET_INGREDIENTS: return setIngredient(state, action);
            
        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientFailed(state,action);
            
        default: return state;
    }
}

export default reducer;