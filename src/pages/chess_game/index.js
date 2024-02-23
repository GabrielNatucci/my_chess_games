import React, { useRef, useState } from "react";
import ChessTable from "../../components/common/chess_table/chess_table";
import definePieces from "./functions/define_pieces";
import defineHorizonal from "./functions/define_horizontal";
import defineVertical from "./functions/define_vertical";
import validadeMoves from "./functions/validade_moves";
import Player from "../../components/common/player/player";
import TrackMovements from "../../components/track_movements/TrackMovements";

import "./styles.css";
import defineTable from "./functions/define_table";
import defineAttacked from "./functions/define_attacked";
let pieces_table = definePieces();
let horizontal = defineHorizonal();
let vertical = defineVertical();

const contextMenu = (e) => { // impede o botão direito de abrir qualquer coisa no tabuleiro
    e.preventDefault();
};

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

    // table definition
    let active_piece = useRef(); // pega a peça sem renderizar de novo tudo

    var r = document.querySelector(":root");
    var rs = getComputedStyle(r); // para pegar o tamanho do tabuleiro

    let start_square = [];
    let TableItSelf = null;

    let isBlackToMove = useRef(false);

    let w_pawns_moved = useRef([0, 0, 0, 0, 0, 0, 0, 0]);
    let b_pawns_moved = useRef([0, 0, 0, 0, 0, 0, 0, 0]);

    let w_pieces_attack = useRef([ // matriz que manterá quais casas são atacadas pelas brancas
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ]);

    let b_pieces_attack = useRef([ // matriz que manterá quais casas são atacadas pelas pretas
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ]);

    let table = defineTable(vertical, horizontal, piecesArray, w_pieces_attack);

    let movs_str = useRef("");

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
        if (active_piece.current) {
            let end_square = findCurrentSquare(e, TableItSelf);

            if (end_square.indexOf(-1) === -1 && start_square.indexOf(-1) === -1) {
                if (areTheyEqual(end_square, start_square) === 0) {
                    pieces_table = [...piecesArray];

                    if (validadeMoves(
                            pieces_table,
                            start_square,
                            end_square,
                            active_piece,
                            isBlackToMove,
                            w_pawns_moved,
                            b_pawns_moved,
                            w_pieces_attack,
                            b_pieces_attack,
                            movs_str,
                            horizontal,
                            vertical,
                        )) {

                        if (isBlackToMove.current === true) {
                            isBlackToMove.current = false;
                        } else {
                            isBlackToMove.current = true;
                        }

                        pieces_table[end_square[0]][end_square[1]] = pieces_table[start_square[0]][start_square[1]];
                        pieces_table[start_square[0]][start_square[1]] = "";
                        defineAttacked(pieces_table, isBlackToMove.current, w_pieces_attack, b_pieces_attack);

                        setPiecesArray([...piecesArray]);
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
            <div className="d-flex justify-content-center">
                <div className="players_name_table d-flex flex-column justify-content-center">
                    <Player player_name={"Random Noob"} />
                    <ChessTable
                        grabPiece={grabPiece}
                        onContextMenu={contextMenu}
                        movePiece={movePiece}
                        horizontal={horizontal}
                        vertical={vertical}
                        table={table}
                    />
                    <Player player_name={"You"} />
                </div>

                <div className="d-flex flex-column justify-content-center">
                    <TrackMovements text={movs_str.current} 
                        horizontal={horizontal} 
                        vertical={vertical}
                    />
                </div>
            </div>

        </main>
    );
};

export default ChessGame;
