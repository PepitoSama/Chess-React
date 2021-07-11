import king_black from './assets/classic/Chess_kb.svg';
import king_white from './assets/classic/Chess_kw.svg';
import bishop_black from './assets/classic/Chess_bb.svg';
import bishop_white from './assets/classic/Chess_bw.svg';
import knight_black from './assets/classic/Chess_nb.svg';
import knight_white from './assets/classic/Chess_nw.svg';
import pawn_black from './assets/classic/Chess_pb.svg';
import pawn_white from './assets/classic/Chess_pw.svg';
import queen_black from './assets/classic/Chess_qb.svg';
import queen_white from './assets/classic/Chess_qw.svg';
import rook_black from './assets/classic/Chess_rb.svg';
import rook_white from './assets/classic/Chess_rw.svg';

export class Pieces {
  constructor(theme="classic") {
    this.king_black = king_black;
    this.king_white = king_white;
    this.bishop_black = bishop_black;
    this.bishop_white = bishop_white;
    this.knight_black = knight_black;
    this.knight_white = knight_white;
    this.pawn_black = pawn_black;
    this.pawn_white = pawn_white;
    this.queen_black = queen_black;
    this.queen_white = queen_white;
    this.rook_black = rook_black;
    this.rook_white = rook_white;
  }

  getPiece(pieceObject) {
    if (!pieceObject) return null;
    const {type, color} = pieceObject;
    if (color === 'w') {
      switch (type) {
        case 'k':
          return this.king_white;
        case 'q':
          return this.queen_white;
        case 'b':
          return this.bishop_white;
        case 'r':
          return this.rook_white;
        case 'n':
          return this.knight_white;
        case 'p':
          return this.pawn_white;
        default:
          return null;
      }
    } else {
      switch (type) {
        case 'k':
          return this.king_black;
        case 'q':
          return this.queen_black;
        case 'b':
          return this.bishop_black;
        case 'r':
          return this.rook_black;
        case 'n':
          return this.knight_black;
        case 'p':
          return this.pawn_black;
        default:
          return null;
      }
    }
  }
}