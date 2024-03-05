import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChessTable from "../../components/common/chess_table/chess_table";
import areArraysEqual from "../../core_scripts/areArraysEqual";
import defineHorizonal from "../chess_game/functions/define_horizontal";
import definePieces from "../chess_game/functions/define_pieces";
import defineTable from "../chess_game/functions/define_table";
import defineVertical from "../chess_game/functions/define_vertical";
import "./register_page.css";

const RegisterPage = () => {
    let horizontal = defineHorizonal();
    let vertical = defineVertical();
    let pieces_table = definePieces();
    let table = defineTable(vertical, horizontal, pieces_table);
    const navegar = useNavigate();

    useEffect(() => {
        const erro = document.getElementById("form-error");
        const erro_senha = document.getElementById("form-error-senha");
        erro.classList.add("sumir");
        erro_senha.classList.add("sumir");
    }, [])

    const registerPlayer = (e) => {
        e.preventDefault();
        const email = document.getElementById("form-email").value;
        const passwords = document.getElementsByClassName("form-password");
        const password_1 = passwords[0].value;
        const password_2 = passwords[1].value;
        const password = password_1;

        const erro = document.getElementById("form-error");
        const erro_senha = document.getElementById("form-error-senha");

        if (areArraysEqual(password_1, password_2) === true) {
            const player = { email, password }

            fetch("http://localhost:8080/player/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(player)
            }).then((response) => {
                erro_senha.classList.add("sumir");

                if (response.status === 200) {
                    navegar("/");
                } else {
                    erro.classList.remove("sumir");
                }
            })
        } else {
            erro_senha.classList.remove("sumir");
        }
    }

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
                <h1 className="text-center mb-3">Register</h1>

                <form className="d-flex flex-column">
                    <input id="form-email" placeholder="Email" type="text" className="mb-3 p-2 rounded text-white login_page_border " />
                    <input placeholder="Password" type="password" className="form-password mb-3 p-2 rounded text-white login_page_border " />
                    <input placeholder="Repeat password" type="password" className="form-password mb-2 p-2 rounded text-white login_page_border " />

                    <p id="form-error">Tentativa de registro inválido, tente outro e-mail</p>
                    <p id="form-error-senha">Senhas não são iguais</p>

                    <button type="button" className="btn btn-primary mt-2" onClick={registerPlayer}>Login</button>
                </form>
            </section>
        </div >
    )
}

export default RegisterPage;
