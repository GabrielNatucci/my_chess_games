import areArraysEqual from "../../../../core_scripts/areArraysEqual";
import defineAttacked from "../define_attacked";
import makeKingsCheck from "../makeKingsCheck";
import validadeMoves from "../validade_moves";

const figureMoveOut = (
    pieces_table,
    isBlackToMove,
    w_pawns_moved,
    b_pawns_moved,
    movs_str,
    horizontal,
    vertical,
    setPiecesArray,
    move,
) => {
    // acha o end_square
    let column = horizontal.indexOf(move.move_str[move.move_str.length - 2]);
    let row = move.move_str[move.move_str.length - 1] - 1;
    let end_square = [column, row];

    console.log(end_square);

    // validadeMoves(
    //     pieces_table,
    //     start_square,
    //     end_square,
    //     active_piece,
    //     isBlackToMove,
    //     w_pawns_moved,
    //     b_pawns_moved,
    //     movs_str,
    //     horizontal,
    //     vertical,
    // )

    // pieces_table[end_square[0]][end_square[1]] = pieces_table[start_square[0]][start_square[1]];
    // pieces_table[start_square[0]][start_square[1]] = "";

    setPiecesArray([...pieces_table]);
}

export default figureMoveOut;