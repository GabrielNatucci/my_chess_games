import findKingSquare from "./findKingSquare";

const checkBody = (
    pieces_table,
    pieces_attack,
    color
) => {
    let king_square = [];
    king_square = findKingSquare(pieces_table, color);

    if (pieces_attack[king_square[0]][king_square[1]] === 1) {
        pieces_table[king_square[0]][king_square[1]] += " check";
    } else {
        if (pieces_table[king_square[0]][king_square[1]].search(" check") !== -1) {
            pieces_table[king_square[0]][king_square[1]] = pieces_table[king_square[0]][king_square[1]].replace(" check", "");
        }
    }
}

const makeKingsCheck = (
    pieces_table,
    isBlackToMove,
    b_pieces_attack,
    w_pieces_attack
) => {
    checkBody(pieces_table, b_pieces_attack, "wking");
    checkBody(pieces_table, w_pieces_attack, "bking");
}

export default makeKingsCheck;