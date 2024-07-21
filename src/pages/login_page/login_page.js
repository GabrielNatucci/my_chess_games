import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChessTable from "../../components/common/chess_table/chess_table";
import defineHorizonal from "../chess_game/functions/define_horizontal";
import definePieces from "../chess_game/functions/define_pieces";
import defineTable from "../chess_game/functions/define_table";
import defineVertical from "../chess_game/functions/define_vertical";
import "./login_page.css";
import validateEmail from "../emailValidation/validateEmail";

const LoginPage = () => {
    const horizontal = defineHorizonal();
    const vertical = defineVertical();
    const pieces_table = definePieces();
    const table = defineTable(vertical, horizontal, pieces_table);
    const navigate = useNavigate();

    useEffect(() => {
        const erro = document.getElementById("login-error");
        erro.classList.add("sumir");

        const user = localStorage.getItem("user");

        if (user) {
            const player = {
                name: user.name,
                authtoken: user.authtoken
            }

            fetch("http://localhost:8080/player/loginbyauthtoken", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(player)
            }).then(response => {
                if (response.status === 200) {
                    navigate("/game");
                }
            })
        }
    }, [navigate])

    const sendLoginInfo = (e) => {
        e.preventDefault();
        const emailOrName = document.getElementById("form-email").value;
        const password = document.getElementById("form-password").value;

        let player = {}
        if (validateEmail(emailOrName) === false) {
            player = { name: emailOrName, password }
        } else {
            player = { email: emailOrName, password }
        }

        fetch("http://localhost:8080/player/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(player)
        }).then(response => {
            if (response.status === 200)
                return response.json();
            else
                return null;
        })
            .then(data => {
                if (data !== null) {
                    localStorage.setItem("user", JSON.stringify(data));
                    navigate("/game_waiting");
                } else {
                    const erro = document.getElementById("login-error");
                    erro.classList.remove("sumir");
                }
            })
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
                <h1 className="text-center mb-3">Login</h1>

                <p id="login-error" className="sumir">Email ou senha invalidos</p>
                <form className="d-flex flex-column">
                    <input placeholder="Email or username" type="text" className="mb-3 p-2 rounded text-white login_page_border" id="form-email" />
                    <input placeholder="Password" type="password" className="mb-3 p-2 rounded text-white login_page_border" id="form-password" />

                    <div>
                        <input type="checkbox" id="remember-me" name="remember-me" />
                        <label className="remember-me m-1" htmlFor="remember-me">Remember-me</label>
                    </div>

                    <button type="button" className="btn btn-primary mt-2 mb-3" onClick={sendLoginInfo}>Login</button>

                    <p className="text-center">Don't have an account? <Link to={`register`}>Register</Link></p>
                </form>
            </section>
        </div >
    )
}

export default LoginPage;
