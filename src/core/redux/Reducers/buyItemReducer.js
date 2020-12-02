import {CHANGE_INVENTORY, DELETE_ITEM, UPDATE_BUY_ITEM, UPDATE_INVENTORY} from "../../redux/Actions/types";

const initialState = {
  fishingrod: [],
  fishingline: [],
  coil: [],
  hook: [],
  bait: []
}

export default function buyItemReducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_INVENTORY:
      return {
        ...state,
        ...action.buyItem
      }
    case DELETE_ITEM: {
      state[action.key] = state[action.key].filter(item => item.id !== action.id)
      return {
        ...state
      }
    }
    case UPDATE_INVENTORY: {
      const newState = JSON.parse(localStorage.getItem('state'))
      return {
        ...state,
        ...newState.allTackle
      }
    }
    case UPDATE_BUY_ITEM: {
      return {
          ...state,
          [action.key]: [...action.item, ...state[action.key]]
        }
    }
    default: return state
  }
}
