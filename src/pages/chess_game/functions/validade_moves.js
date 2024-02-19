import evaluateWhitePawn from "./evaluate/evaluateWhitePawn.js";
import evaluateRook from "./evaluate/evaluateRook.js";
import evaluateKnight from "./evaluate/evaluateKnight.js";
import evaluateKing from "./evaluate/evaluateKing.js";
import evaluateBishop from "./evaluate/evaluateBishop.js";
import evaluateBlackPawn from "./evaluate/evaluateBlackPawn.js";
import evaluateQueen from "./evaluate/evaluateQueen.js";

const validadeMoves = (
    pieces_table,
    start,
    end,
    active_piece,
    isBlackToMove,
    w_pawns_moved,
    b_pawns_moved,
) => {
    // feitos: 
    // peoes brancos
    // torres
    // cavalos
    // reis
    // bispos
    // movimentos alternados, cada um tem sua vez afinal de contas
    // peões pretos
    // dama

    // falta:
    // an passant
    // roque

    // movimentos alternados, cada um tem sua vez afinal de contas
    if (isBlackToMove.current === true) {
        if (active_piece.current.className[0] === 'w')
            return false;
    } else {
        if (active_piece.current.className[0] === 'b')
            return false;
    }

    let is_mov_possible = false;

    if ((active_piece.current.className.search("bpawn") === 0) || (active_piece.current.className.search("wpawn") === 0)) { // peões
        let origin_square;

        if (active_piece.current.className.search("wpawn") === 0) { //peões brancos
            if (start[1] === origin_square && (end[1] - start[1] === 2)) {
                w_pawns_moved.current[pieces_table[start[0]][start[1]][7]] = 1;
            }

            if (evaluateWhitePawn(pieces_table, start, end, w_pawns_moved) === true) {
                origin_square = 1;

                console.log("black: " + b_pawns_moved.current);
                console.log("white: " + w_pawns_moved.current);
                for (let i = 0; i < w_pawns_moved.current.length; i++) {
                    b_pawns_moved.current[i] = 0;
                }

                is_mov_possible = true;
            }
        }

        if (active_piece.current.className.search("bpawn") === 0) { //peões pretos
            if (start[1] === origin_square && (end[1] - start[1] === -2)) {
                b_pawns_moved.current[pieces_table[start[0]][start[1]][7]] = 1;
            }

            if (evaluateBlackPawn(pieces_table, start, end, b_pawns_moved) === true) {
                origin_square = 6;
                is_mov_possible = true;

                console.log("black: " + b_pawns_moved.current);
                console.log("white: " + w_pawns_moved.current);
                for (let i = 0; i < w_pawns_moved.current.length; i++) {
                    w_pawns_moved.current[i] = 0;
                }
            }
        }

    }


    if (active_piece.current.className.search("wrook") === 0 || // torres
        active_piece.current.className.search("brook") === 0) {
        if (evaluateRook(pieces_table, start, end, active_piece) === true)
            is_mov_possible = true;
    }

    if (active_piece.current.className.search("wking") === 0 || // reis
        active_piece.current.className.search("bking") === 0) {
        if (evaluateKing(pieces_table, start, end, active_piece))
            is_mov_possible = true;
    }

    if (active_piece.current.className.search("wknight") === 0 || // cavalos
        active_piece.current.className.search("bknight") === 0) {
        if (evaluateKnight(pieces_table, start, end) === true)
            is_mov_possible = true;
    }

    if (active_piece.current.className.search("wbishop") === 0 || // bispos
        active_piece.current.className.search("bbishop") === 0) {
        if (evaluateBishop(pieces_table, start, end))
            is_mov_possible = true;
    }

    if (active_piece.current.className.search("wqueen") === 0 || // bispos
        active_piece.current.className.search("bqueen") === 0) {
        if (evaluateQueen(pieces_table, start, end))
            is_mov_possible = true;
    }

    return is_mov_possible;
};

export default validadeMoves;
