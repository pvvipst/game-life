import {CALC_COORDINATE, DEFAULT_PARAMS, random, resultTuringDivision} from "../option.js";
import CellElement from "../cell-element";

class Field {
  #_params
  #_fieldElements = []
  #_documentDoc = document.getElementById('container')
  #_startGameDoc = document.getElementById('start-game')
  #_evolutionDoc = document.getElementById('count-evolution')
  #_countEvolution = 0
  #_interval
  #_mouseDown = false

  constructor(params = DEFAULT_PARAMS) {
    this.#_params = {
      fieldSize: Number(params.fieldSize),
      reproduction: Number(params.reproduction),
      timeEvolution: Number(params.timeEvolution),
      life: params.life.split('').map(tt => Number(tt)),
      sizeElement: 5
    }
    this.#_generateDocument()
  }

  #_generateDocument() {
    this.#_documentDoc.style.width = `${this.#_params.sizeElement * this.#_params.fieldSize}px`
    this.#_documentDoc.style.height = `${this.#_params.sizeElement * this.#_params.fieldSize}px`
    this.#_documentDoc.addEventListener('mousemove', this.#_mouseMoveListener)
    this.#_documentDoc.addEventListener('mousedown', this.#_mouseDownListener)
    this.#_documentDoc.addEventListener('mouseup', this.#_mouseUpListener)
    this.#_startGameDoc.addEventListener('click', this.#_startGameListener)
  }

  #_mouseDownListener = (event) => {
    this.#_mouseDown = !this.#_mouseDown
    this.#_addLifeField(event)
  }

  #_mouseMoveListener = (event) => {
    if (this.#_mouseDown) this.#_addLifeField(event)
  }

  #_mouseUpListener = () => {
    this.#_mouseDown = !this.#_mouseDown
  }

  #_addLifeField = (event) => {
    const x = Math.floor(event.offsetX / this.#_params.sizeElement)
    const y = Math.floor(event.offsetY / this.#_params.sizeElement)

    if (event.target === this.#_documentDoc) this.#_addLife(y, x, y, x)
  }

  #_restartGame() {
    clearInterval(this.#_interval)
    this.#_startGameDoc.removeAttribute('disabled')
    this.#_documentDoc.addEventListener('mousemove', this.#_mouseMoveListener)
    this.#_documentDoc.addEventListener('mousedown', this.#_mouseDownListener)
    this.#_documentDoc.addEventListener('mouseup', this.#_mouseUpListener)
    this.#_countEvolution = 0
  }

  #_startGameListener = () => {
    if (this.#_fieldElements.length === 0) this.#_generateLife()
    this.#_interval = setInterval(this.#_evolution.bind(this), this.#_params.timeEvolution)
    this.#_startGameDoc.setAttribute('disabled', '')
    this.#_documentDoc.removeEventListener('click', this.#_addLifeField)
    this.#_documentDoc.removeEventListener('mousedown', this.#_mouseDownListener)
    this.#_documentDoc.removeEventListener('mousemove', this.#_mouseMoveListener)
    this.#_documentDoc.removeEventListener('mouseup', this.#_mouseUpListener)
  }

  #_generateLife() {
    const [y, x] = [random(0, this.#_params.fieldSize - this.#_params.fieldSize / 2), random(0, this.#_params.fieldSize - this.#_params.fieldSize / 2)]
    this.#_addLife(y, x, y, x)

    for (let n = 0; n < random(1, 5); n++) {
      for (const [i, j] of CALC_COORDINATE) {
        this.#_addLife(y + i + n, x + j + n, y + i + n, x + j + n)
      }
    }
  }

  #_evolution() {
    if (this.#_fieldElements.length === 0) {
      this.#_restartGame()
      return
    }
    this.#_countEvolution++
    this.#_evolutionDoc.innerText = this.#_countEvolution.toString()
    const _checkLife = []
    const _cellDie = []

    for (const elements of this.#_fieldElements) {
      if (elements._params.isChecked) continue

      const [y, x] = [elements._params.y, elements._params.x]
      let count = 0

      for (const _calcPosition of CALC_COORDINATE) {
        const [i, j] = _calcPosition

        if (this.#_fieldElements.find((item) => item._params.y === y + i && item._params.x === x + j) !== undefined) {
          count++
        } else _checkLife.push([y + i, x + j])
      }

      elements.setChecked()
      if (!this.#_params.life.includes(count)) {
        _cellDie.push([y, x])
      }
    }

    this.#_evolutionLife(_checkLife, _cellDie)
  }

  #_evolutionLife(_checkLife, _cellDie) {
    const _cordLife = []
    for (const position of _checkLife) {
      let count = 0
      const [y, x] = position

      for (const _cord of CALC_COORDINATE) {
        const [i, j] = _cord
        if (this.#_fieldElements.find((item) => item._params.y === y + i && item._params.x === x + j) !== undefined) {
          count++
        }
      }
      if (count === this.#_params.reproduction && _cordLife.find((item) => item[0] === y && item[1] === x) === undefined) {
        _cordLife.push(position)
      }
    }

    this.#_evolutionDie(_cellDie)

    for (let i = 0; i < _cordLife.length; i++) {
      const [y, x] = _cordLife[i]
      let yView, xView

      if (y >= this.#_params.fieldSize) yView = resultTuringDivision(y, this.#_params.fieldSize, 'plus')
      else if (y < 0) yView = resultTuringDivision(y, this.#_params.fieldSize, 'minus')
      else yView = y

      if (x >= this.#_params.fieldSize) xView = resultTuringDivision(x, this.#_params.fieldSize, 'plus')
      else if (x < 0) xView = resultTuringDivision(x, this.#_params.fieldSize, 'minus')
      else xView = x

      this.#_addLife(y, x, yView, xView)
    }
  }

  #_evolutionDie(_cellDie) {
    for (const element of _cellDie) {
      this.#_fieldElements = this.#_fieldElements.filter((item) => {
        const {y, x} = item._params
        if (element[0] === y && element[1] === x) {
          item.die()
          return false
        }
        return true
      })
    }
  }

  #_addLife(y, x, yView, xView) {
    const _cell = new CellElement({x, y, yView, xView, sizeElement: this.#_params.sizeElement})
    this.#_documentDoc.append(_cell.element)
    this.#_fieldElements.push(_cell)
  }
}

export default Field
