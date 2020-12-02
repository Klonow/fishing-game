import {ADD_TACKLE, DELETE_ITEM_IN_INVENTORY, UPDATE_INVENTORY} from "../../redux/Actions/types";

const initialState = {
  fishingrod: null,
  fishingline: null,
  coil: null,
  hook: null,
  bait: null
}


export default function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TACKLE:
      return {
        ...state,
        ...action.act
      }
    case DELETE_ITEM_IN_INVENTORY:
      return {
        ...state,
        [action.key]: null
      }
    case UPDATE_INVENTORY:
      return {
        ...state,
        [action.key]: [{
          ...action.item,
          quantity: --action.item.quantity
        }]
      }
    default:
      return initialState
  }
}
