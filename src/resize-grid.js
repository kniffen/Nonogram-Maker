function resizeGrid(cols, rows, grid) {

  if (grid[0].length < cols) {
    for (const y in grid) {
      for (let x = 0; x < cols; x++) {
        if (grid[y][x] == undefined) grid[y][x] = 0
      }
    }
  } else if (grid[0].length > cols) {
    for (const y in grid) {
      grid[y] = grid[y].slice(0, cols)
    }
  }

  if (grid.length < rows) {
    for (let y = grid.length; y < rows; y++) {
      grid[y] = grid[0].map(() => 0)      
    } 

  } else if (grid.length > rows) {
    while (grid.length > rows) {
      grid.pop()
    }
  }

}

module.exports = resizeGrid