import isThereAPiece from "./com/isThereAPiece";
import evaluateBishop from "./evaluateBishop";
import evaluateRook from "./evaluateRook";

// Essa função simplismente empresta as lógicas vinda das torres e bispos
// já que a dama é basicamente a junção dessas duas peças.
//
// Fiz isso porque economiza muitas linhas de código
const evaluateQueen = (
    pieces_table,
    start_square,
    end_square,
    movs_str,
) => {

    let is_mov_pos;

    if (start_square[0] === end_square[0] || start_square[1] === end_square[1]) {
        is_mov_pos = evaluateRook(pieces_table, start_square, end_square, movs_str);
    } else {
        is_mov_pos = evaluateBishop(pieces_table, start_square, end_square, movs_str);
    }

    if (is_mov_pos === true) {
        movs_str.current += "Q";

        if (isThereAPiece(pieces_table, end_square))
            movs_str.current += "x";
    }

    return is_mov_pos
};

export default evaluateQueen;
