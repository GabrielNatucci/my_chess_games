import areSameColor from "./com/areSameColors";
import isThereAPiece from "./com/isThereAPiece";

const evaluateKnight = (
    pieces_table,
    start_square,
    end_square,
    movs_str,
) => {
    let is_mov_pos = false;

    const possible_moves = [[2, 1], [2, -1], [-2, 1], [-2, -1]];
    let temp = [];

    for (let i = 0; i < 8; i++) {
        // esse if else é para não precisar criar um array de 8 fileras para mapear os movimentos do cavalo
        if (i < 4) {
            temp[0] = start_square[0] + possible_moves[i][0];
            temp[1] = start_square[1] + possible_moves[i][1];
        } else {
            temp[0] = start_square[0] + possible_moves[i - 4][1];
            temp[1] = start_square[1] + possible_moves[i - 4][0];
        }

        if ((temp[0] < 8 && temp[0] >= 0) &&
            (temp[1] < 8 && temp[1] >= 0)) { // filtra movimentos que são dentro do tabuleiro

            if (end_square[0] === temp[0] && end_square[1] === temp[1]) {
                if (areSameColor(pieces_table, start_square, temp) === false) { // se forem de cores diferentes
                    movs_str.current += "N";

                    if (isThereAPiece(pieces_table, end_square)) {
                        movs_str.current += "x";
                    }

                    is_mov_pos = true;
                    break;
                }
            }

        }
    }

    return is_mov_pos;
};
export default evaluateKnight;
