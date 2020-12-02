class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html !== "undefined") {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  removeAttr(name) {
    this.$el.removeAttribute(name)
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }

  insertHTML(where, html) {
    this.$el.insertAdjacentHTML(where, html)
    return this
  }

  hasClass(className) {
    return this.$el.classList.contains(className)
  }

  text(text) {
    if(!text) {
      return this.$el.innerText
    }
    return this.$el.innerText = text
  }

  clear() {
    this.html('')
    return this
  }

  getStyleWidth() {
    return +window.getComputedStyle(this.$el, null)['width'].slice(0, -2)
  }

  getComputedStyleProperty(propertyName) {
    return window.getComputedStyle(this.$el,null).getPropertyValue(propertyName)
  }

  isNotElement() {
    return this.$el === null
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles[key]
    })
  }

  remove(node) {
    if(node instanceof Dom) {
      node = node.$el
    }
    this.$el.removeChild(node)
  }

  removeElement() {
    this.$el.parentNode.removeChild(this.$el)
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) el.classList.add(classes)
  return $(el)
}
