import React from "react"
import ChessTable from "../../components/common/chess_table/chess_table";
import "./styles.css"
import Square from "../../components/common/Square/Square";
import Piece from "../../components/common/pieces/Piece"

let vertical = ["1", "2", "3", "4", "5", "6", "7", "8"];
let horizontal = ["a", "b", "c", "d", "e", "f", "g", "h"];
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

let table = [];
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

class ChessGame extends React.Component {
    constructor(props) {
        super(props);
        this.RefForPiece = React.createRef();
    }

    render() {
        let active_piece = this.RefForPiece;
        var r = document.querySelector(':root');
        var rs = getComputedStyle(r);

        let TableItSelf = null;

        function grabPiece(e) {
            TableItSelf = document.getElementById('chess-table-id');
            if (e.target.classList.contains("piece")) { // verifica se eh uma peça
                active_piece.current = e.target;
            }
        }

        function movePiece(e) {
            if (active_piece.current) {
                let offsetTop = TableItSelf.offsetTop;
                let offsetRight = parseInt(TableItSelf.getBoundingClientRect().right);
                let offsetLeft = TableItSelf.offsetLeft;
                let offsetBottom = parseInt(TableItSelf.getBoundingClientRect().bottom);

                let piece_half = rs.getPropertyValue('--piece-half');
                let cordX = `calc(${e.clientX}px - ${piece_half})`;
                let cordY = `calc(${e.clientY}px - ${piece_half})`;

                if (e.clientY < offsetTop) {
                    cordY = `calc(${offsetTop}px - ${piece_half})`;
                }

                if (e.clientX < offsetLeft) {
                    cordX = `calc(${offsetLeft}px - ${piece_half})`;
                }

                if (e.clientX > offsetRight) {
                    cordX = `calc(${offsetRight}px - ${piece_half})`;
                }

                if (e.clientY > offsetBottom) {
                    cordY = `calc(${offsetBottom}px - ${piece_half})`;
                }

                active_piece.current.style.position = "absolute";
                active_piece.current.style.left = cordX;
                active_piece.current.style.top = cordY;
            }
        }

        function letOffPiece(e) {
            if (active_piece.current) {
                let offsetRight = parseInt(TableItSelf.getBoundingClientRect().right);
                let offsetLeft = TableItSelf.offsetLeft;

                let offsetTop = TableItSelf.offsetTop;
                let offsetBottom = parseInt(TableItSelf.getBoundingClientRect().bottom);

                let EachRowSquare = ((offsetRight - offsetLeft) / 8);
                let EachFileSquare = ((offsetTop - offsetBottom) / 8);

                let end_square = [];

                for (let i = 0; i < 8; i++) { // sees with row the piece is being dropped on
                    if (e.clientX > (offsetLeft + (i * EachRowSquare)) && e.clientX < (offsetLeft + ((i + 1) * EachRowSquare))) {
                        end_square.push(i);
                        break;
                    }
                }

                for (let i = 0; i < 8; i++) { // sees with file the piece is being dropped on
                    if (e.clientY > (offsetBottom + ((i + 1) * EachFileSquare))
                        && e.clientY > (offsetBottom + ((i + 2) * EachFileSquare))) {
                        end_square.push(i);
                        break;
                    }
                }

                console.log(end_square);

                pieces_table[end_square[0]][end_square[1]] = "bqueen";

                active_piece.current.style.position = "";
                active_piece.current = null;
            }
        }

        return (
            <main
                className="d-flex justify-content-center"
                onMouseUp={letOffPiece}
            >
                <ChessTable
                    grabPiece={grabPiece}
                    movePiece={movePiece}
                    horizontal={horizontal}
                    vertical={vertical}
                    table={table}
                    pieces_table={pieces_table}
                />
            </ main>
        )
    }
}

export default ChessGame;
