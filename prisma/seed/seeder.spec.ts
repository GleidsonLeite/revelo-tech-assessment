import { batchArray } from './seeder'

describe('batchArray', () => {
  it('should batch an array into smaller arrays of the specified size', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8]
    const size = 3
    const result = batchArray(array, size)
    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8],
    ])
  })

  it('should handle an empty array', () => {
    const array = []
    const size = 3
    const result = batchArray(array, size)
    expect(result).toEqual([])
  })
})
