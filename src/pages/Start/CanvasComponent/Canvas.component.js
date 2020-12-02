import {calculateFishWeight, clearTimeouts, timerStart} from '@core/utils'
import {$} from '@core/Dom'
import initializationLibraryCanvas from '@/pages/Start/CanvasComponent/Canvas.library'
import initializationSoundsLibrary from '@/pages/Start/CanvasComponent/Sounds.library'
import {images, sounds} from '@/pages/Start/CanvasComponent/imagesAndAudiosForLibraryCanvas'
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DEFAULT_VALUE_DISTANCE, DIAPASON_NUMBER,
  FLOAT_SPEED,
  POSITION_FISHING_ROD_X,
  POSITION_FISHING_ROD_Y,
  RIGHT_AREA_MAP,
  TOP_AREA_MAP
} from '@core/constans'
import {
  bottomLineMap,
  fishInfoHTML,
  mapOptions,
  message, randomNumberInDiapason
} from '@/pages/Start/CanvasComponent/Cavnas.functions'
import {
  addFish,
  deleteItem,
  deleteItemInInventory,
  resetInventory,
  updateTackle
} from '@core/redux/Actions/actions'
import imgBackgroundCanvas from '@/assets/backgrounds/location.jpg'
import {FishingComponent} from '@core/FishingComponent'

export class Canvas extends FishingComponent {
  constructor($root, options) {
    super($root, {
      root: 'layout-canvas',
      listeners: ['click', 'keydown', 'keyup'],
      ...options
    })

    this.store = options.store

    this.initializationLibraryCanvas = initializationLibraryCanvas
    this.initializationSoundsLibrary = initializationSoundsLibrary
  }

  toHTML() {
    return `
      <div data-canvas="true" class="canvas-layout">
            <div class="layout-canvas">    
                <canvas id="canvas"></canvas>
            </div>
            <div class="inventory-layout">
                <div class="inventory">
                    <div data-close="inventory" class="inventory__close"></div>
                    <div class="inventory__header">
                        <div class="tackle-list">
                        </div>
                    </div>
                    <div class="inventory__footer">
                        <div class="btn-tackle">
                            <div data-name="fishingrod" class="btn-tackle__fishingrod">Удочка</div>
                            <div data-name="coil" class="btn-tackle__coil">Катушка</div>
                            <div data-name="fishingline" class="btn-tackle__fishingline">Леска</div>
                            <div data-name="bait" class="btn-tackle__bait">Наживка</div>
                            <div data-name="hook" class="btn-tackle__hook">Крючок</div>
                        </div>
                    </div>
                </div>
            </div>
      </div>   
    `
  }

  init() {
    this.canvas = document.getElementById("canvas")
    this.ctx = this.canvas.getContext("2d")

    this.initialListeners()
    this.intervals = {}

    this.$dispatch('inventory', resetInventory())

    this.initializationLibraryCanvas({
      images: images(),
      ctx: this.ctx,
      canvas: this.canvas
    })
    this.initializationSoundsLibrary(sounds())

    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;

    this.load([this.location.image, this.threw.audio])

    $(this.canvas).css({
      background: `url(${imgBackgroundCanvas}) no-repeat`,
      backgroundSize: 'cover'
    })

    timerStart()

  }

  onClick(event) {
    if ($(event.target).hasClass('message__close')) {
      $('.canvas-layout').remove(document.querySelector('.message'))
      return;
    }

    this.$subscribe('checkOrFishPecked', () => {
      clearTimeouts()
      this.canvas.clear()
      if(this.$getState('inventory').fishingrod) {
        this.fishing_rod.onLoadImage(POSITION_FISHING_ROD_X, POSITION_FISHING_ROD_Y)
      }
    })


    if (!$(event.target).attr('data-canvas')) return
    this.threw.play()

    const userInventory = this.$getState('inventory')
    const inventoryItemKey = Object.keys(userInventory)

    for (let i = 0; i < inventoryItemKey.length; i++) {
      if (!userInventory[inventoryItemKey[i]]) {
        message(`<h1>Соберите снасть</h1>`)
        return;
      }
    }

    if(this.$getState('fish').allFish.length >= 10) return message(`<h1>Садок полон!</h1>`)

    clearTimeouts()

    this.fishPecked = false
    this.pulledFish = false

    $('.catching__progress').css({width: '0'})

    if (!$('.result').isNotElement()) {
      $('.canvas-layout').remove($('.result'))
    }

    let yClick = event.offsetY
    let xClick = event.offsetX
    this.xClick = event.offsetX

    yClick = yClick < TOP_AREA_MAP ? TOP_AREA_MAP : yClick

    this.float.onLoadImage(xClick, yClick)

    this.xClick =
      this.xClick >= (RIGHT_AREA_MAP - DEFAULT_VALUE_DISTANCE)
        ? 800
        : this.xClick

    this.fishing_rod.onLoadImage(this.xClick + this.fishing_rod.width, POSITION_FISHING_ROD_Y)
    this.fishing_rod.drawLine({
      x1: this.xClick + this.fishing_rod.width,
      y1: POSITION_FISHING_ROD_Y,
      x2: xClick + 5,
      y2: yClick + this.float.height,
      lineWidth: 0.5,
      color: 'white'
    })

    const intervalFishion = () => {
      this.fishPecked = true

      let randomX = this.canvas.width + Math.random() * (yClick + 1 - this.canvas.width),
        randomY = this.canvas.height + Math.random() * (yClick + 1 - this.canvas.height)

      this.intervals['positionFloat'] = setInterval(() => {
        randomX = this.canvas.width + Math.random() * (yClick + 1 - this.canvas.width)
        randomY = this.canvas.height + Math.random() * (yClick + 1 - this.canvas.height)
      }, 2000)

      this.intervals['fishing'] = setInterval(() => {
        const positionFloatX = () => {
          if (randomX > this.xFloatPosition) {
            this.xFloatPosition++
          }

          if (randomX < this.xFloatPosition) {
            this.xFloatPosition--
          }
          return this.xFloatPosition
        }

        const positionFloatY = () => {
          if (randomY > this.yFloatPosition) {
            this.yFloatPosition++
          }

          if (randomY < this.yFloatPosition) {
            this.yFloatPosition--
          }
          return this.yFloatPosition
        }

        this.float.onLoadImage(positionFloatX(), positionFloatY())
        this.fishing_rod.onLoadImage(this.xClick + this.fishing_rod.width, POSITION_FISHING_ROD_Y)
        this.fishing_rod.drawLine({
          x1: this.xClick + this.fishing_rod.width,
          y1: POSITION_FISHING_ROD_Y,
          x2: this.xFloatPosition + 5,
          y2: this.yFloatPosition + this.float.height,
          lineWidth: 0.5,
          color: 'white'
        })
        this.canvas.clear()
      }, 100)
    }

    const optionsMap = mapOptions()
    const randomNumber = Math.random()
    const fishing = optionsMap.filter(fish => fish.bait.includes(userInventory.bait[0].name))

    const nearestBelow = (input, lookup) => lookup.reduce((prev, curr) => input >= curr ? curr : prev);
    const filterFish = fishing.map(fish => fish.chance)

    this.resultFish = fishing.filter(fish => nearestBelow(randomNumber, filterFish) === fish.chance)
    this.weightFish = calculateFishWeight(this.resultFish[0].weight)
    const timeWhenFishBreak = userInventory.hook[0].maxWeight / this.weightFish * 1000

    if(randomNumber <= .5) {
      this.timeoutFish(5000, intervalFishion)
    } else if(randomNumber => .51 && randomNumber < .9) {
      this.timeoutFish(3000, intervalFishion)
    } else {
      this.timeoutFish(1000, intervalFishion)
    }

    this.xFloatPosition = xClick
    this.yFloatPosition = yClick

    this.$subscribe('fishingInterval', () => {
      clearTimeouts([this.intervals['fishing']])
      intervalFishion()
    })

    this.$subscribe('fishBreak', () => {
      clearTimeouts([this.intervals['whenFishBreak']])
      this.intervals['whenFishBreak'] = setTimeout(() => {
        $('.catching__progress').css({width: 0})
        message(`<h1>Эх, сорвалась!</h1>`)

        this.removeBait()
        this.fishPecked = false
        this.fishing_rod.onLoadImage(this.xClick + this.fishing_rod.width, POSITION_FISHING_ROD_Y)

        clearTimeouts()
        this.canvas.clear()
      }, timeWhenFishBreak)
    })

    this.canvas.clear()
  }

  onKeydown($event) {
    if (!this.fishPecked) return
    if ($event.code === 'Space') {
      clearTimeouts()

      if (
        $('.catching__progress').getStyleWidth() >=
        $('.catching').getStyleWidth()
      ) {
        message('<h1>Удочка сломалась!</h1>')

        const itemForDeleting = this.$getState('inventory')['fishingrod'][0].id

        this.$dispatch('allTackle', deleteItem(itemForDeleting))
        this.$dispatch('buyItem', deleteItem(itemForDeleting))
        this.$dispatch('inventory', deleteItemInInventory())

        if (!this.$getState('allTackle')['fishingrod'].length) {
          $('.tackle-list').html('<h1>У вас нет данных снастей</h1>')
        }

        $(`[data-fishingrod]`).html(`<img src="${this.fishingrodDefaultImage.image.src}" alt="">`)
        $('.catching__progress').css({width: 0})

        clearTimeouts()
        this.fishPecked = false
        this.canvas.clear()

        return;
      }

      if (this.yFloatPosition > bottomLineMap(this.canvas.height, this.float.height)) { //поймал рыбу
        if ($('.result').isNotElement()) {
          message(fishInfoHTML(this.weightFish, this.resultFish))

          this.removeBait()
          this.pulledOut.play()

          $('.catching__progress').css({width: '0px'})

          this.$dispatch('fish', addFish(this.resultFish[0], this.weightFish))

          this.pulledFish = true
        }

        this.fishing_rod.onLoadImage(this.xClick + this.fishing_rod.width, POSITION_FISHING_ROD_Y)
        this.canvas.clear()
        this.fishPecked = false
        return;
      }

      const moveFloat = () => {
        clearTimeouts([this.intervals['whenFishBreak']])

        this.fishing_rod.drawLine({
          x1: this.xClick + this.fishing_rod.width,
          y1: POSITION_FISHING_ROD_Y,
          x2: this.xFloatPosition + 5,
          y2: this.yFloatPosition + this.float.height,
          lineWidth: 0.5,
          color: 'white'
        })

        this.xClick = this.xClick >= RIGHT_AREA_MAP ? RIGHT_AREA_MAP : this.xClick

        this.fishing_rod.onLoadImage(this.xClick + this.fishing_rod.width, POSITION_FISHING_ROD_Y)
        this.float.onLoadImage(this.xFloatPosition, this.yFloatPosition++)

        const progressBar = $('.catching__progress')
        const maxWeightFishingrod = this.$getState('inventory')['fishingrod'][0].maxWeight
        progressBar.css({
          width: `${progressBar.getStyleWidth() + (this.weightFish / maxWeightFishingrod) * 7}px`
        })
        this.canvas.clear()
      }

      // fixed bug with delay when pressing the button
      this.intervals['moveFloat'] = setInterval(() => {
        clearTimeouts([this.intervals['whenFishBreak']])
        moveFloat()
      }, FLOAT_SPEED)
      // fixed bug with delay when pressing the button

      moveFloat()
    }
  }

  onKeyup($event) {
    if (
      !this.fishPecked ||
      this.yFloatPosition >= bottomLineMap(this.canvas.height, this.float.height) &&
      this.pulledFish
    ) {
      return;
    }
    if ($event.code === 'Space') {
      clearTimeouts([
        this.intervals['fishing'],
        this.intervals['moveFloat'],
        this.intervals['whenFishBreak']
      ])

      this.$emit('fishingInterval')
      this.$emit('fishBreak')
      this.intervals['intervalProgress'] = setInterval(() => {
        $('.catching__progress').css({
          width: `${$('.catching__progress').getStyleWidth() - 1}px`
        })
      }, 100)
    }
  }

  removeBait() {
    const baitInInventory = this.$getState('inventory')['bait'][0]
    const itemId = baitInInventory.id

    if (baitInInventory.quantity > 1) {
      this.$dispatch('inventory', updateTackle(baitInInventory, 'bait'))
      this.$dispatch('allTackle', updateTackle(baitInInventory, 'bait'))
      $('.footer-tackle-item__quantity').html(baitInInventory.quantity)
    } else {
      this.$dispatch('inventory', deleteItemInInventory('bait'))
      this.$dispatch('allTackle', deleteItem(itemId, 'bait'))

      $('[data-bait]')
        .html(`<img src="../assets/tackle-default/tackle-bait.png">`)
    }
  }

  timeoutFish(time, invervalFishion) {
    const diapason = randomNumberInDiapason(time, time + DIAPASON_NUMBER)
    console.log(diapason)
    setTimeout(() => {
      invervalFishion()
      this.$emit('fishBreak')
    }, diapason)
  }
}
