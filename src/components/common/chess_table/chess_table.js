import React from "react";
import "./styles.css";

const ChessTable = (props) => {
    if (props.grabPiece && props.movePiece && props.onContextMenu) {
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
    } else {
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
