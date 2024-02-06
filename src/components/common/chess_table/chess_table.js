import Piece from "../pieces/Piece.js";
import React, { useRef } from "react";
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

const ChessTable = () => {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    let active_piece = useRef(0);
    active_piece.current = null;

    function grabPiece(e) {
        if (e.target.classList.contains("piece")) { // verifica se eh uma peça
            active_piece.current = e.target;
        }

    }

    function movePiece(e) {
        if (active_piece.current) {
            let piece_half = rs.getPropertyValue('--piece-half');
            let table_size = rs.getPropertyValue('--table-size:');
            console.log(table_size);

            let cordX = `calc(${e.clientX}px - ${piece_half})`;
            let cordY = `calc(${e.clientY}px - ${piece_half})`;

            active_piece.current.style.position = "absolute";
            active_piece.current.style.left = cordX;
            active_piece.current.style.top = cordY;
        }
    }

    function letOffPiece() {
        if (active_piece.current) {
            active_piece.current = null;

        }
    }

    return (
        <div className="chess-table"
            onMouseDown={grabPiece}
            onMouseMove={movePiece}
            onMouseUp={letOffPiece}
        >
            {table}
        </div>
    )
}

export default ChessTable
