import React from "react";
import getInvertedTable from "./scripts/getInvertedTable";
import "./styles.css";

const ChessTable = (props) => {
    if (props.grabPiece && props.movePiece && props.onContextMenu) {
        if (props.invertTable === true) { // para o tabuleiro invertido, para quando o jogador for jogar com as pretas
            let invertTable = getInvertedTable(props.table);

            return (
                <div
                    className="chess-table"
                    id="chess-table-id"
                    onMouseDown={props.grabPiece}
                    onMouseMove={props.movePiece}
                    onContextMenu={props.onContextMenu}
                >
                    {invertTable}
                </div>
            )
        } else { // para o tabuleiro normal
            return (
                <div
                    className="chess-table"
                    id="chess-table-id"
                    onMouseDown={props.grabPiece}
                    onMouseMove={props.movePiece}
                    onContextMenu={props.onContextMenu}
                >
                    {props.table}
                </div>
            )
        }
    } else { // para ficar embaçado no fundo da tela de login
        return (
            <div
                className="chess-table"
                id="chess-table-id"
            >
                {props.table}
            </div>
        )
    }
}

export default ChessTable
