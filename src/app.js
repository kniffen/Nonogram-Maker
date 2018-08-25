const drawInputGrid         = require('./draw-input-grid')
const drawOutputGrid        = require('./draw-output-grid')
const solver                = require('./solver')
const generateClues         = require('./generate-clues')
const handleMouseEvent      = require('./handle-mouse-event')
const resizeGrid            = require('./resize-grid')
const exportGrid            = require('./export-grid')
const generateGridFromImage = require('./generate-grid-from-image')

const container = document.getElementById('container')

const widthInput  = container.querySelector('input[name="width"]')
const heightInput = container.querySelector('input[name="height"]')
const fileInput   = container.querySelector('input[name="file"]')

const clearBtn      = container.querySelector('button[name="clear"]')
const invertBtn     = container.querySelector('button[name="invert"]')
const imageBtn      = container.querySelector('button[name="image"]')
const exportJSONBtn = container.querySelector('button[name="export-json"]')
const exportPNGBtn  = container.querySelector('button[name="export-png"]')
const calculateBtn  = container.querySelector('button[name="calculate"]')

const inputCanvas  = container.querySelector('#input-grid canvas') 
const outputCanvas = container.querySelector('#output-grid canvas')

const inputCtx  = inputCanvas.getContext('2d')
const outputCtx = outputCanvas.getContext('2d')

let grid = [
  [0,0,0,1,1,1,1,0,0,0],
  [0,0,1,0,0,1,1,1,0,0],
  [1,1,1,1,1,1,1,1,1,1],
  [0,1,0,1,0,0,1,0,1,0],
  [1,0,0,0,1,1,0,0,0,1],
  [1,0,0,0,1,1,0,0,0,1],
  [0,1,0,1,0,0,1,0,1,0],
  [0,1,0,0,1,1,0,0,1,0],
  [0,0,1,0,0,0,0,1,0,0],
  [0,1,1,1,1,1,1,1,1,0],
]

inputCanvas.addEventListener('contextmenu', function(e) {
  e.preventDefault()
})

inputCanvas.addEventListener('mousedown', function(e) {
  container.classList.add('editing')
  handleMouseEvent(e, grid, inputCanvas.width, inputCanvas.height)
  drawInputGrid(grid, inputCanvas, inputCtx)
})

inputCanvas.addEventListener('mousemove', function (e) {
  handleMouseEvent(e, grid, inputCanvas.width, inputCanvas.height)
  drawInputGrid(grid, inputCanvas, inputCtx)
})

widthInput.addEventListener( 'change', function(e) {
  container.classList.add('editing')
  resizeGrid(parseInt(e.target.value), grid.length, grid)
  drawInputGrid(grid, inputCanvas, inputCtx)
})

heightInput.addEventListener('change', function(e) { 
  container.classList.add('editing')
  resizeGrid(grid[0].length, parseInt(e.target.value), grid)
  drawInputGrid(grid, inputCanvas, inputCtx)
})

clearBtn.addEventListener( 'click', function(e) {
  container.classList.add('editing')
  grid = grid.map(row => row.map(() => 0))
  drawInputGrid(grid, inputCanvas, inputCtx)
})

invertBtn.addEventListener('click', function(e) {
  container.classList.add('editing')
  grid = grid.map(row => row.map(cell => cell === 1 ? 0 : 1))
  drawInputGrid(grid, inputCanvas, inputCtx)
})

imageBtn.addEventListener('click', function(e) {
  fileInput.click()
})

fileInput.addEventListener('change', function(e) {

  if (!e.target.files.length || !e.target.accept.includes(e.target.files[0].type)) return

  const fr = new FileReader()

  fr.addEventListener('load', async function() {
    grid = await generateGridFromImage(fr.result, widthInput.value, heightInput.value)
    container.classList.add('editing')
  })

  fr.readAsDataURL(e.target.files[0])

})

exportPNGBtn.addEventListener('click', function(e) {
  exportGrid(grid, 'png')
})

exportJSONBtn.addEventListener('click', function(e) {
  exportGrid(grid, 'json')
})

calculateBtn.addEventListener('click', function(e) {
  container.classList.remove('editing')
  container.classList.add('calculating')

  setTimeout(function() {
    const { horizontalClues, verticalClues } = generateClues(grid)

    solver(grid[0].length, grid.length, horizontalClues, verticalClues)
      .then(solvedGrid => {
        drawOutputGrid(solvedGrid, horizontalClues, verticalClues, outputCanvas, outputCtx)
        container.classList.remove('calculating')
      })
      .catch(err => {
        console.log(err)
      })  
  }, 500)  
})

async function init() {
  const { horizontalClues, verticalClues } = generateClues(grid)
  const solvedGrid = await solver(grid[0].length, grid.length, horizontalClues, verticalClues)
  
  drawInputGrid(grid, inputCanvas, inputCtx)
  drawOutputGrid(solvedGrid, horizontalClues, verticalClues, outputCanvas, outputCtx)
}

init()