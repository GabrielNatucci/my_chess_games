import areSameColor from "./com/areSameColors";
import isThereAPiece from "./com/isThereAPiece";

const getCurrentPawn = (
    pieces_table,
    start_square,
) => {
    return pieces_table[start_square[0]][start_square[1]];
}

const evaluateBlackPawn = (
    pieces_table,
    start_square,
    end_square,
) => {
    let current_p_id = [...(getCurrentPawn(pieces_table, start_square))];
    current_p_id[9] = "1";
    let temp = current_p_id.toString().replaceAll(',', '');

    if (end_square[1] - start_square[1] < 0) {
        if (start_square[0] === end_square[0]) { // caso o movimento seja andando pra frente
            // caso não tenha nenhuma peça casa que a peça vai ficar
            if (isThereAPiece(pieces_table, end_square) === false) {

                // caso a peça estega na casa de origem e
                // caso o movimento seja até dois pra frente
                if ((getCurrentPawn(pieces_table, start_square)[9] === "0") && // se o peão não se moveu ainda
                    (end_square[1] - start_square[1] === -2)) {
                    pieces_table[start_square[0]][start_square[1]] = temp;
                    return true;
                }

                // caso seja só um lance pra frente
                if (end_square[1] - start_square[1] >= -1) {
                    pieces_table[start_square[0]][start_square[1]] = temp;

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
                        pieces_table[start_square[0]][start_square[1]] = temp;

                        return true;
                    }
                }
            }
        }
    }

    return false;
};

export default evaluateBlackPawn;
