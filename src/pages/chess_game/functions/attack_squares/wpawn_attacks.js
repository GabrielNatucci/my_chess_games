const wpawnAttacks = (
    square,
    w_pieces_attack, 
) => {
    if (square[0] > 0) {
        w_pieces_attack.current[square[0]-1][square[1]+1] = 1;
    }

    if (square[0] < 7) {
        w_pieces_attack.current[square[0]+1][square[1]+1] = 1;
    }
}

export default wpawnAttacks;