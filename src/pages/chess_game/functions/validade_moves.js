import evaluateWhitePawn from "./evaluate/evaluateWhitePawn.js";
import evaluateRook from "./evaluate/evaluateRook.js";
import evaluateKnight from "./evaluate/evaluateKnight.js";
import evaluateKing from "./evaluate/evaluateKing.js";
import evaluateBishop from "./evaluate/evaluateBishop.js";
import evaluateBlackPawn from "./evaluate/evaluateBlackPawn.js";
import evaluateQueen from "./evaluate/evaluateQueen.js";
import areArraysEqual from "../../../core_scripts/areArraysEqual.js";
import defineAttacked from "./define_attacked.js";

const validadeMoves = (
    pieces_table,
    start,
    end,
    active_piece,
    isBlackToMove,
    w_pawns_moved,
    b_pawns_moved,
    w_pieces_attack,
    b_pieces_attack,
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

    // falta:
    // !not sudo legal moves

    let is_mov_possible = false;

    if ((active_piece.current.className.search("bpawn") === 0) || (active_piece.current.className.search("wpawn") === 0)) { // peões
        let origin_square;

        if (active_piece.current.className.search("wpawn") === 0) { // peões brancos
            origin_square = 1;

            let temp_map = [...b_pawns_moved.current]; // cria um mapa temporiario
            if (evaluateWhitePawn(pieces_table, start, end, b_pawns_moved) === true) {
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
            if (evaluateBlackPawn(pieces_table, start, end, w_pawns_moved) === true) {
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
        if (evaluateRook(pieces_table, start, end, active_piece) === true)
            is_mov_possible = true;
    }

    if (active_piece.current.className.search("wking") === 0 || // reis
        active_piece.current.className.search("bking") === 0) {
        if (evaluateKing(pieces_table, start, end, active_piece))
            is_mov_possible = true;
    }

    if (active_piece.current.className.search("wknight") === 0 || // cavalos
        active_piece.current.className.search("bknight") === 0) {
        if (evaluateKnight(pieces_table, start, end) === true)
            is_mov_possible = true;
    }

    if (active_piece.current.className.search("wbishop") === 0 || // bispos
        active_piece.current.className.search("bbishop") === 0) {
        if (evaluateBishop(pieces_table, start, end))
            is_mov_possible = true;
    }

    if (active_piece.current.className.search("wqueen") === 0 || // bispos
        active_piece.current.className.search("bqueen") === 0) {
        if (evaluateQueen(pieces_table, start, end))
            is_mov_possible = true;
    }

    if (is_mov_possible === true) {
        // se o movimento for possível, 
        // essa parte verifica se eh a vez do cidadão
        if (isBlackToMove.current === true) {
            if (active_piece.current.className[0] === 'w') {
                is_mov_possible = false;
            } else {
                for (let i = 0; i < w_pawns_moved.current.length; i++) { // limpa o mapa de an passant, para evitar furo das regras
                    w_pawns_moved.current[i] = 0;
                }
            }
        } else {
            if (active_piece.current.className[0] === 'b') {
                is_mov_possible = false;
            } else {
                for (let i = 0; i < w_pawns_moved.current.length; i++) { // limpa o mapa de an passant, para evitar furo das regras
                    b_pawns_moved.current[i] = 0;
                }
            }
        }
    }

    if (is_mov_possible === true) {
        defineAttacked(pieces_table, isBlackToMove.current, w_pieces_attack, b_pieces_attack,);
    }

    return is_mov_possible;
};

export default validadeMoves;
