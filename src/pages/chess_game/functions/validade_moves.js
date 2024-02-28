import evaluateWhitePawn from "./evaluate/evaluateWhitePawn.js";
import evaluateRook from "./evaluate/evaluateRook.js";
import evaluateKnight from "./evaluate/evaluateKnight.js";
import evaluateKing from "./evaluate/evaluateKing.js";
import evaluateBishop from "./evaluate/evaluateBishop.js";
import evaluateBlackPawn from "./evaluate/evaluateBlackPawn.js";
import evaluateQueen from "./evaluate/evaluateQueen.js";
import areArraysEqual from "../../../core_scripts/areArraysEqual.js";
import defineAttacked from "./define_attacked.js";
import defineEmptyTable from "./define_empty_table.js";
import copyTable from "./copy_table.js";
import isKingInCheck from "./evaluate/isWhiteKingInCheck.js";
// import defineAttacked from "./define_attacked.js";

const validadeMoves = (
    pieces_table,
    start,
    end,
    active_piece,
    isBlackToMove,
    w_pawns_moved,
    b_pawns_moved,
    movs_str,
    horizontal,
    vertical,
) => {
    // feitos: 
    // peoes brancos
    // torres
    // cavalos
    // reis
    // bispos
    // movimentos alternados, cada um tem sua vez afinal de contas
    // peões pretos
    // an passant
    // dama
    // roque
    // not sudo legal moves

    // falta:
    // regras de empate, isso quero fazer no back
    // regras de chequemate, também quero no back

    let is_mov_possible = false;
    let is_a_castle = false;

    if ((active_piece.current.className.search("bpawn") === 0) || (active_piece.current.className.search("wpawn") === 0)) { // peões
        let origin_square;

        if (active_piece.current.className.search("wpawn") === 0) { // peões brancos
            origin_square = 1;

            let temp_map = [...b_pawns_moved.current]; // cria um mapa temporiario
            if (evaluateWhitePawn(pieces_table, start, end, b_pawns_moved, movs_str, horizontal) === true) {
                // caso tenha sido um movimento de dois passos, atualiza o mapa de an passant
                if (start[1] === origin_square && (end[1] - start[1] === 2)) {
                    w_pawns_moved.current[pieces_table[start[0]][start[1]][7]] = 1; // registra no mapa esse movimento de dois lances
                }

                // se uma caputa de passagem foi feita, 
                // ele compara o mapa temporário com o que foi enviado para função, para ver se tal captura foi feita
                if (areArraysEqual(b_pawns_moved.current, temp_map) === false) {
                    pieces_table[end[0]][4] = "";
                }

                is_mov_possible = true;
            }
        }

        if (active_piece.current.className.search("bpawn") === 0) { //peões pretos
            origin_square = 6;

            let temp_map = [...w_pawns_moved.current]; // cria um mapa temporiario
            if (evaluateBlackPawn(pieces_table, start, end, w_pawns_moved, movs_str, horizontal) === true) {
                // caso tenha sido um movimento de dois passos, atualiza o mapa de an passant
                if (start[1] === origin_square && (end[1] - start[1] === -2)) {
                    b_pawns_moved.current[pieces_table[start[0]][start[1]][7]] = 1;
                }

                // se uma caputa de passagem foi feita, 
                // ele compara o mapa temporário com o que foi enviado para função, para ver se tal captura foi feita
                if (areArraysEqual(w_pawns_moved.current, temp_map) === false) {
                    pieces_table[end[0]][3] = "";
                }

                is_mov_possible = true;
            }
        }
    }


    if (active_piece.current.className.search("wrook") === 0 || // torres
        active_piece.current.className.search("brook") === 0) {
        if (evaluateRook(pieces_table, start, end, movs_str) === true) {
            is_mov_possible = true;
        }
    }

    if (active_piece.current.className.search("wking") === 0 || // reis
        active_piece.current.className.search("bking") === 0) {

        if (evaluateKing(pieces_table, start, end,  movs_str)) {
            is_mov_possible = true;
        }

        if (is_mov_possible === true && (end[0] - start[0] === -2 || end[0] - start[0] === 2)) {
            is_a_castle = true;
        }
    }

    if (active_piece.current.className.search("wknight") === 0 || // cavalos
        active_piece.current.className.search("bknight") === 0) {
        if (evaluateKnight(pieces_table, start, end, movs_str) === true) {
            is_mov_possible = true;
        }
    }

    if (active_piece.current.className.search("wbishop") === 0 || // bispos
        active_piece.current.className.search("bbishop") === 0) {
        if (evaluateBishop(pieces_table, start, end, movs_str)) {
            is_mov_possible = true;
        }
    }

    if (active_piece.current.className.search("wqueen") === 0 || // bispos
        active_piece.current.className.search("bqueen") === 0) {
        if (evaluateQueen(pieces_table, start, end, movs_str)) {
            is_mov_possible = true;
        }
    }
    
    let king_square;
    let l_pieces_table = defineEmptyTable();
    let l_b_attacked = defineEmptyTable();
    let l_w_attacked = defineEmptyTable();

    copyTable(l_pieces_table, pieces_table)

    if (is_mov_possible === true) {
        // essa variáveis são pra avaliar se o movimento é legal
        // isso cria uma cópia local da tabela global para ver se o lance é jogável
        l_pieces_table[end[0]][end[1]] = l_pieces_table[start[0]][start[1]];
        l_pieces_table[start[0]][start[1]] = '';
        defineAttacked(l_pieces_table, isBlackToMove.current, l_w_attacked, l_b_attacked);

        // se o movimento for possível, 
        // essa parte verifica se eh a vez do cidadão
        if (isBlackToMove.current === true) {
            if (active_piece.current.className[0] === 'w' || isKingInCheck(l_pieces_table, l_w_attacked, "black") === true) { 
                is_mov_possible = false;
            } else {
                for (let i = 0; i < w_pawns_moved.current.length; i++) { // limpa o mapa de an passant, para evitar furo das regras
                    w_pawns_moved.current[i] = 0;
                }
            }
        } else {
            // se não for a vez da cor jogando ou se o rei está em cheque
            if (active_piece.current.className[0] === 'b' || isKingInCheck(l_pieces_table, l_b_attacked, "white") === true) { 
                is_mov_possible = false;
            } else {
                for (let i = 0; i < w_pawns_moved.current.length; i++) { // limpa o mapa de an passant, para evitar furo das regras
                    b_pawns_moved.current[i] = 0;
                }
            }
        }
    }

    if (is_mov_possible === true) {
        if (is_a_castle === false) {
            movs_str.current += `${horizontal[end[0]]}${vertical[end[1]]} `;
        }
    }

    return is_mov_possible;
};

export default validadeMoves;