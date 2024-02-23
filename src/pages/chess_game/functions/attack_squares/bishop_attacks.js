import isThereAPiece from "../evaluate/com/isThereAPiece";

const condition = (tmp_square) => {
    return tmp_square[0] <= 7 && tmp_square[0] >= 0 && tmp_square[1] <= 7 && tmp_square[1] >= 0;
}

const forDiagonal = (
    pieces_table,
    square,
    w_pieces_attack,
    vari_x,
    vari_y,
) =>  {
    let tmp_square = [...square];
    tmp_square[0] += vari_x;
    tmp_square[1] += vari_y;

    for (; isThereAPiece(pieces_table, tmp_square) === false && condition(tmp_square) === true;) {
        w_pieces_attack.current[tmp_square[0]][tmp_square[1]] = 1;

        tmp_square[0] += vari_x;
        tmp_square[1] += vari_y;
    }
}

const wBishopAttacks = ( // função que atualiza as casa de ataque do bispo
    pieces_table,
    square,
    w_pieces_attack, 
) => {
    forDiagonal(pieces_table, square, w_pieces_attack, 1, 1);
    forDiagonal(pieces_table, square, w_pieces_attack, 1, -1);
    forDiagonal(pieces_table, square, w_pieces_attack, -1, 1);
    forDiagonal(pieces_table, square, w_pieces_attack, -1, -1);
}

export default wBishopAttacks;