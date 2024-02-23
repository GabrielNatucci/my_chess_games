import areSameColor from "./com/areSameColors";
import isThereAPiece from "./com/isThereAPiece";

const forBody = (
    pieces_table,
    start_square,
    index,
    i,
    temp,
) => {
    let current_square = [];
    current_square[0] = i;
    current_square[1] = temp + index;

    if (isThereAPiece(pieces_table, current_square) === true)  // ve se tem alguma peça no meio do caminho
        return false;

    return true;
}

const evaluateBishop = (
    pieces_table,
    start_square,
    end_square,
    movs_str,
) => {
    let diff_x = (Math.abs(start_square[0] - end_square[0]));
    let diff_y = (Math.abs(start_square[1] - end_square[1]));
    let index = 0;
    let is_mov_posible = true;

    // calcula se o movimento é diagonal
    // usando o módulo da diferença entre as cordenadas
    if (diff_y === diff_x) {
        if (start_square[0] < end_square[0]) { // pra direita 
            if (start_square[1] < end_square[1]) { // pra cima
                let temp = start_square[1] + 1;

                for (let i = start_square[0] + 1; i < end_square[0]; i++) {
                    is_mov_posible = forBody(pieces_table, start_square, index, i, temp);
                    index++;
                    if (is_mov_posible === false) break; // se tem uma peça no meio
                }
            } else { // pra baixo
                let temp = start_square[1] - 1;

                for (let i = start_square[0] + 1; i < end_square[0]; i++) {
                    is_mov_posible = forBody(pieces_table, start_square, index, i, temp);
                    index--;
                    if (is_mov_posible === false) break; // se tem uma peça no meio
                }
            }
        } else {
            if (start_square[1] < end_square[1]) { // pra cima
                let temp = start_square[1] + 1;

                for (let i = start_square[0] - 1; i > end_square[0]; i--) {
                    is_mov_posible = forBody(pieces_table, start_square, index, i, temp);
                    index++;
                    if (is_mov_posible === false) break; // se tem uma peça no meio
                }
            } else { // pra baixo
                let temp = start_square[1] - 1;

                for (let i = start_square[0] - 1; i > end_square[0]; i--) {
                    is_mov_posible = forBody(pieces_table, start_square, index, i, temp);
                    index++;
                    if (is_mov_posible === false) break; // se tem uma peça no meio
                }
            }
        }
    } else {
        is_mov_posible = false;
    }

    if (is_mov_posible === true) {
        // se não tiver nenhuma peça no meio do caminho e se
        // a casa não tiver uma peça do mesmo time, o movimento é possível. Então retorna true;
        if (areSameColor(pieces_table, start_square, end_square) === false) {
            if (pieces_table[start_square[0]][start_square[1]].search("wbishop") === 0 || // bispos
                pieces_table[start_square[0]][start_square[1]].search("bbishop") === 0) { 
                movs_str.current += "B";
            }
            return true;
        }
    }

    return false;

}

export default evaluateBishop;
