class CreateElement {
  element
  #_params

  constructor(params) {
    this.#_params = params
    return this.#_run()
  }

  #_run() {
    this.element = document.createElement(this.#_params.tag)
    this.element.classList = this.#_params.classList
    this.#_addEventListener()
    this.#_addStyle()
    return this.element
  }

  #_addEventListener() {
    if ('listener' in this.#_params) {
      this.element.addEventListener(this.#_params.listener.type, this.#_params.listener.callback)
    }
  }

  #_addStyle() {
    if ('style' in this.#_params) {
      const keys = Object.entries(this.#_params.style)
      for (const [key, value] of keys) {
        this.element.style[key] = value
      }
    }
  }
}

export default CreateElement
