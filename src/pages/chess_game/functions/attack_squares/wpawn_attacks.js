const wpanAttacks = (
    pieces_table,
    square,
    w_pieces_attack, 
) => {
    // console.log(square);

    // console.log(square);
    if (square[0] > 0) {
        w_pieces_attack[square[0]-1][square[1]+1] = true;
    }

    if (square[0] < 7) {
        w_pieces_attack[square[0]+1][square[1]+1] = true;
    }
}

export default wpanAttacks;