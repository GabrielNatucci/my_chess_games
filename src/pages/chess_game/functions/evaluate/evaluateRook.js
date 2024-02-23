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
    start,
    end,
    movs_str
) => {
    let is_mov_pos;

    if (start[1] === end[1]) { // se o movimento for pros lados
        if (end[0] > start[0]) { // pra direita
            for (let i = end[0]; i > start[0]; i--) {
                is_mov_pos = forBody(pieces_table, start, end, true, i);
                if (is_mov_pos === false) {
                    break;
                }
            }
        } else { // pra esquerda
            for (let i = end[0]; i < start[0]; i++) {
                is_mov_pos = forBody(pieces_table, start, end, true, i);
                if (is_mov_pos === false) {
                    break;
                }
            }
        }
    } else
        if (end[1] > start[1]) { // pra cima
            for (let i = end[1]; i > start[1]; i--) {
                is_mov_pos = forBody(pieces_table, start, end, false, i);
                if (is_mov_pos === false) {
                    break;
                }
            }
        } else { // pra baixo
            for (let i = end[1]; i < start[1]; i++) {
                is_mov_pos = forBody(pieces_table, start, end, false, i);
                if (is_mov_pos === false) {
                    break;
                }
            }
        }

    if (is_mov_pos === true) {
        if (pieces_table[start[0]][start[1]].search("wrook") === 0 || // torres, tive que fazer essa adição adicional por causa da reciclagem dessa função
            pieces_table[start[0]][start[1]].search("brook") === 0) {
            let class_piece = [...pieces_table[start[0]][start[1]]]; // muda o id da peça para saber que já foi movida
            class_piece[9] = '1';
            pieces_table[start[0]][start[1]] = class_piece.toString().replaceAll(',', '');
        }


        if (pieces_table[start[0]][start[1]].search("wrook") === 0 || // torres
            pieces_table[start[0]][start[1]].search("brook") === 0) { 
                movs_str.current += "R";

                if (isThereAPiece(pieces_table, end) === true) {
                    movs_str.current += "x";
                }
            }


        return true;
    } else {
        return false;
    }
};

export default evaluateRook;