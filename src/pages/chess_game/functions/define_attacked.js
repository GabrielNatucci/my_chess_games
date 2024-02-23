import wBishopAttacks from "./attack_squares/bishop_attacks";
import knightAttacks from "./attack_squares/knights_attacks";
import wpawnAttacks from "./attack_squares/wpawn_attacks";

const defineAttacked = ( // função que atualiza o mapa de peças attacadas
    pieces_table,
    isBlackToMove,
    w_pieces_attack, 
    b_pieces_attack
) => {
    let square = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            w_pieces_attack.current[i][j] = 0;
            b_pieces_attack.current[i][j] = 0;
        }
    }

    // wpieces_attacked
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            square = [i, j];
            if (pieces_table[square[0]][square[1]].search("wpawn") === 0)  // peão
                wpawnAttacks(pieces_table, square, w_pieces_attack);

            if (pieces_table[square[0]][square[1]].search("wknight") === 0) // cavalo
                knightAttacks(pieces_table, square, w_pieces_attack);
                
            if (pieces_table[square[0]][square[1]].search("wbishop") === 0) // bispo
                wBishopAttacks(pieces_table, square, w_pieces_attack);

            if (pieces_table[square[0]][square[1]].search("wking") === 0) // bispo
                wBishopAttacks(pieces_table, square, w_pieces_attack);
        }
    }
}

export default defineAttacked;