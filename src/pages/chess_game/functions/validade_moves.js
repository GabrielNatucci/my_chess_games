import evaluateWhitePawn from "./evaluate/evaluateWhitePawn.js";
import evaluateRook from "./evaluate/evaluateRook.js";
import evaluateKnight from "./evaluate/evaluateKnight.js";
import evaluateKing from "./evaluate/evaluateKing.js";
import evaluateBishop from "./evaluate/evaluateBishop.js";

const validadeMoves = (
    pieces_table,
    start_square,
    end_square,
    active_piece,
    isBlackToMove,
) => {
    // console.log(active_piece.current);
    // feitos: 
    // peoes brancos
    // torres
    // cavalos
    // reis
    // bispos
    // movimentos alternados, cada um tem sua vez afinal de contas
    //
    // falta:
    // dama
    // peões pretos
    // an passant
    // roque
    // refatorar torres

    // movimentos alternados, cada um tem sua vez afinal de contas
    if (isBlackToMove.current === true) {
        if (active_piece.current.className[0] === 'w')
            return false;
    } else {
        if (active_piece.current.className[0] === 'b')
            return false;
    }

    if (active_piece.current.className.search("wpawn") === 0) { //peões brancos
        if (evaluateWhitePawn(pieces_table, start_square, end_square) === true) {
            return true;
        } else {
            return false;
        }
    }

    if (active_piece.current.className.search("wrook") === 0 || // torres
        active_piece.current.className.search("brook") === 0) {
        if (evaluateRook(pieces_table, start_square, end_square) === true) {
            return true;
        } else {
            return false;
        }
    }

    if (active_piece.current.className.search("wknight") === 0 || // cavalos
        active_piece.current.className.search("bknight") === 0) {
        if (evaluateKnight(pieces_table, start_square, end_square) === true) {
            return true;
        } else {
            return false;
        }
    }

    if (active_piece.current.className.search("wking") === 0 || // reis
        active_piece.current.className.search("bking") === 0) {
        if (evaluateKing(pieces_table, start_square, end_square)) {
            return true;
        } else {
            return false;
        }
    }

    if (active_piece.current.className.search("wbishop") === 0 || // bispos
        active_piece.current.className.search("bbishop") === 0) {
        if (evaluateBishop(pieces_table, start_square, end_square)) {
            return true;
        } else {
            return false;
        }
    }

    return true;
};

export default validadeMoves;
