import allTackleReducer from "../../redux/Reducers/allTackleReducer";
import {deleteItem, updateTackle, addItemFromShop} from "../../redux/Actions/actions";

describe('allTackleReducer', () => {
  let state
  beforeEach(() => {
    state = {
      fishingrod: [
        {
          id: 0,
          img: "assets/shop/fishing_line-shop.png",
          maxWeight: 2,
          name: "Brutal",
          price: 5
        },
        {
          id: 1,
          img: "assets/shop/fishing_line-shop.png",
          maxWeight: 4,
          name: "Lord",
          price: 5
        }
      ],
      bait: []
    }
  })

  test('After removing items, the state should be 1', () => {
    const newState = allTackleReducer(state, deleteItem(0))
    expect(newState['fishingrod'].length).toBe(1)
  })

  test('Combining the old and new state', () => {
    const addState = {
      bait: [
        {id: 3, name: "Lord",}
      ]
    }

    const newState = allTackleReducer(state, addItemFromShop(addState))
    expect(newState['bait']).toBeDefined()
  })

  test('New bait element must contain a property: quantity', () => {
    const newBait = {name: 'Опарышь', quantity: 1}
    const newState = allTackleReducer(state, updateTackle(newBait, 'bait'))

    expect(newState['bait'][0].quantity).toBe(1)
  })
})
