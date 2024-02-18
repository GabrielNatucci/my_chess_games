import areSameColor from "./com/areSameColors";

const evaluateKing = (
    pieces_table,
    start_square,
    end_square,
) => {
    let y_cond = (end_square[0] <= start_square[0] + 1 && end_square[0] >= start_square[0] - 1);
    let x_cond = (end_square[1] <= start_square[1] + 1 && end_square[1] >= start_square[1] - 1);

    if (y_cond === true && x_cond === true)
        if (areSameColor(pieces_table, start_square, end_square) === false)
            return true;

    return false;
}

export default evaluateKing;
