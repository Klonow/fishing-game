import {addFish, deleteAllFish, deleteFish} from "../../redux/Actions/actions";
import caughtFishReducer from "../../redux/Reducers/caughtFishReducer";

describe('caughtFishReducer', () => {
  let state
  beforeEach(() => {
    state = {
      allFish: [{
        name: 'Карась',
        fishWeight: 4.2
      }]
    }

  })

  test('after adding a new element, allFish property in state should consist of 2 elements', () => {
    const newFish = {
      name: 'Плотва',
      fishWeight: 5.2
    }

    const newState = caughtFishReducer(state, addFish(newFish, 4.2))
    expect(newState.allFish).toBeDefined()
    expect(newState.allFish.length).toBe(2)
  })

  test('After removing all fish, there should be no elements left in the allFish property', () => {
    const newState = caughtFishReducer(state, deleteAllFish())
    expect(newState.allFish.length).toBe(0)
  })

  test('After removing one fish, nothing should remain in the state', () => {
    const fish = state.allFish[0]
    const newState = caughtFishReducer(state, deleteFish(fish))
    expect(newState.allFish.length).toBe(0)
  })
})
