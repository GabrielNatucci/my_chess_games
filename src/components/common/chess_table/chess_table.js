import React from "react";
import RowSquares from "./RowSquares";
import "./styles.css";

class ChessTable extends React.Component {
    render() {
        let table = Array(8)
            .fill([...Array(8)].map((_, i) => i + 1))

        return (
            <div className="container text-center" >
                <div className="row">
                    <RowSquares arrays={table} />
                </div>
            </div>

        )
    }
}

export default ChessTable
