function drawInputGrid(grid, canvas, ctx) {

  canvas.width = canvas.width

  const dim = Math.floor( 
    grid[0].length >= grid.length 
    ? canvas.width / grid[0].length
    : canvas.height / grid.length
  )

  // Cells
  for (const y in grid) {
    for (const x in grid[y]) {

      ctx.strokeStyle = '#686868'
      ctx.lineWidth = 1.5
      ctx.strokeRect(x * dim, y * dim, dim, dim)

      if (grid[y][x] === 1) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(x * dim, y * dim, dim, dim)
      }

    }
  }

  // Border
  ctx.strokeStyle = '#000000'
  ctx.strokeRect(0, 0, dim * grid[0].length, dim * grid.length)

}

module.exports = drawInputGrid