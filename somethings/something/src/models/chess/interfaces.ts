import type { Horizontal, Vertical, Side, Piece } from './enums'

export interface Square {
  id: number
  x: Horizontal
  y: Vertical
  item?: {
    side: Side
    piece: Piece
  }
}

export interface Board {
  squares: Square[][]
}
