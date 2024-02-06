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
