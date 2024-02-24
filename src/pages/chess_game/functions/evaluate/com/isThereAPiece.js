const isThereAPiece = (
    pieces_table,
    square
) => {
    if (square[0] <= 7 && square[0] >= 0 && square[1] <= 7 && square[1] >= 0)
        if (pieces_table[square[0]][square[1]] !== "")
            return true;

    return false;
}

export default isThereAPiece;
