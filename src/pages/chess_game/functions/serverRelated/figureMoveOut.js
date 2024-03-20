import areArraysEqual from "../../../../core_scripts/areArraysEqual";

const figureMoveOut = (
    pieces_table,
    setPiecesArray,
    move,
    horizontal,
) => {
    let column = horizontal.indexOf(move.move_str[0]);
    let row = move.move_str[1] - 1;
    let square = [1, row];

    if (move.color.indexOf("white") !== -1) {
        for (let i = 0; i <= 7; i++) {
            if (pieces_table[column][i].indexOf("wpawn") !== -1) {
                pieces_table[column][row] = pieces_table[column][i];
                pieces_table[column][i] = "";
                break;
            }
        }

    } else {
        for (let i = 7; i >= 0; i--) {
            if (pieces_table[column][i].indexOf("bpawn") !== -1) {
                pieces_table[column][row] = pieces_table[column][i];
                pieces_table[column][i] = "";
                break;
            }
        }

    }

    setPiecesArray([...pieces_table]);
}

export default figureMoveOut;