import Piece from "../../../components/common/pieces/Piece";
import Square from "../../../components/common/Square/Square";

const defineTable = (
    vertical, 
    horizontal,
    piecesArray,
    w_pieces_attack,
    debug_mode,
) => {
    let local_table = [];


    for (let j = vertical.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontal.length; i++) {

            if (debug_mode === true) {
                local_table.push(
                    <Square
                        key={`${i} + ${j}`}
                        Row={j}
                        Column={i}
                        Text={`${horizontal[i]}${vertical[j]}`}
                        attacked={w_pieces_attack.current[i][j]}
                    >
                        <Piece type={piecesArray[i][j]} file={i + 1} rank={j + 1} />
                    </Square>,
                );
            } else {
                local_table.push(
                    <Square
                        key={`${i} + ${j}`}
                        Row={j}
                        Column={i}
                        Text={`${horizontal[i]}${vertical[j]}`}
                        // attacked={w_pieces_attack.current[i][j]}
                    >
                        <Piece type={piecesArray[i][j]} file={i + 1} rank={j + 1} />
                    </Square>,
                );
            }
        }
    }

    return local_table;
}

export default defineTable;