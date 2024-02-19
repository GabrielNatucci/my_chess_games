import evaluateBishop from "./evaluateBishop";
import evaluateRook from "./evaluateRook";

// Essa função simplismente empresta as lógicas vinda das torres e bispos
// já que a dama é basicamente a junção dessas duas peças.
//
// Fiz isso porque economiza muitas linhas de código
const evaluateQueen = (
    pieces_table,
    start_square,
    end_square,
) => {
    if (start_square[0] === end_square[0] || start_square[1] === end_square[1]) {
        return evaluateRook(pieces_table, start_square, end_square);
    } else {
        return evaluateBishop(pieces_table, start_square, end_square);
    }
};

export default evaluateQueen;
