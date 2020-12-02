import {ADD_FISH, DELETE_ALL_FISH, DELETE_FISH} from "../../redux/Actions/types";

const initialState = {
  allFish: []
}

export default function caughtFishReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_FISH:
      action.fish['fishWeight'] = action.weight
      return {
        allFish: [
          ...state.allFish,
          action.fish
        ]
      }
    case DELETE_ALL_FISH:
      return {
        allFish: []
      }
    case DELETE_FISH:
      state.allFish = state.allFish.filter(f => f.fishWeight !== action.fish.fishWeight)
      return {
        ...state
      }
    default:
      return state
  }
}
