function drawOutputGrid(grid, horizontalClues, verticalClues, canvas, ctx) {

  canvas.width = canvas.width

  const dim = Math.floor(
    grid[0].length >= grid.length
    ? canvas.width  / (grid[0].length * 1.5)
    : canvas.height / (grid.length * 1.5)
  )

  // Background
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Cells
  for (const y in grid) {
    for (const x in grid[y]) {

      ctx.strokeStyle = '#686868'
      ctx.strokeRect(canvas.width / 3 + x * dim, canvas.height / 3 + y * dim, dim, dim)

      switch (grid[y][x]) {
        case 0: 
          ctx.fillStyle = '#FF0000'
          break

        case 1: 
          ctx.fillStyle = '#000000'
          break

        default: 
          ctx.fillStyle = '#FFFFFF'
          break
      }

      ctx.fillRect(canvas.width / 3 + x * dim, canvas.height / 3 + y * dim, dim, dim)

      if (grid[y][x] === 2) {
        ctx.beginPath()
        ctx.strokeStyle = '#FF0000'
        ctx.moveTo(
          canvas.width  / 3 + x * dim + dim * 0.2,
          canvas.height / 3 + y * dim + dim * 0.2
        )
        ctx.lineTo(
          canvas.width  / 3 + x * dim + dim - dim * 0.2,
          canvas.height / 3 + y * dim + dim - dim * 0.2
        )
        ctx.stroke()
        ctx.beginPath()
        ctx.strokeStyle = '#FF0000'
        ctx.moveTo(
          canvas.width / 3 + x * dim + dim - dim * 0.2,
          canvas.height / 3 + y * dim + dim * 0.2
        )
        ctx.lineTo(
          canvas.width  / 3 + x * dim + dim * 0.2,
          canvas.height / 3 + y * dim + dim - dim * 0.2
        )
        ctx.stroke()
      }

    }
  }

  // Horizontal clues
  for (const y in grid) {
    horizontalClues[y].reverse()
    for (let x = 0; x < grid[y].length / 2; x++) {

      ctx.fillStyle = y % 2 === 0 ? '#DDDDDD' : '#EAEAEA'
      ctx.fillRect(
        canvas.width  / 3 - x * dim - dim, 
        canvas.height / 3 + y * dim, 
        dim, 
        dim
      )
      
      if (horizontalClues[y][x]) {
        ctx.font = dim * 0.4 + 'px Arial'
        ctx.fillStyle = '#000000'
        ctx.fillText(
          horizontalClues[y][x], 
          canvas.width  / 3 - x * dim - dim / 1.5, 
          canvas.height / 3 + y * dim + dim / 1.5
        )
      }

    }

    if (!horizontalClues[y].length) {
      ctx.font = dim * 0.4 + 'px Arial'
      ctx.fillStyle = '#000000'
      ctx.fillText(
        0, 
        canvas.width  / 3 - dim / 1.5, 
        canvas.height / 3 + y * dim + dim / 1.5
      )
    }
  }

  // Vertical clues
  for (const x in grid[0]) {
    verticalClues[x].reverse()
    for (let y = 0; y < grid.length / 2; y++) {

      ctx.fillStyle = x % 2 === 0 ? '#DDDDDD' : '#EAEAEA'
      ctx.fillRect(
        canvas.width  / 3 + x * dim, 
        canvas.height / 3 - y * dim - dim, 
        dim, 
        dim
      )

      if (verticalClues[x][y]) {
        ctx.font = dim * 0.4 + 'px Arial'
        ctx.fillStyle = '#000000'
        ctx.fillText(
          verticalClues[x][y], 
          canvas.width  / 3 + x * dim + dim / 3, 
          canvas.height / 3 - y * dim - dim / 3
        )
      }
    }

    if (!verticalClues[x].length) {
      ctx.font = dim * 0.4 + 'px Arial'
      ctx.fillStyle = '#000000'
      ctx.fillText(
        0, 
        canvas.width  / 3 + x * dim + dim / 3, 
        canvas.height / 3 - dim / 3
      )
    }
  }

  // Deviders
  for (let x = 0; x <= grid[0].length; x++) {
    if (x % 5 === 0) {
      ctx.beginPath()
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 1.5
      ctx.moveTo(canvas.width / 3 + x * dim, 0)
      ctx.lineTo(canvas.width / 3 + x * dim, canvas.height / 3 + dim * grid.length )
      ctx.stroke()
    }
  }

  for (let y = 0; y <= grid.length; y++) {
    if (y % 5 === 0) {
      ctx.beginPath()
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 1.5
      ctx.moveTo(0, canvas.height / 3 + y * dim)
      ctx.lineTo(canvas.width / 3 + dim * grid[0].length, canvas.height / 3 + y * dim)
      ctx.stroke()
    }
  }

}

module.exports= drawOutputGrid