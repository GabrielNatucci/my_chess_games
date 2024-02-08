import React from "react";
import "./styles.css";

class ChessTable extends React.Component {
    constructor(props) {
        super(props);
        this.RefForPiece = React.createRef();
    }

    render() {
        return (
            <div
                className="chess-table"
                id="chess-table-id"
                onMouseDown={this.props.grabPiece}
                onMouseMove={this.props.movePiece}
                onContextMenu={this.props.onContextMenu}
            >
                {this.props.table}
            </div>
        )

    }
}

export default ChessTable
