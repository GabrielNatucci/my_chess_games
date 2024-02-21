import areSameColor from "./com/areSameColors";
import isThereAPiece from "./com/isThereAPiece";

const evaluateWhitePawn = (
    pieces_table,
    start,
    end,
    b_pawns_moved,
) => {
    const origin_square = 1;

    let b_pawns_map = b_pawns_moved.current;

    if (end[1] - start[1] > 0) {
        if (start[0] === end[0]) { // caso o movimento seja andando pra frente
            // caso não tenha nenhuma peça casa que a peça vai ficar
            if (isThereAPiece(pieces_table, end) === false) {
                // caso a peça estega na casa de origem e
                // caso o movimento seja até dois pra frente
                let mid_square = [...start]
                mid_square[1]--;

                if (start[1] === origin_square && 
                    (isThereAPiece(pieces_table, mid_square) === false) && 
                    (end[1] - start[1] === 2)) {
                    return true;
                }

                // caso seja só um lance pra frente
                if (end[1] - start[1] <= 1) {
                    return true;
                }
            }
        } else if ( // verifica se é uma tentativa de movimento na diagonal
            (start[0] === (end[0] + 1) ||
            start[0] === (end[0] - 1)) && 
            end[1] - start[1] <= 1
        ) {
            if (isThereAPiece(pieces_table, end) === true) {
                if (areSameColor(pieces_table, start, end) === false) {
                    return true;
                }
            } else if (b_pawns_map[end[0]] === 1) {
                b_pawns_map[end[0]] = 0;
                return true;
            }
        }
    }

    return false;
};

export default evaluateWhitePawn;
