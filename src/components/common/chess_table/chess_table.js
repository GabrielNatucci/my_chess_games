import React from "react";
import "./styles.css";

const ChessTable = (props) => {
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

export default ChessTable
