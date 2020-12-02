import buyItemReducer from "@core/redux/Reducers/buyItemReducer";
import inventoryReducer from "@core/redux/Reducers/inventoryReducer";
import combineReducers from "@core/redux/combineReducers";
import allTackleReducer from "@core/redux/Reducers/allTackleReducer";
import caughtFishReducer from "@core/redux/Reducers/caughtFishReducer";

export default combineReducers({
  buyItem: buyItemReducer,
  inventory: inventoryReducer,
  allTackle: allTackleReducer,
  fish: caughtFishReducer
})
