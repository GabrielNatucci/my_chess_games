import isThereAPiece from "./com/isThereAPiece";

const verifyMoves = (i, pieces_table, start_square, is_horizontal) => { // verficar limites do movimento
    let current_square = [];

    if (is_horizontal) {
        current_square[0] = i;
        current_square[1] = start_square[1];

        if (isThereAPiece(pieces_table, current_square) === true) {
            console.log(pieces_table[current_square[0]][current_square[1]][0]);
            if (pieces_table[current_square[0]][current_square[1]][0] ===
                pieces_table[start_square[0]][start_square[1]][0]) {
                return false;
            } else {
                return true;
            }
        }
    } else {
        current_square[1] = i;
        current_square[0] = start_square[0];

        if (isThereAPiece(pieces_table, current_square) === true) {
            if (pieces_table[current_square[0]][current_square[1]][0] ===
                pieces_table[start_square[0]][start_square[1]][0]) {
                return false;
            } else {
                return true;
            }
        }
    }

    return true;
}

const evaluateRook = (
    pieces_table,
    start_square,
    end_square,
) => {
    // para ver se a casa de desnito não é uma peça do prórpio "time"
    // if (pieces_table[end_square[0]][end_square[1]] !== "") {
    //     if (pieces_table[end_square[0]][end_square[1]][0] ===
    //         pieces_table[start_square[0]][start_square[1]][0])
    //         return false
    // } else { // aqui é pra ver se o movimento é possível, ou seja, se a torre consegue ver a casa que vai chegar, no eixo X

    let is_mov_possible;

    if (end_square[0] !== start_square[0]) { // caso a torre se movimente verticalmente
        if (end_square[0] > start_square[0]) { // caso a torre vá para direita
            for (let i = start_square[0]; i < end_square[0]; i++) {
                console.log(i);
                console.log(start_square[0]);
                console.log(end_square[0]);
                console.log(verifyMoves(i, pieces_table, start_square, true));
                is_mov_possible = verifyMoves(i, pieces_table, start_square, true);
            }
        } else { // caso a torre vá para esquerda
            for (let i = start_square[0]; i > end_square[0]; i--) {
                is_mov_possible = verifyMoves(i, pieces_table, start_square, true);
            }
        }
    } else { // mesma coisa da função de cima, para para o eixo Y
        if (end_square[1] !== start_square[1]) { // caso a torre va para cima
            if (end_square[1] > start_square[1]) {
                for (let i = start_square[1]; i < end_square[1]; i++) {
                    is_mov_possible = verifyMoves(i, pieces_table, start_square, false);
                }
            } else { // caso a torre va para baixo
                for (let i = start_square[1]; i > end_square[1]; i--) {
                    is_mov_possible = verifyMoves(i, pieces_table, start_square, false);
                }
            }
        }
    }

    if (is_mov_possible === true) {
        return true;
    } else {
        return false;
    }
};

export default evaluateRook;
