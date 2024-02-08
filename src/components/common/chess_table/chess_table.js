import Piece from "../pieces/Piece.js";
import React from "react";
import "./styles.css";
import Square from "../Square/Square";

class ChessTable extends React.Component {
    constructor(props) {
        super(props);
        this.RefForPiece = React.createRef();
    }

    render() {
        for (let j = this.props.vertical.length - 1; j >= 0; j--) {
            for (let i = 0; i < this.props.horizontal.length; i++) {
                this.props.table.push(<Square
                    key={`${i} + ${j}`}
                    Row={j}
                    Column={i}
                    Text={`${this.props.horizontal[i]}${this.props.vertical[j]}`}
                >
                    <Piece type={this.props.pieces_table[i][j]} file={i + 1} rank={j + 1} />
                </Square >);
            }
        }

        console.log(this.props.table);

        return (
            <div
                className="chess-table"
                id="chess-table-id"
                onMouseDown={this.props.grabPiece}
                onMouseMove={this.props.movePiece}
            >
                {this.props.table}
            </div>
        )

    }
}

export default ChessTable
