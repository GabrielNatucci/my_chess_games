import evaluateWhitePawn from "./evaluate/evaluateWhitePawn.js";
import evaluateRook from "./evaluate/evaluateRook.js";

const validadeMoves = (
    pieces_table,
    start_square,
    end_square,
    active_piece,
) => {
    console.log(active_piece.current);
    if (active_piece.current.className.search("wpawn") === 0) {
        if (evaluateWhitePawn(pieces_table, start_square, end_square) === true) {
            return true;
        } else {
            return false;
        }
    }


    if (active_piece.current.className.search("wrook") === 0 ||
        active_piece.current.className.search("brook") === 0) {
        if (evaluateRook(pieces_table, start_square, end_square) === true) {
            return true;
        } else {
            return false;
        }
    }

    return true;
};

export default validadeMoves;
