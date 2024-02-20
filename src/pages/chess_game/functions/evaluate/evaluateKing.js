import areSameColor from "./com/areSameColors";

const evaluateKing = (
    pieces_table,
    start,
    end,
) => {
    let y_cond = (end[0] <= start[0] + 1 && end[0] >= start[0] - 1);
    let x_cond = (end[1] <= start[1] + 1 && end[1] >= start[1] - 1);

    let class_piece = [...pieces_table[start[0]][start[1]]]; // muda o id da peça para saber que já foi movida
    class_piece[6] = '1';
    pieces_table[start[0]][start[1]] = class_piece.toString().replaceAll(',', '');

    if ((y_cond === true && x_cond === true) && (areSameColor(pieces_table, start, end) === false)) {
        return true;
    }

    return false;
}

export default evaluateKing;
