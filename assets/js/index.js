import Field from "./field";

const $form = document.getElementById('setting-form')
const $container = document.getElementById('container')
const $btnStart = document.getElementById('start-game')
const $header = document.querySelector('.header')
const FIELDS = ['fieldSize', 'reproduction', 'life', 'timeEvolution']

$form.addEventListener('submit', (event) => {
  event.preventDefault()
  const params = {}

  FIELDS.forEach((item) => {
    params[item] = document.getElementById(item).value
  })

  $container.style.display = 'block'
  $form.style.display = 'none'
  $btnStart.style.display = 'block'
  $header.style.display = 'flex'
  new Field(params)
})
