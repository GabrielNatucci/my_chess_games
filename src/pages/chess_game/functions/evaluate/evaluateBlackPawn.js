import areSameColor from "./com/areSameColors";
import isThereAPiece from "./com/isThereAPiece";

const evaluateBlackPawn = (
    pieces_table,
    start,
    end,
    w_pawns_moved,
    movs_str,
    horizontal,
) => {
    const origin_square = 6;

    console.log(horizontal);

    let w_pawns_map = w_pawns_moved.current;

    if (end[1] - start[1] < 0) {
        if (start[0] === end[0]) { // caso o movimento seja andando pra frente
            // caso não tenha nenhuma peça casa que a peça vai ficar
            if (isThereAPiece(pieces_table, end) === false) {
                let mid_square = [...start]
                mid_square[1]--;

                // caso a peça estega na casa de origem e
                // caso o movimento seja até dois pra frente
                if (start[1] === origin_square && 
                    (end[1] - start[1] === -2) && 
                    (isThereAPiece(pieces_table, mid_square) === false)) {
                    return true;
                }

                // caso seja só um lance pra frente
                if (end[1] - start[1] >= -1) {
                    return true;
                }
            }
        } else if ( // verifica se é uma tentativa de movimento na diagonal
            (start[0] === (end[0] + 1) ||
            start[0] === (end[0] - 1)) && 
            end[1] - start[1] >= -1
        ) {
            let is_mov_pos = false;

            if (isThereAPiece(pieces_table, end) === true) {
                if (areSameColor(pieces_table, start, end) === false) {
                    is_mov_pos = true;
                }
            } else if (w_pawns_map[end[0]] === 1) {
                w_pawns_map[end[0]] = 0;
                is_mov_pos = true;
            }

            if (is_mov_pos === true) {
                movs_str.current += `${horizontal[start[0]]}x`;
                return true;
            }
        }
    }

    return false;
};

export default evaluateBlackPawn;
