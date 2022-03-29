import type { Square } from './interfaces'
import { Piece, type Horizontal, type Vertical } from './enums'
import { cloneDeep, flatten } from 'lodash'

const isLegal = (start: Square, end: Square): boolean => {
  const { id: startId, item } = start
  const { id: endId } = end
  if (!item) {
    return false
  }

  switch (item.piece) {
    case Piece.king:
      return true

    default:
      return true
  }
}

export const movePiece = (
  squares: Square[][],
  x1: Horizontal,
  y1: Vertical,
  x2: Horizontal,
  y2: Vertical
): Square[][] => {
  const copy = cloneDeep(squares)
  if (x1 === x2 && y1 === y2) {
    return copy
  }

  const flatBoard = flatten(copy)

  const start = flatBoard.find(({ x, y }) => x === x1 && y === y1)
  const end = flatBoard.find(({ x, y }) => x === x2 && y === y2)

  if (start && end && isLegal(start, end)) {
    copy[Math.floor(end.id / 8)][end.id % 8].item = start.item
    copy[Math.floor(start.id / 8)][start.id % 8].item = undefined
  }

  return copy
}
