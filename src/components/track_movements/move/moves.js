import Move from '../../common/move/move';
import './move.css'

const movesParser = (text) => {
    let moves = [];

    let count = 1;

    let index = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
            // moves.push(text.slice(index ,i));
            moves.push(
                <Move count={count} key={count} move={text.slice(index ,i)} />
            );

            index = i;
            count++;
        }
    }
    return moves;

}

const Moves = (props) => {
    let moves = movesParser(props.text);

    return (
        <div className="moves">
            {moves}
        </div>
    )
}

export default Moves;