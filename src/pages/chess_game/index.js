import React from "react"
import ChessTable from "../../components/common/chess_table/chess_table";
import "./styles.css"

class ChessGame extends React.Component {
    render() {
        return (
            <main className="d-flex justify-content-center">
                <ChessTable />
            </main>
        )
    }
}

export default ChessGame;
