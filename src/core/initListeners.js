export class InitListeners {
  constructor($root, options) {
    this.$root = $root
    this.listeners = options.listeners
  }

  initialListeners() {
    this.listeners.forEach(listener => {
      const method = this.method(listener)
      const methodKeyDown = this.methodKeyDown(listener)

      if (!this[method]) {
        throw new Error(`Implement the method ${method}`)
      }
      if (!listener.indexOf('key')) {
        window[methodKeyDown] = this[method].bind(this)
      } else {
        this.$root.on(listener, this[method].bind(this))
      }
    })
  }

  removeListeners() {
    this.listeners.forEach(listener => {
      const method = this.method(listener)
      const methodKeyDown = this.methodKeyDown(listener)

      this.$root.off(listener, this[method])
      window[methodKeyDown] = null
    })
  }

  method(listener) {
    return 'on' + listener.charAt(0).toUpperCase() + listener.substr(1);
  }

  methodKeyDown(listener) {
    return 'on' + listener
  }
}
