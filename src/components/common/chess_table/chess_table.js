import Piece from "../pieces/Piece.js";
import React from "react";
import "./styles.css";
import Square from "../Square/Square";

let vertical = ["1", "2", "3", "4", "5", "6", "7", "8"];
let horizontal = ["a", "b", "c", "d", "e", "f", "g", "h"];
let table = [];
let pieces_table = [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""]
];

pieces_table[0][0] = "wrook";
pieces_table[1][0] = "wknight";
pieces_table[2][0] = "wbishop";
pieces_table[3][0] = "wqueen";
pieces_table[4][0] = "wking";
pieces_table[5][0] = "wbishop";
pieces_table[6][0] = "wknight";
pieces_table[7][0] = "wrook";

for (let i = 0; i < 8; i++) {
    pieces_table[i][1] = "wpawn";
}

pieces_table[0][7] = "brook";
pieces_table[1][7] = "bknight";
pieces_table[2][7] = "bbishop";
pieces_table[3][7] = "bqueen";
pieces_table[4][7] = "bking";
pieces_table[5][7] = "bbishop";
pieces_table[6][7] = "bknight";
pieces_table[7][7] = "brook";

for (let i = 0; i < 8; i++) {
    pieces_table[i][6] = "bpawn";
}

for (let j = vertical.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontal.length; i++) {
        table.push(<Square
            key={`${i} + ${j}`}
            Row={j}
            Column={i}
            Text={`${horizontal[i]}${vertical[j]}`}
        >
            <Piece type={pieces_table[i][j]} file={i + 1} rank={j + 1} />
        </Square >);
    }
}

class ChessTable extends React.Component {
    constructor(props) {
        super(props);
        this.RefForPiece = React.createRef();
    }

    render() {
        return (
            <div
                className="chess-table"
                id="chess-table-id"
                onMouseDown={this.props.grabPiece}
                onMouseMove={this.props.movePiece}
            >
                {table}
            </div>
        )

    }
}

export default ChessTable
