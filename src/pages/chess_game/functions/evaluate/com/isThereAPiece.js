const isThereAPiece = (pieces_table, square) => {
    if (pieces_table[square[0]][square[1]] !== "") {
        return true;
    }

    return false;
}

export default isThereAPiece;
