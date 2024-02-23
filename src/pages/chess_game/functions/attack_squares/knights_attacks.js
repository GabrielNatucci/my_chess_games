const knightAttacks = (
    square,
    w_pieces_attack, 
) => {

    const possible_moves = [[2, 1], [2, -1], [-2, 1], [-2, -1]];
    let temp = [];

    for (let i = 0; i < 8; i++) {
        // esse if else é para não precisar criar um array de 8 fileras para mapear os movimentos do cavalo
        if (i < 4) {
            temp[0] = square[0] + possible_moves[i][0];
            temp[1] = square[1] + possible_moves[i][1];
        } else {
            temp[0] = square[0] + possible_moves[i - 4][1];
            temp[1] = square[1] + possible_moves[i - 4][0];
        }

        if ((temp[0] < 8 && temp[0] >= 0) &&
            (temp[1] < 8 && temp[1] >= 0)) { // filtra movimentos que são dentro do tabuleiro
            w_pieces_attack.current[temp[0]][temp[1]] = 1;
        }
    }
}

export default knightAttacks;