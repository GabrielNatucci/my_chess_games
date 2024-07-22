import "./ChessGame.css";
import React, { useEffect, useRef, useState } from "react";
import Stomp from "stompjs"
import SockJS from "sockjs-client"
import ChessTable from "../../components/common/chess_table/chess_table";
import definePieces from "./functions/define_pieces";
import defineHorizonal from "./functions/define_horizontal";
import defineVertical from "./functions/define_vertical";
import Player from "../../components/common/player/player";
import TrackMovements from "../../components/track_movements/TrackMovements";
import defineTable from "./functions/define_table";
import defineEmptyTable from "./functions/define_empty_table";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
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
    const [piecesArray] = useState([...pieces_table]);

    // table definition

    // matriz que manterá quais casas são atacadas pelas brancas
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
            let pkg = {
                player: user
            }

            // pra verificar se o websocket está conectado
            if (client.current.connected) {
                client.current.send(
                    "/app/game_wait",
                    {},
                    JSON.stringify(pkg)
                );
            } else {
                console.log("conexão não estabelecida")
            }
            client.current.subscribe("/waiting_queue", (message) => {
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
