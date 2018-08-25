const drawOutputGrid = require('./draw-output-grid')
const generateClues  = require('./generate-clues')

function exportGrid(grid, type) {

  const a = document.createElement('a')

  if (type == 'png') {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const { horizontalClues, verticalClues } = generateClues(grid)
    const blankGrid = grid.map(row => row.map(() => 3))

    canvas.width  = blankGrid[0].length * 100
    canvas.height = blankGrid.length * 100

    drawOutputGrid(blankGrid, horizontalClues, verticalClues, canvas, ctx)
    
    const img = canvas.toDataURL("image/png")

    a.setAttribute('href', 'data:image/png' + img)
    a.setAttribute('download', 'nonogram.png')

  } else if (type == 'json') {
    const gridString = '[\n   ' + grid.map(row => JSON.stringify(row)).join(',\n   ') + '\n]'

    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(gridString))
    a.setAttribute('download', 'nonogram.json')
  }

  a.style.display = 'none'
  document.body.appendChild(a)

  a.click()

  document.body.removeChild(a)


}

module.exports = exportGrid