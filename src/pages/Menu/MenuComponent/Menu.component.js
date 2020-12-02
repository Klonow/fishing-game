import backgroundImageMenu from '@/assets/backgrounds/background-image-for-menu.png'
import {FishingComponent} from '@core/FishingComponent'

export class MenuComponent extends FishingComponent {
  constructor($root, options) {
    super($root, {
      root: 'menu',
      listeners: [],
      ...options
    })
  }

  toHTML() {
    return `<div class='main-menu'>
              <div class="main-menu__title">
                <div class="title">
                  <h1 class="title__header">Меню</h1>
                  <div class="title__triangle"></div>
                </div>
              </div>
              <div class="main-menu__start">
                 <a href="#start">Начать игру</a>
              </div>
              <div class="main-menu__tackle">
                <a href="#shop">Магазин</a>
              </div>
            </div>`
  }


  init() {
    const backgroundImage = new Image()
    backgroundImage.src = backgroundImageMenu

    this.load([backgroundImage])
  }
}
