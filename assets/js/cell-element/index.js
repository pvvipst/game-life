import CreateElement from "../create-element";
import {CLASS_LIST} from "../option.js";

class CellElement {
  element
  _params

  constructor(params) {
    this._params = {
      ...params,
      isChecked: false
    }
    this.#_generate()
  }

  die() {
    this.element.remove()
  }

  setChecked() {
    this._params.isChecked = true
  }

  #_generate() {
    this.element = new CreateElement({
      tag: 'div',
      classList: CLASS_LIST.CELL,
      style: {
        width: `${this._params.sizeElement}px`,
        height: `${this._params.sizeElement}px`,
        left: `${this._params.xView * this._params.sizeElement}px`,
        top: `${this._params.yView * this._params.sizeElement}px`,
      },
    })
  }

}

export default CellElement
