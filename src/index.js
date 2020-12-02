import {Canvas} from '@/pages/Start/CanvasComponent/Canvas.component'
import { MenuComponent } from '@/pages/Menu/MenuComponent/Menu.component'
import { Router } from './routes/Router'
import { TackleComponent } from '@/pages/Start/TackleComponent/Tackle.component'
import { ShopComponent } from '@/pages/Shop/ShopComponent/Shop.component'
import {normalizeState} from '@core/utils'
import rootReducers from '@core/redux/rootReducers'
import {createStore} from '@/store/createStore'

import('./scss/index.scss')
const state = localStorage.getItem('state')
const store = createStore(rootReducers, normalizeState(state))

new Router({
  main: {
    root: 'game',
    components: [MenuComponent]
  },
  start: {
    root: 'canvas',
    components: [Canvas, TackleComponent]
  },
  shop: {
    root: 'shop',
    components: [ShopComponent]
  }
}, store)

