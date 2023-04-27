import { combineReducers } from "redux";
import { ingredientsReducer } from "./get-ingredients";
import { addIngredientReducer } from "./add-ingredient";
import { openedIngredientReducer } from "./opened-ingredient";
import { orderNumberReducer } from "./order-number";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  addedIngredients: addIngredientReducer,
  openedIngredient: openedIngredientReducer,
  orderNumber: orderNumberReducer,
});
