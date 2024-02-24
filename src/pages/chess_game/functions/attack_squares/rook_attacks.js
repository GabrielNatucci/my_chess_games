import isThereAPiece from "../evaluate/com/isThereAPiece";

const condition = (tmp_square) => {
    return tmp_square[0] <= 7 && tmp_square[0] >= 0 && tmp_square[1] <= 7 && tmp_square[1] >= 0;
}

const forBodys = (
    pieces_table,
    square,
    w_pieces_attack,
    vari_x,
    vari_y,
) =>  {
    let tmp_square = [...square];

    for (;condition(tmp_square) === true;) {
        tmp_square[0] += vari_x;
        tmp_square[1] += vari_y;

        try {
            w_pieces_attack.current[tmp_square[0]][tmp_square[1]] = 1;

            if(isThereAPiece(pieces_table, tmp_square) === true) {
                break
            }
        } catch {
        }
    }

}

const rookAttacks = ( // função que atualiza as casa de ataque do bispo
    pieces_table,
    square,
    w_pieces_attack, 
) => {
    forBodys(pieces_table, square, w_pieces_attack, 1, 0);
    forBodys(pieces_table, square, w_pieces_attack, -1, 0);
    forBodys(pieces_table, square, w_pieces_attack, 0, 1);
    forBodys(pieces_table, square, w_pieces_attack, 0, -1);
}

export default rookAttacks;