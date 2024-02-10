import isThereAPiece from "./com/isThereAPiece";

const evaluateRook = (
    pieces_table,
    start_square,
    end_square,
) => {
    let max_x;
    let min_x;

    // let max_y;
    // let max_my;

    // to check x axis
    for (let i = 0; i < 8; i++) {
        let current_square = [i, start_square[0]];

        if (isThereAPiece(pieces_table, current_square)) {
            if (i < start_square[0]) {
                min_x = i;
            } else {
                max_x = i;
            }
        }
    }

    console.log("minimum: " + min_x);
    console.log("maximum: " + max_x);

    return true;
};

export default evaluateRook;
