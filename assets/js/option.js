const CLASS_LIST = {
  ROW: 'row-elements',
  CELL: 'cell-element',
  ALIVE: 'alive-element'
}

const DEFAULT_PARAMS = {
  fieldSize: 50,
  indentField: 100,
  reproduction: 2,
  life: '23',
  timeEvolution: 100
}

const CALC_COORDINATE = [[1, 0], [-1, 0], [1, 1], [-1, -1], [0, 1], [0, -1], [-1, 1], [1, -1]]

const resultTuringDivision = (cord, fieldSize, type) => {
  const division = Number((cord / fieldSize).toString().split('.')[0])
  if (type === 'minus') {
    if (division === 0) return Math.abs(cord + fieldSize)
    const calc = Math.abs((cord - division * fieldSize))
    if (calc === 0) return calc
    else {
      const calc = Math.abs((cord - division * fieldSize))
      return Math.abs(calc - fieldSize)
    }
  }
  if (type === 'plus') return (cord - fieldSize * division)
}

const random = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

export {DEFAULT_PARAMS, CLASS_LIST, CALC_COORDINATE, resultTuringDivision, random}
