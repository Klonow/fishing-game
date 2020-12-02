import imageShop from '@/assets/backgrounds/shop-bg.jpg'
import {$} from '@core/Dom'
import {storage} from '@core/utils'
import {message} from '@/pages/Start/CanvasComponent/Cavnas.functions'
import {addItemFromShop, changeInventory, deleteAllFish, deleteFish} from '@core/redux/Actions/actions'
import {fishHtml, optionsShop, tableHtml, tackleItemHtml} from '@/pages/Shop/ShopComponent/Shop.functions'
import {FishingComponent} from '@core/FishingComponent'

export class ShopComponent extends FishingComponent {
  constructor($root, options) {
    super($root, {
      root: 'shop',
      listeners: ['click'],
      ...options
    })
    this.money = 100
    this.store = options.store
  }

  toHTML() {
    this.shop = optionsShop()

    return `
       
            <div class="shop-inventory">
                <div class="shop-inventory__cage"></div>
                <div class="shop-inventory__shop">
                    <div data-inventory-shop class="buy-tackle">
                        <div class="buy-tackle__money">${this.money}руб.</div>
                        <div class="buy-tackle__header">
                            <div class="tackle-list"></div>
                        </div>
                        <div class="buy-tackle__footer">
                          <div class="btn-tackle">
                              <div data-name="fishingrod" class="btn-tackle__fishingrod">Удочки</div>
                              <div data-name="coil" class="btn-tackle__coil">Катушки</div>
                              <div data-name="fishingline" class="btn-tackle__fishingline">Лески</div>
                              <div data-name="bait" class="btn-tackle__bait">Наживки</div>
                              <div data-name="hook" class="btn-tackle__hook">Крючки</div>
                          </div>  
                        </div>
                    </div>
                   <div class="fish-sell">
                      <img data-sell class="fish-sell__assessed" src="./assets/shop/sell-fish-card-two.png">
                      <img data-credit class="fish-sell__all" src="./assets/shop/sell-fish-card-one.png">
                   </div>
                </div>
            </div>
        `
  }

  updatingCage() {
    let resultFishCage = this.$getState('fish').allFish

    if(resultFishCage) {
      resultFishCage = resultFishCage.map(fish => fishHtml(fish))
    }

    $('.shop-inventory__cage').html(tableHtml(resultFishCage))
  }

  init() {
    this.initialListeners()
    this.updatingCage()

    const backgroundImageShop = new Image()
    backgroundImageShop.src = imageShop
    this.load([backgroundImageShop])

    $('.tackle-list').html(
      this.shop['fishingrod'].map((fish, index) => {
        return tackleItemHtml(fish, 'fishingrod', index)
      }).join(' ')
    )

    if (!storage('money')) {
      storage('money', 100)
    } else {
      this.money = Math.round(+storage('money'))
      $('.buy-tackle__money').html(`${this.money}руб.`)
    }
  }


  onClick($event) {
    if ($($event.target).hasClass('message__close')) {
      $('.message').removeElement()
      return;
    }

    if ($event.target.dataset.sell !== undefined) {
      let counter = 0
      this.$getState('fish').allFish.map(fish => counter += fish.fishWeight)

      const roundedNumber = Math.round(counter)

      message(`<h1>Вы продали рыбу на ${roundedNumber}руб.</h1>`, 'shop')
      storage('money', roundedNumber)
      $('.buy-tackle__money').html(`${this.money += roundedNumber}руб.`)

      this.$dispatch('fish', deleteAllFish())

      this.updatingCage()
    }

    if ($event.target.dataset.credit !== undefined) {
      let sales_amount = 0;

      this.$getState('fish').allFish.map(fish => {
        if (fish.fishWeight >= fish.creditFrom) {
          sales_amount += Math.floor((fish.fishWeight / fish.creditFrom) * 50)
          this.money += sales_amount

          $('.buy-tackle__money').html(`${this.money}руб.`)

          this.$dispatch('fish', deleteFish(fish))
        }
      })

      this.updatingCage()
      storage('money', this.money)
      message(`<h1>Вы продали рыбы на ${sales_amount}руб.</h1>`, 'shop')
    }

    const name = $($event.target).attr('data-name')
    if (name) {
      $('.tackle-list').html(
        this.shop[name].map(
          (tackle, index) => tackleItemHtml(tackle, name, index)
        ).join(' ')
      )
      return;
    }

    const attr_info = $($event.target).attr('data-info')
    if (attr_info) {
      const splittingAttrForStore = attr_info.split(':')
      const currentTackleName = splittingAttrForStore[0]
      const getPurchasedItem = this.shop[splittingAttrForStore[0]][splittingAttrForStore[1]]
      const state = this.$getState('allTackle')

      if ((this.money - getPurchasedItem.price) <= 0) {
        message(`<h1>Недостаточно денег</h1>`, 'shop')
        return;
      }

      let quantity = 0;

      const newTackle = {
        ...getPurchasedItem,
        id: Date.now()
      }

      if (currentTackleName === 'bait') {
        state[currentTackleName] = state[currentTackleName]
          .filter(bait => {
            if (bait.name === getPurchasedItem.name) {
              quantity = bait.quantity
            }

            return bait.name !== getPurchasedItem.name
          })
        newTackle.quantity = ++quantity || 1
      }

      state[currentTackleName].push(newTackle)

      this.money -= getPurchasedItem.price

      storage('money', Math.floor(this.money))

      $('.buy-tackle__money').text(`${storage('money')}руб.`)

      this.$dispatch('allTackle', addItemFromShop(state))
      this.$dispatch('buyItem', changeInventory(state, splittingAttrForStore))

      if (currentTackleName === 'bait') {
        $('.tackle-list').html(
          this.shop['bait'].map(
            (tackle, index) => tackleItemHtml(tackle, currentTackleName, index)
          ).join(' ')
        )
      }
    }
  }
}
