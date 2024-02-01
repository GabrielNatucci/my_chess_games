import React from "react";
import Square from "../../square/square.js";

const ColumnSquares = ({ numbers }) => {
    const list = numbers.map((number) => {
        let id = parseInt(number) - 1;

        return (
            <Square id={id} />
        )
    });

    return list;
}

const RowSquares = ({ arrays }) => {
    let index = 0

    const list = arrays.map((numbers) => {
        return (
            <div className="row" id={index}>
                <ColumnSquares numbers={numbers} />
            </div>
        )
    });

    return list;
}

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
