async function solver(cols, rows, horizontalClues, verticalClues) {

  const grid = []
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!grid[y]) grid[y] = []
      grid[y][x] = 0
    }
  }

  let changed = true
  while (changed) {
    changed = false

    for (const x in grid[0]) {
      let col = []

      for (const y in grid) col.push(grid[y][x])

      col = solveRow(verticalClues[x], col)

      for (const y in grid) {
        if (col[y] != 0 && col[y] != grid[y][x]) changed = true
        grid[y][x] = col[y]
      }
    }

    for (const y in grid) {
      let row = grid[y].slice()
      row = solveRow(horizontalClues[y], row)

      for (const x in grid[0]) {
        if (row[x] != 0 && row[x] != grid[y][x]) changed = true
        grid[y] = row
      }
    }
  }

  return grid

}

function solveRow(clues, row) {

  const permutations = getPermutations(clues, row.length)
  const validPermutations = []

  permutations.forEach(permutation => {
    let valid = true

    for (let x = 0; x < row.length; x++) {
      if (row[x] != 0 && row[x] != permutation[x]) valid = false
    }

    if (valid) validPermutations.push(permutation)
  })

  const newRow = validPermutations[0].slice()
  validPermutations.forEach(permutation => {
    for (let x = 0; x < row.length; x++) {
      if (newRow[x] != permutation[x]) newRow[x] = 0
    }
  })

  return newRow

}

function getPermutations(clues, length) {

  if (!clues.length) {
    const row = []

    for (let x = 0; x < length; x++) row.push(2)
    
    return [row]
  }

  const permutations = []

  for (let i = 0; i < length - clues[0] + 1; i++) {
    const permutation = []

    for (let x = 0; x < i; x++) permutation.push(2)

    for (let x = i; x < i + clues[0]; x++) permutation.push(1)

    let x = i + clues[0]

    if (x < length) {
      permutation.push(2)
      x += 1
    }

    if (x == length && !clues.length) {
      permutations.push(permutation)
      break
    }

    const subRows = getPermutations(clues.slice(1, clues.length), length - x)

    for (const j in subRows) {
      subPermutation = permutation.slice()

      for (let k = x; k < length; k++) {
        subPermutation.push(subRows[j][k - x])
      }

      permutations.push(subPermutation)
    }

  }

  return permutations

}

module.exports = solver