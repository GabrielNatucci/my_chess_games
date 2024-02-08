import "./styles.css";

const ChessTable = (props) => {

    return (
        <div
            className="chess-table"
            id="chess-table-id"
            onMouseDown={props.grabPiece}
            onMouseMove={props.movePiece}
        >
            {props.table}
        </div>
    )

}

export default ChessTable
