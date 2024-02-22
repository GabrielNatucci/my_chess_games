import wpanAttacks from "./attack_squares/wpawn_attacks";

const defineAttacked = (
    pieces_table,
    isBlackToMove,
    w_pieces_attack, 
    b_pieces_attack
) => {
    let square = [];
    if (isBlackToMove === false) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                square = [i, j];

                if (pieces_table[square[0]][square[1]].search("wpawn") === 0) { 
                    wpanAttacks(pieces_table, square, w_pieces_attack.current);
                }
            }
            // console.log(w_pieces_attack.current[i]);
        }
    }
}

export default defineAttacked;