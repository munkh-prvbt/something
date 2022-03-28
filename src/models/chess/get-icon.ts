import type { Piece, Side } from '@/models/chess'
import kd from '@/components/icons/kd.svg'
import kl from '@/components/icons/kl.svg'
import qd from '@/components/icons/qd.svg'
import ql from '@/components/icons/ql.svg'
import rd from '@/components/icons/rd.svg'
import rl from '@/components/icons/rl.svg'
import nd from '@/components/icons/nd.svg'
import nl from '@/components/icons/nl.svg'
import bd from '@/components/icons/bd.svg'
import bl from '@/components/icons/bl.svg'
import pd from '@/components/icons/pd.svg'
import pl from '@/components/icons/pl.svg'

export const getIcon = ({
  side,
  piece,
}: {
  side: Side
  piece: Piece
}): string | undefined | any => {
  if (!side || !piece) {
    return ''
  }
  switch (piece[0] + side[0]) {
    case 'kd':
      return kd
    case 'kl':
      return kl
    case 'qd':
      return qd
    case 'ql':
      return ql
    case 'rd':
      return rd
    case 'rl':
      return rl
    case 'nd':
      return nd
    case 'nl':
      return nl
    case 'bd':
      return bd
    case 'bl':
      return bl
    case 'pd':
      return pd
    case 'pl':
      return pl
    default:
      return ''
  }
}
