import "./player.css";

const Player = ({ player_name, color }) => {
    return (
        <div className="player d-inline-flex justify-content-start fw-bold text-white">
            <div className={`player-image ${color}`} />
            {player_name}
        </div>
    )
}

export default Player;
