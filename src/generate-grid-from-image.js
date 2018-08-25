function generateGridFromImage(src, width, height) {

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const img = document.createElement('img')

    img.src = src

    img.onload = function() {

      canvas.width  = width
      canvas.height = height
      canvas.getContext('2d').drawImage(img, 0, 0, width, height)

      const grid = []
      for (let y = 0; y < height; y++) {
        if (!grid[y]) grid[y] = []
        for (let x = 0; x < width; x++) {
          const data = canvas.getContext('2d').getImageData(x, y, 1, 1).data

          if (data[0] < 128 && data[1] < 128 && data[2] < 128) {
            grid[y][x] = 1
          } else {
            grid[y][x] = 0
          }

        }
      }

      resolve(grid)

    }
  })

}

module.exports = generateGridFromImage