import "./ChessGame.css";
import React, { useEffect, useRef, useState } from "react";
import Stomp from "stompjs"
import SockJS from "sockjs-client"
import ChessTable from "../../components/common/chess_table/chess_table";
import definePieces from "./functions/define_pieces";
import defineHorizonal from "./functions/define_horizontal";
import defineVertical from "./functions/define_vertical";
import validadeMoves from "./functions/validade_moves";
import Player from "../../components/common/player/player";
import TrackMovements from "../../components/track_movements/TrackMovements";
import defineTable from "./functions/define_table";
import defineAttacked from "./functions/define_attacked";
import defineEmptyTable from "./functions/define_empty_table";
import makeKingsCheck from "./functions/makeKingsCheck";
import isKingInCheck from "./functions/evaluate/isWhiteKingInCheck";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import parseToLastMove from "./functions/parserToSendLastMove";
import areArraysEqual from "../../core_scripts/areArraysEqual";
import figureMoveOut from "./functions/serverRelated/figureMoveOut";
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

const ChessGame = ({
    debug_mode
}) => {
    // escrever código para ivnerter o tabuleiro
    // fazer um parser para enviar o último movimento
    // fazer algo para fazer o jogador só jogar os lances que são dele
    const [piecesArray, setPiecesArray] = useState([...pieces_table]);

    // table definition
    let active_piece = useRef(); // pega a peça sem renderizar de novo tudo

    var r = document.querySelector(":root");
    var rs = getComputedStyle(r); // para pegar o tamanho do tabuleiro

    let start_square = [];
    let TableItSelf = null;

    let isBlackToMove = useRef(false);

    let w_pawns_moved = useRef([0, 0, 0, 0, 0, 0, 0, 0]);
    let b_pawns_moved = useRef([0, 0, 0, 0, 0, 0, 0, 0]);

    // matriz que manterá quais casas são atacadas pelas brancas
    let w_pieces_attack = useRef(defineEmptyTable());
    let b_pieces_attack = useRef(defineEmptyTable());
    let table = defineTable(vertical, horizontal, piecesArray, b_pieces_attack, debug_mode);
    let movs_str = useRef("");

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    let socket = useRef(new SockJS('http://172.24.48.250:8080/chess'));
    let client = useRef(Stomp.over(socket.current));
    let mov = useRef("");

    useEffect(() => {
        // verifica se algum movimento foi jogado
        if (movs_str.current !== "") {
            // pacote separa o último lance para enviar ao servidor
            mov.current = parseToLastMove(movs_str.current).trim();

            let color = isBlackToMove.current ? "white" : "black";

            let pkg = {
                player: {
                    name: user.name,
                    authtoken: user.authtoken
                },
                move_str: mov.current,
                color: color,
            }

            // pra verificar se o websocket está conectado
            if (client.current.connected) {
                // função para enviar documento
                client.current.send(
                    "/app/move",
                    {},
                    JSON.stringify(pkg)
                );
            } else {
                console.log("conexão não estabelecida")
            }
        } else {
            client.current.connect({}, () => {
                client.current.subscribe("/move_resp", (message) => {
                    let move = JSON.parse(message.body);
                    console.log(move);

                    if (areArraysEqual(move.move_str, mov.current)) {
                        console.log("MA MOVE")
                    } else {
                        console.log("FALSE")
                        figureMoveOut(pieces_table, setPiecesArray, move, horizontal);
                    }
                })
            })
        }
    }, [client, piecesArray, user])

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

                    let movs_str_tmp = movs_str.current;
                    // ve se o movimento é jogável
                    if (validadeMoves(
                        pieces_table,
                        start_square,
                        end_square,
                        active_piece,
                        isBlackToMove,
                        w_pawns_moved,
                        b_pawns_moved,
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
                        defineAttacked(pieces_table, isBlackToMove.current, w_pieces_attack.current, b_pieces_attack.current);
                        makeKingsCheck(pieces_table, isBlackToMove.current, b_pieces_attack.current, w_pieces_attack.current);

                        setPiecesArray([...pieces_table]);
                    } else { // se o movimento for inválido
                        // se é a vez das pretas
                        let index = 1;
                        let king;

                        if (isBlackToMove.current === true && active_piece.current.className[0] === "b") {
                            king = document.getElementsByClassName("bking");
                        } else if (isBlackToMove.current === false && active_piece.current.className[0] === "w") {
                            king = document.getElementsByClassName("wking");
                        }

                        if (king) {
                            if ((isBlackToMove.current === true && isKingInCheck(pieces_table, w_pieces_attack.current, "black")) // se o rei das pretas está em cheque
                                ||                                                                                        // ou 
                                (isBlackToMove.current === false && isKingInCheck(pieces_table, b_pieces_attack.current, "white") // se o rei das brancas está em cheque
                                )) {

                                // faz o rei piscar, indicando que o movimento é ilegal
                                const makeKingBlink = setInterval(() => {
                                    if (index === 6) {
                                        clearInterval(makeKingBlink);
                                    }

                                    if (index % 2 !== 0) {
                                        king[0].classList.add("check");
                                    } else {
                                        king[0].classList.remove("check");
                                    }

                                    index++;
                                }, 200)
                            }
                        }

                        movs_str.current = movs_str_tmp;
                    }
                }
            }

            active_piece.current.style.zIndex = "";
            active_piece.current.style.position = "";
            active_piece.current = null;
        }
    }

    const logOut = (e) => {
        e.preventDefault();
        navigate("/");
        localStorage.removeItem("user");
    }

    try {
        return (
            <main >
                <Navbar className="bg-body-dark ">
                    <Container>
                        <Navbar.Brand href="#home" className="text-white">Natuccis Chessgame</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto" />

                            <NavDropdown title={`${user.name}`} id="nav-perfil" className="text-white" drop="start" data-bs-theme="dark">
                                <NavDropdown.Item href="#action/3.1"> Perfil </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2" onClick={logOut}>
                                    Sair
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>


                <section
                    className="d-flex justify-content-center"
                    onMouseUp={letOffPiece}
                >
                    <div className="d-flex justify-content-center">
                        <div className="players_name_table d-flex flex-column justify-content-center">
                            <Player player_name={"Random Noob"} color="black" />
                            <ChessTable
                                grabPiece={grabPiece}
                                onContextMenu={contextMenu}
                                movePiece={movePiece}
                                horizontal={horizontal}
                                vertical={vertical}
                                table={table}
                            />
                            <Player player_name={`${user.name}`} color="white" />
                        </div>

                        <div className="d-flex flex-column justify-content-center">
                            <TrackMovements text={movs_str.current}
                                horizontal={horizontal}
                                vertical={vertical}
                            />
                        </div>
                    </div>
                </section>
            </main >
        );
    } catch (error) {
        return (
            <div onLoad={navigate("/")}>aff</div>
        );
    }
};

export default ChessGame;
