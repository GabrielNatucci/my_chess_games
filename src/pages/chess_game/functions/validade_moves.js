import evaluatePawn from "./evaluate/evaluateWhitePawn.js";

const validadeMoves = (pieces_table, start_square, end_square, active_piece) => {

    if (evaluatePawn(pieces_table, start_square, end_square) === true) {
        return true;
    }

    if (evaluatePawn(pieces_table, start_square, end_square) === true) {
        return true;
    }

    if (active_piece.current.className.search("wpawn") === -1) {
        return true;
    }

    return false;
}

export default validadeMoves;
