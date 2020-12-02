import {Emitter} from '@core/Emitter/Emitter'
import {$} from '@core/Dom'
import {loaderHtml} from '@/pages/Start/CanvasComponent/Cavnas.functions'

export class Router {
  constructor(options, store) {
    this.options = options
    this.root = options.root
    this.store = store
    this.page = null
    this.emitter = new Emitter()

    this.initializationPage()
  }

  initializationPage() {
    window.addEventListener('hashchange', this.changePage.bind(this))
    this.changePage()
  }

  changePage() {
    if (this.page) this.destroy()

    let hash = window.location.hash.slice(1) || 'main'
    this.$root = $.create('div', this.options[hash].root).$el


    $('body').clear().append(this.$root)

    this.components = this.options[hash].components

    $('body').insertHTML('afterbegin', loaderHtml())
    this.$root.style.visibility = 'hidden'

    this.components = this.components.map(Component => {
      this.page = new Component($(this.$root), {
        store: this.store,
        emitter: this.emitter
      })

      this.$root.insertAdjacentHTML("beforeend", this.page.toHTML())
      return this.page
    })

    this.components.map(Component => Component.init())
  }


  destroy() {
    window.removeEventListener('hashchange', this.changePage.bind(this))
    this.components.map(component => {
      component.removeListeners()
    })
  }
}
