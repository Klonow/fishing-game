import {$} from '@core/Dom'
import {FishingComponent} from '@core/FishingComponent'
import {
  currentTackleHtml,
  footerItemHtml,
  inventoryHTML
} from '@/pages/Start/TackleComponent/Tackle.functions'
import {STARTED_VALUE_STATE} from '@core/constans'
import {addTackle, deleteItem, updateBuyItem, updateInventory} from '@core/redux/Actions/actions'
import {message} from '@/pages/Start/CanvasComponent/Cavnas.functions'
import {storage} from '@core/utils'
import {fishHtml, tableHtml} from '@/pages/Shop/ShopComponent/Shop.functions'


export class TackleComponent extends FishingComponent {
  constructor($root, options) {
    super($root, {
      root: 'main',
      listeners: ['click'],
      ...options
    })
    this.store = options.store
  }

  toHTML() {
    return `
                <div class="user-inventory">
                    <div class="time">${storage('time') || '12:00'}</div>
                    <div class="btn-open-inventory">
                        <img data-open="open" class="btn-open-inventory__inventory" src="./assets/other/tackle.png">
                        <img data-cage="cage" class="btn-open-inventory__cage" src="./assets/other/cage.png">
                    </div>
                    <div class="tackle">
                        <div class="tackle__catching">
                          <div class="catching">
                              <span class="catching__name">Удочка</span>
                              <div class="catching__progress">
                                <div class="catching__progress-layout"></div>
                              </div>
                          </div>
                        </div>
                        <div class="tackle__footer">
                            <div class="tackle-footer">
                              <div data-fishingrod class="tackle-footer__fishingrod">
                                <img src="./assets/tackle-default/tackle-fishing-rod.png" alt="">
                              </div>
                              <div data-coil class="tackle-footer__coil">
                                <img src="./assets/tackle-default/tackle-coil.png" alt="">
                              </div>
                              <div data-fishingline class="tackle-footer__fishingline">
                                <img src="./assets/tackle-default/tackle-fishingline.png" alt="">
                              </div>
                              <div data-bait class="tackle-footer__bait">
                                <img src="./assets/tackle-default/tackle-bait.png" alt="">  
                              </div>
                              <div data-hook class="tackle-footer__hook">
                                <img src="./assets/tackle-default/tackle-hook.png" alt="">
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
  }

  init() {
    this.initialListeners()
    this.$dispatch('buyItem', updateInventory())
  }

  onClick($event) {
    if ($event.target.dataset.cage) {
      const fishCage = this.$getState('fish').allFish
      const resultFishCage = fishCage.map(fish => fishHtml(fish))
      message(tableHtml(resultFishCage))
    }

    const inventoryLayout = $('.inventory-layout')

    if ($event.target.dataset.close) inventoryLayout.css({visibility: 'hidden'})

    const checkTackleInInventory = (tackle, tackleItemsHtml) => {
      const cardsInventory = $('.tackle-list')
      if (![...tackle].length) {
        return cardsInventory.html('<h1 class="tackle-list__message">Данных снастей нет</h1>')
      }

      cardsInventory.html(tackleItemsHtml.join(' '))
    }

    const dataAttrName = $($event.target).attr('data-name')
    if (dataAttrName) {
      this.datasetKey = dataAttrName
      checkTackleInInventory(
        this.$getState('buyItem')[dataAttrName],
        currentTackleHtml(this.$getState('buyItem')[dataAttrName])
      )
    }

    if ($event.target.dataset.open) {
      this.$emit('checkOrFishPecked')

      if (inventoryLayout.getComputedStyleProperty('visibility') === 'visible') {
        inventoryLayout.css({visibility: 'hidden'})
        return;
      }

      inventoryLayout.css({visibility: 'visible'})
      inventoryLayout.html(inventoryHTML())

      checkTackleInInventory(
        this.$getState('buyItem')[STARTED_VALUE_STATE],
        currentTackleHtml(this.$getState('buyItem')[STARTED_VALUE_STATE])
      )
    }

    const dataAttrId = $($event.target).attr('data-id')
    if (dataAttrId) {
      const dataKeyOrStartedValue = this.datasetKey || STARTED_VALUE_STATE
      const inventory = this.$getState('inventory')
      const item = this.$getState('buyItem')[dataKeyOrStartedValue]
        .filter(item => item.id === +dataAttrId)

      $(`[data-${dataKeyOrStartedValue}]`).html(footerItemHtml(item))

      if (inventory[dataKeyOrStartedValue] !== null) {
        this.$dispatch('buyItem',
          updateBuyItem(
            inventory[dataKeyOrStartedValue],
            dataKeyOrStartedValue
          ),
        )
      }

      this.$dispatch('buyItem', deleteItem(item[0].id, dataKeyOrStartedValue))
      this.$dispatch('inventory', addTackle(this.datasetKey, item))

      checkTackleInInventory(
        this.$getState('buyItem')[dataKeyOrStartedValue],
        currentTackleHtml(this.store.getState('buyItem')[dataKeyOrStartedValue])
      )
    }
  }
}
