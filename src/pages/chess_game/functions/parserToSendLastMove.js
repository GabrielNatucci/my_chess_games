const movesParser = (text) => {
    let moves = [];

    let count = 1;

    let index = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
            // moves.push(text.slice(index ,i));
            moves.push(
                text.slice(index, i)
            );

            index = i;
        }
    }

    return moves;
}

const parseToLastMove = (movs_str) => {
    let len = movs_str.length;
    let mov = movesParser(movs_str);

    return mov[mov.length - 1];
}

export default parseToLastMove;