import "./player.css";

const Player = ({ player_name }) => {
    return (
        <div className="player d-inline-flex justify-content-start ">
            <p className="fw-bold">{player_name}</p>
        </div>
    )
}

export default Player;
