import areSameColor from "./com/areSameColors";
import isThereAPiece from "./com/isThereAPiece";

const rightCastleConditions = (
    pieces_table,
    start,
    end,
) => {
    // condições para o roque do lado direito 

    let condition = (
        end[0] - start[0] === 2 && // se for dois movimentos pro lado
        isThereAPiece(pieces_table, [7, 0]) === true && // se tem uma peça no lugar da torre
        pieces_table[7][0][9] === '0' && // se a torre não se mexeu ainda
        pieces_table[start[0]][start[1]][6] === '0' && // se o rei não se mexeu ainda
        isThereAPiece(pieces_table, [5, 0]) === false && // se não tem nenhuma peça no caminho
        isThereAPiece(pieces_table, [6, 0]) === false
    )

    return condition;
}

const leftCastleConditions = (
    pieces_table,
    start,
    end,
) => {
    // condições para o roque do lado esquerdo 

    let condition = (
        end[0] - start[0] === -2 && // se for dois movimentos pro lado
        isThereAPiece(pieces_table, [0, 0]) === true && // se tem uma peça no lugar da torre
        pieces_table[0][0][9] === '0' && // se a torre não se mexeu ainda
        pieces_table[start[0]][start[1]][6] === '0' && // se o rei não se mexeu ainda
        isThereAPiece(pieces_table, [1, 0]) === false && // se não tem nenhuma peça no caminho
        isThereAPiece(pieces_table, [2, 0]) === false &&
        isThereAPiece(pieces_table, [3, 0]) === false
    )

    return condition;
}

const evaluateKing = (
    pieces_table,
    start,
    end,
) => {
    let is_move_possible = false;

    let y_cond = (end[0] <= start[0] + 1 && end[0] >= start[0] - 1);
    let x_cond = (end[1] <= start[1] + 1 && end[1] >= start[1] - 1);

    if ((y_cond === true && x_cond === true) && (areSameColor(pieces_table, start, end) === false)) {
        is_move_possible = true;
    } else {
        if (rightCastleConditions(pieces_table, start, end) === true) {
            let class_piece = [...pieces_table[7][0]]; // muda o id da peça para saber que já foi movida
            class_piece[9] = '1';

            pieces_table[7][0] = class_piece.toString().replaceAll(',', '');
            pieces_table[5][0] = pieces_table[7][0];
            pieces_table[7][0] = '';


            is_move_possible = true;
        }

        if (leftCastleConditions(pieces_table, start, end) === true) {
            let class_piece = [...pieces_table[0][0]]; // muda o id da peça para saber que já foi movida
            class_piece[9] = '1';

            pieces_table[0][0] = class_piece.toString().replaceAll(',', '');
            pieces_table[3][0] = pieces_table[0][0];
            pieces_table[0][0] = '';

            is_move_possible = true;
        }
    }

    if (is_move_possible === true) {
        let class_piece = [...pieces_table[start[0]][start[1]]]; // muda o id da peça para saber que já foi movida
        class_piece[6] = '1';
        pieces_table[start[0]][start[1]] = class_piece.toString().replaceAll(',', '');
    }

    return is_move_possible;

}

export default evaluateKing;
