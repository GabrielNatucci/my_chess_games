import "./ChessGame.css";
import React, {  useRef, useState } from "react";
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
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import areArraysEqual from "../../core_scripts/areArraysEqual";
let pieces_table = definePieces();
let horizontal = defineHorizonal();
let vertical = defineVertical();

const contextMenu = (e) => { // impede o botão direito de abrir qualquer coisa no tabuleiro
    e.preventDefault();
};

const ChessGameWainting = ({
    debug_mode
}) => {
    const ip = "localhost:8080"
    // escrever código para ivnerter o tabuleiro
    // fazer um parser para enviar o último movimento
    // fazer algo para fazer o jogador só jogar os lances que são dele
    const [piecesArray, setPiecesArray] = useState([...pieces_table]);

    // table definition
    let active_piece = useRef(); // pega a peça sem renderizar de novo tudo

    let end_square = useRef([]);
    let ma_move = useRef(false);

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

    let socket = useRef(new SockJS('http://' + ip + '/chess'));
    console.log(socket.current.url);
    let client = useRef(Stomp.over(socket.current));

    if (!client.current.connected) {
        client.current.connect({}, () => {
            client.current.subscribe("/move_resp", (message) => {
                let move = JSON.parse(message.body);

                console.log(areArraysEqual(move.player.name, user.name) === false)
                if (areArraysEqual(move.end_square, end_square.current) && ma_move.current === true && areArraysEqual(move.player.name, user.name) === true) {
                    console.log("MA MOVE")
                } else {
                    console.log("MA OPPONENTS MOVE")

                    if (validadeMoves(
                        pieces_table,
                        move.start_square,
                        move.end_square,
                        active_piece,
                        isBlackToMove,
                        w_pawns_moved,
                        b_pawns_moved,
                        movs_str,
                        horizontal,
                        vertical
                    )) {
                        if (isBlackToMove.current === true) {
                            isBlackToMove.current = false;
                        } else {
                            isBlackToMove.current = true;
                        }

                        pieces_table[move.end_square[0]][move.end_square[1]] = pieces_table[move.start_square[0]][move.start_square[1]];
                        pieces_table[move.start_square[0]][move.start_square[1]] = "";
                        defineAttacked(pieces_table, isBlackToMove.current, w_pieces_attack.current, b_pieces_attack.current);
                        makeKingsCheck(pieces_table, isBlackToMove.current, b_pieces_attack.current, w_pieces_attack.current);

                        setPiecesArray([...pieces_table]);
                        ma_move.current = false;
                    }
                }

            })
        })
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

                <section className="d-flex justify-content-center" >
                    <div className="d-flex justify-content-center">
                        <div className="players_name_table d-flex flex-column justify-content-center">
                            <Player player_name={"Random Noob"} color="black" />
                            <ChessTable
                                onContextMenu={contextMenu}
                                horizontal={horizontal}
                                vertical={vertical}
                                table={table}
                                invertTable={true}
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

export default ChessGameWainting;
