import bishopAttacks from "./attack_squares/bishop_attacks";
import bPawnAttacks from "./attack_squares/bpawn_attacks";
import kingAttacks from "./attack_squares/king_attacks";
import knightAttacks from "./attack_squares/knights_attacks";
import rookAttacks from "./attack_squares/rook_attacks";
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
            w_pieces_attack[i][j] = 0;
            b_pieces_attack[i][j] = 0;
        }
    }

    // wpieces_attacked
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            square = [i, j];
            if (pieces_table[square[0]][square[1]].search("wpawn") === 0)  // peão
                wpawnAttacks(square, w_pieces_attack);

            if (pieces_table[square[0]][square[1]].search("wknight") === 0) // cavalo
                knightAttacks(square, w_pieces_attack);

            if (pieces_table[square[0]][square[1]].search("wbishop") === 0) // bispo
                bishopAttacks(pieces_table, square, w_pieces_attack);

            if (pieces_table[square[0]][square[1]].search("wrook") === 0) // torre
                rookAttacks(pieces_table, square, w_pieces_attack);

            if (pieces_table[square[0]][square[1]].search("wking") === 0) // rei
                kingAttacks(square, w_pieces_attack);

            if (pieces_table[square[0]][square[1]].search("wqueen") === 0) { // rainha
                rookAttacks(pieces_table, square, w_pieces_attack);
                bishopAttacks(pieces_table, square, w_pieces_attack);
            }

            if (pieces_table[square[0]][square[1]].search("wrook") === 0) // rook
                rookAttacks(pieces_table, square, w_pieces_attack);
        }
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            square = [i, j];
            if (pieces_table[square[0]][square[1]].search("bpawn") === 0)  // peão
                bPawnAttacks(square, b_pieces_attack);

            if (pieces_table[square[0]][square[1]].search("bknight") === 0) // cavalo
                knightAttacks(square, b_pieces_attack);

            if (pieces_table[square[0]][square[1]].search("bbishop") === 0) // bispo
                bishopAttacks(pieces_table, square, b_pieces_attack);

            if (pieces_table[square[0]][square[1]].search("brook") === 0) // torre
                rookAttacks(pieces_table, square, b_pieces_attack);

            if (pieces_table[square[0]][square[1]].search("bking") === 0) // rei
                kingAttacks(square, b_pieces_attack);

            if (pieces_table[square[0]][square[1]].search("bqueen") === 0) { // rainha
                rookAttacks(pieces_table, square, b_pieces_attack);
                bishopAttacks(pieces_table, square, b_pieces_attack);
            }

            if (pieces_table[square[0]][square[1]].search("brook") === 0) // rook
                rookAttacks(pieces_table, square, b_pieces_attack);
        }
    }
}

export default defineAttacked;