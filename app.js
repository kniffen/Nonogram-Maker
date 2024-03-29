import drawInputGrid         from './draw-input-grid.js'
import drawOutputGrid        from './draw-output-grid.js'
import solver                from './solver.js'
import generateClues         from './generate-clues.js'
import handleMouseEvent      from './handle-mouse-event.js'
import resizeGrid            from './resize-grid.js'
import exportGrid            from './export-grid.js'
import generateGridFromImage from './generate-grid-from-image.js'

const container = document.getElementById('container')

const widthInput  = container.querySelector('input[name="width"]')
const heightInput = container.querySelector('input[name="height"]')
const fileInput   = container.querySelector('input[name="file"]')

const clearBtn      = container.querySelector('button[name="clear"]')
const invertBtn     = container.querySelector('button[name="invert"]')
const imageBtn      = container.querySelector('button[name="image"]')
const exportJSONBtn = container.querySelector('button[name="export-json"]')
const exportPNGBtn  = container.querySelector('button[name="export-png"]')

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
  handleMouseEvent(e, grid, inputCanvas.width, inputCanvas.height)
  drawInputGrid(grid, inputCanvas, inputCtx)
})

inputCanvas.addEventListener('mousemove', function (e) {
  handleMouseEvent(e, grid, inputCanvas.width, inputCanvas.height)
  drawInputGrid(grid, inputCanvas, inputCtx)
})

inputCanvas.addEventListener('mouseup', function(e) {
  if (!container.classList.contains('calculating')) {
    calculate() 
  }
})

widthInput.addEventListener( 'change', function(e) {
  resizeGrid(parseInt(e.target.value), grid.length, grid)
  drawInputGrid(grid, inputCanvas, inputCtx)
  calculate()
})

heightInput.addEventListener('change', function(e) { 
  resizeGrid(grid[0].length, parseInt(e.target.value), grid)
  drawInputGrid(grid, inputCanvas, inputCtx)
  calculate()
})

clearBtn.addEventListener( 'click', function(e) {
  grid = grid.map(row => row.map(() => 0))
  drawInputGrid(grid, inputCanvas, inputCtx)
  calculate()
})

invertBtn.addEventListener('click', function(e) {
  grid = grid.map(row => row.map(cell => cell === 1 ? 0 : 1))
  drawInputGrid(grid, inputCanvas, inputCtx)
  calculate()
})

imageBtn.addEventListener('click', function(e) {
  fileInput.click()
})

fileInput.addEventListener('change', function(e) {

  if (!e.target.files.length || !e.target.accept.includes(e.target.files[0].type)) return

  const fr = new FileReader()

  fr.addEventListener('load', function() {
    generateGridFromImage(fr.result, widthInput.value, heightInput.value).then(generatedGrid => {
      grid = generatedGrid
      calculate()
    })
  })

  fr.readAsDataURL(e.target.files[0])

})

exportPNGBtn.addEventListener('click', function(e) {
  exportGrid(grid, 'png')
})

exportJSONBtn.addEventListener('click', function(e) {
  exportGrid(grid, 'json')
})

function calculate() {
  container.classList.add('calculating')

  setTimeout(function() {
    const { horizontalClues, verticalClues } = generateClues(grid)
    const solvedGrid = solver(grid[0].length, grid.length, horizontalClues, verticalClues)
    
    drawOutputGrid(solvedGrid, horizontalClues, verticalClues, outputCanvas, outputCtx)
    container.classList.remove('calculating')
  }, 50)  
}

function init() {
  const { horizontalClues, verticalClues } = generateClues(grid)
  const solvedGrid = solver(grid[0].length, grid.length, horizontalClues, verticalClues)
  
  drawInputGrid(grid, inputCanvas, inputCtx)
  drawOutputGrid(solvedGrid, horizontalClues, verticalClues, outputCanvas, outputCtx)
}

init()