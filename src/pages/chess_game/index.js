import React from "react"
import ChessTable from "../../components/common/chess_table/chess_table";
import "./styles.css"

class ChessGame extends React.Component {
    constructor(props) {
        super(props);
        this.RefForPiece = React.createRef();
    }

    render() {
        let TableItSelf = null
        let active_piece = this.RefForPiece;
        var r = document.querySelector(':root');
        var rs = getComputedStyle(r);

        function grabPiece(e) {
            if (e.target.classList.contains("piece")) { // verifica se eh uma peça
                active_piece.current = e.target;
                console.log(active_piece.current.style.position)
            }
        }

        function movePiece(e) {
            if (active_piece.current) {
                TableItSelf = document.getElementById('chess-table-id');

                let offsetTop = TableItSelf.offsetTop;
                let offsetRight = parseInt(TableItSelf.getBoundingClientRect().right);
                let offsetLeft = TableItSelf.offsetLeft;
                let offsetBottom = parseInt(TableItSelf.getBoundingClientRect().bottom);

                let piece_half = rs.getPropertyValue('--piece-half');
                let cordX = `calc(${e.clientX}px - ${piece_half})`;
                let cordY = `calc(${e.clientY}px - ${piece_half})`;

                if (e.clientY < offsetTop) {
                    cordY = `calc(${offsetTop}px - ${piece_half})`;
                }

                if (e.clientX < offsetLeft) {
                    cordX = `calc(${offsetLeft}px - ${piece_half})`;
                }

                if (e.clientX > offsetRight) {
                    cordX = `calc(${offsetRight}px - ${piece_half})`;
                }

                if (e.clientY > offsetBottom) {
                    cordY = `calc(${offsetBottom}px - ${piece_half})`;
                }

                active_piece.current.style.position = "absolute";
                active_piece.current.style.left = cordX;
                active_piece.current.style.top = cordY;
            }
        }

        function letOffPiece() {
            if (active_piece.current) {
                active_piece.current.style.position = "";
                active_piece.current = null;
            }
        }

        return (
            <main className="d-flex justify-content-center" onMouseUp={letOffPiece}>
                <ChessTable
                    grabPiece={grabPiece}
                    movePiece={movePiece}
                />
            </ main>
        )
    }
}

export default ChessGame;
