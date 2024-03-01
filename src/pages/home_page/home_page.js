import ChessTable from "../../components/common/chess_table/chess_table";
import defineHorizonal from "../chess_game/functions/define_horizontal";
import definePieces from "../chess_game/functions/define_pieces";
import defineTable from "../chess_game/functions/define_table";
import defineVertical from "../chess_game/functions/define_vertical";
import "./home_page.css";

const HomePage = () => {
    let horizontal = defineHorizonal();
    let vertical = defineVertical();
    let pieces_table = definePieces();
    let table = defineTable(vertical, horizontal, pieces_table);

    return (
        <div className="main-login text-white flex-column d-flex justify-content-center align-items-center ">
            <div className="chess-table-parent-login d-flex justify-content-center align-items-center">
                <ChessTable
                    horizontal={horizontal}
                    vertical={vertical}
                    table={table}
                />
            </div>

            <section className="login-section p-5 rounded login_page_border ">
                <h1 className="text-center mb-3">Login</h1>

                <form className="d-flex flex-column">
                    <input placeholder="Name" type="text" className="mb-3 p-2 rounded text-white login_page_border " />
                    <input placeholder="Password" type="password" className="mb-3 p-2 rounded text-white login_page_border " />

                    <div>
                        <input type="checkbox" id="remember-me" name="remember-me" checked />
                        <label className="remember-me m-1" for="remember-me">Remember-me</label>
                    </div>

                    <button type="button" className="btn btn-primary mt-2">Login</button>
                </form>
            </section>
        </div >
    )
}

export default HomePage;