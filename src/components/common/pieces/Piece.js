import "./styles.css"
import "./pieces.css"

const Piece = ({
    rank,
    file,
    type,
}) => {
    if (type) {
        return (
            <div
                className={`${type} ${rank}${file} piece`}
                id={type}
                draggable={false}
            >
            </div >
        )
    } else {
        return (
            null
        )
    }

}

export default Piece;
