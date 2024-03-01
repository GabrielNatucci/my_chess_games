import findKingSquare from "../findKingSquare";

const isKingInCheck = (
    pieces_table,
    attacked_squares,
    king_color,
) => {
    let color;
    if (king_color === "white") {
        color = "wking";
    } else {
        color = "bking";
    }

    let king_square = [];
    king_square = findKingSquare(pieces_table, color);

    if (attacked_squares[king_square[0]][king_square[1]] === 1) { // ve se o rei nao está numa casa dominada pelo oponente
        return true;
    }

    return false;
}

export default isKingInCheck;