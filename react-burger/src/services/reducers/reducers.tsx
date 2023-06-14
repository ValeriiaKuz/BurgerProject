import { combineReducers } from "redux";
import { ingredientsReducer } from "./get-ingredients";
import { addIngredientReducer } from "./add-ingredient";
import { orderNumberReducer } from "./order-number";
import { authReducer } from "./auth";
import { wsReducer } from "./web-socket";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  addedIngredients: addIngredientReducer,
  orderNumber: orderNumberReducer,
  auth: authReducer,
  orders: wsReducer,
});
