import areSameColor from "./com/areSameColors";
import isThereAPiece from "./com/isThereAPiece";

function forBody(
    pieces_table,
    start_square,
    end_square,
    is_horizontal,
    i,
) {
    let current_square = [];

    if (is_horizontal === false) {
        current_square[0] = start_square[0];
        current_square[1] = i;
    } else {
        current_square[1] = start_square[1];
        current_square[0] = i;
    }

    if (isThereAPiece(pieces_table, current_square) === true) {
        if (current_square[0] === end_square[0] && current_square[1] === end_square[1]) {
            if (areSameColor(pieces_table, start_square, current_square) === true) {
                return false;
            }
        } else {
            return false;
        }
    }

    return true;
}

const evaluateRook = (
    pieces_table,
    start_square,
    end_square,
) => {
    let is_mov_pos;

    if (start_square[1] === end_square[1]) { // se o movimento for pros lados
        if (end_square[0] > start_square[0]) { // pra direita
            for (let i = end_square[0]; i > start_square[0]; i--) {
                is_mov_pos = forBody(pieces_table, start_square, end_square, true, i);
                if (is_mov_pos === false)
                    break;
            }
        } else { // pra esquerda
            for (let i = end_square[0]; i < start_square[0]; i++) {
                is_mov_pos = forBody(pieces_table, start_square, end_square, true, i);
                if (is_mov_pos === false)
                    break;
            }
        }
    } else { // se o movimento for pra cima ou pra baixo
        if (end_square[1] > start_square[1]) { // pra cima
            for (let i = end_square[1]; i > start_square[1]; i--) {
                is_mov_pos = forBody(pieces_table, start_square, end_square, false, i);
                if (is_mov_pos === false)
                    break;
            }
        } else { // pra baixo
            for (let i = end_square[1]; i < start_square[1]; i++) {
                is_mov_pos = forBody(pieces_table, start_square, end_square, false, i);
                if (is_mov_pos === false)
                    break;
            }
        }
    }

    return is_mov_pos;
};

export default evaluateRook;
