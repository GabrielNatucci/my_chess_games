import React from "react"
import ChessTable from "../../components/common/chess_table/chess_table";
import Knight from "../../components/common/pieces/knight/Knight";
import "./styles.css"

class ChessGame extends React.Component {
    render() {
        return (
            <main className="d-flex justify-content-center">
                <ChessTable />
                <Knight />
            </main>
        )
    }
}

export default ChessGame;
