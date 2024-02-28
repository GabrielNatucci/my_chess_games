const findKingSquare = (
    pieces_table,
    king,
) => {
    let king_square = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (pieces_table[i][j].search(king) === 0) {
                king_square = [i,j];
            }
        }
    }

    return king_square;
}

export default findKingSquare;