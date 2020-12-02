import {ADD_ITEM_FROM_SHOP, DELETE_ITEM, UPDATE_INVENTORY} from "../../redux/Actions/types";

const initialState = {
  fishingrod: [],
  fishingline: [],
  coil: [],
  hook: [],
  bait: []
}

export default function allTackleReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_ITEM:
      state[action.key] = state[action.key].filter(tackle => tackle.id !== action.id)
      return {
        ...state
      }
    case ADD_ITEM_FROM_SHOP:
      return {
        ...state,
        ...action.state
      }
    case UPDATE_INVENTORY:
      state[action.key] = state[action.key].filter(tackle => tackle.name !== action.item.name)
      return {
        ...state,
        [action.key]: [
          ...state.bait,
          {
            ...action.item,
            quantity: action.item.quantity
          }
        ]
      }
    default:
      return state
  }
}
