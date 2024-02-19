import areSameColor from "./com/areSameColors";
import isThereAPiece from "./com/isThereAPiece";

const evaluateWhitePawn = (
    pieces_table,
    start_square,
    end_square,
) => {
    const origin_square = 1;

    if (end_square[1] - start_square[1] > 0) {
        if (start_square[0] === end_square[0]) { // caso o movimento seja andando pra frente
            // caso não tenha nenhuma peça casa que a peça vai ficar
            if (isThereAPiece(pieces_table, end_square) === false) {

                // caso a peça estega na casa de origem e
                // caso o movimento seja até dois pra frente
                if (start_square[1] === origin_square &&
                    (end_square[1] - start_square[1] === 2)) {
                    return true;
                }

                // caso seja só um lance pra frente
                if (end_square[1] - start_square[1] <= 1) {

                    return true;
                }
            }
        } else {
            // verifica se é uma tentativa de movimento na diagonal
            if (
                start_square[0] === (end_square[0] + 1) ||
                start_square[0] === (end_square[0] - 1)
            ) {
                if (isThereAPiece(pieces_table, end_square) === true) {
                    if (areSameColor(pieces_table, start_square, end_square) === false) {

                        return true;
                    }
                }
            }
        }
    }

    return false;
};

export default evaluateWhitePawn;
