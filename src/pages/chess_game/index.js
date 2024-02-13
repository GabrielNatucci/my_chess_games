import React, { useRef, useState } from "react";
import ChessTable from "../../components/common/chess_table/chess_table";
import "./styles.css";
import Square from "../../components/common/Square/Square";
import Piece from "../../components/common/pieces/Piece";
import definePieces from "./functions/define_pieces";
import defineHorizonal from "./functions/define_horizontal";
import defineVertical from "./functions/define_vertical";
import validadeMoves from "./functions/validade_moves";

let pieces_table = definePieces();
let horizontal = defineHorizonal();
let vertical = defineVertical();

const findCurrentSquare = (e, TableItSelf) => {
    let offsetRight = parseInt(TableItSelf.getBoundingClientRect().right);
    let offsetLeft = TableItSelf.offsetLeft;

    let offsetTop = TableItSelf.offsetTop;
    let offsetBottom = parseInt(TableItSelf.getBoundingClientRect().bottom);

    let EachRowSquare = (offsetRight - offsetLeft) / 8;
    let EachFileSquare = (offsetTop - offsetBottom) / 8;

    let end_square = [];

    for (let i = 0; i < 8; i++) { // sees with row the piece is being dropped on
        if (e.clientX > offsetRight) {
            end_square.push(-1);
            break;
        }
        if (e.clientX < offsetLeft) {
            end_square.push(-1);
            break;
        } else if (
            e.clientX > (offsetLeft + (i * EachRowSquare)) &&
            e.clientX < (offsetLeft + ((i + 1) * EachRowSquare))
        ) {
            end_square.push(i);
            break;
        }
    }

    for (let i = 0; i < 8; i++) { // sees with file the piece is being dropped on
        if (e.clientY > offsetBottom) {
            end_square.push(-1);
            break;
        }
        if (e.clientY < offsetTop) {
            end_square.push(-1);
            break;
        } else if (
            e.clientY > (offsetBottom + ((i + 1) * EachFileSquare)) &&
            e.clientY > (offsetBottom + ((i + 2) * EachFileSquare))
        ) {
            end_square.push(i);
            break;
        }
    }

    return end_square;
};

const areTheyEqual = (firstArray, secondArray) => {
    if (firstArray.length === secondArray.length) {
        for (let i = 0; i < firstArray.length; i++) {
            if (firstArray[i] !== secondArray[i]) {
                return 0;
            }
        }
    } else {
        return 0;
    }

    return 1;
};

const ChessGame = () => {
    const [piecesArray, setPiecesArray] = useState(pieces_table);

    let table = [];
    for (let j = vertical.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontal.length; i++) {
            table.push(
                <Square
                    key={`${i} + ${j}`}
                    Row={j}
                    Column={i}
                    Text={`${horizontal[i]}${vertical[j]}`}
                >
                    <Piece type={piecesArray[i][j]} file={i + 1} rank={j + 1} />
                </Square>,
            );
        }
    }

    const RefForPiece = useRef();

    let active_piece = RefForPiece;
    var r = document.querySelector(":root");
    var rs = getComputedStyle(r);

    let start_square = [];

    let TableItSelf = null;

    function grabPiece(e) {
        if (e.button === 0) {
            TableItSelf = document.getElementById("chess-table-id");

            if (e.target.classList.contains("piece")) { // verifica se eh uma peça
                start_square = findCurrentSquare(e, TableItSelf);
                active_piece.current = e.target;
            }
        } else if (e.button === 2) {
            if (active_piece.current) {
                active_piece.current.style.position = "";
                active_piece.current = null;
            }
        }
    }

    const contextMenu = (e) => {
        e.preventDefault();
    };

    function movePiece(e) {
        if (active_piece.current) {
            let offsetTop = TableItSelf.offsetTop;
            let offsetRight = parseInt(TableItSelf.getBoundingClientRect().right);
            let offsetLeft = TableItSelf.offsetLeft;
            let offsetBottom = parseInt(TableItSelf.getBoundingClientRect().bottom);

            let piece_half = rs.getPropertyValue("--piece-half");
            let cordX = `calc(${e.clientX}px - ${piece_half})`;
            let cordY = `calc(${e.clientY}px - ${piece_half})`;

            if (e.clientX < offsetLeft) {
                cordX = `calc(${offsetLeft}px - ${piece_half})`;
            }

            if (e.clientX > offsetRight) {
                cordX = `calc(${offsetRight}px - ${piece_half})`;
            }

            if (e.clientY < offsetTop) {
                cordY = `calc(${offsetTop}px - ${piece_half})`;
            }

            if (e.clientY > offsetBottom) {
                cordY = `calc(${offsetBottom}px - ${piece_half})`;
            }

            active_piece.current.style.position = "absolute";
            active_piece.current.style.zIndex = "100";
            active_piece.current.style.left = cordX;
            active_piece.current.style.top = cordY;
        }
    }

    function letOffPiece(e) {
        // console.log(start_square[0]);
        // console.log(start_square[1]);

        if (active_piece.current) {
            let end_square = findCurrentSquare(e, TableItSelf);

            if (end_square.indexOf(-1) === -1 && start_square.indexOf(-1) === -1) {
                if (areTheyEqual(end_square, start_square) === 0) {
                    pieces_table = [...piecesArray];

                    if (validadeMoves(pieces_table, start_square, end_square, active_piece)) {
                        pieces_table[end_square[0]][end_square[1]] = pieces_table[start_square[0]][start_square[1]];
                        pieces_table[start_square[0]][start_square[1]] = "";
                        setPiecesArray([...piecesArray]);
                    } else {
                        console.log("invalid move");
                    }
                }
            }

            active_piece.current.style.zIndex = "";
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
                onContextMenu={contextMenu}
                movePiece={movePiece}
                horizontal={horizontal}
                vertical={vertical}
                table={table}
                pieces_table={piecesArray}
            />
        </main>
    );
};

export default ChessGame;
