const validadeMoves = (pieces_table, start_square, end_square) => {

    if (pieces_table[start_square[0]][start_square[1]] === "wpawn") {
        console.log(pieces_table[start_square[0]][start_square[1]]);

        if (start_square[1] === 1) {
            if (end_square[1] === 3) {
                return true;
            }
        }

        if (pieces_table[end_square[0]][end_square[1]] === "") {
            if (end_square[1] === (start_square[1] + 1) && end_square[0] === start_square[0]) {
                return true;
            }
        }

        if (end_square[1] === (start_square[1] + 1)) {
            if (end_square[1] === (start_square[1] + 1) || end_square[1] === (start_square[1] - 1)) {
                let endX = end_square[0] + 1;
                let endY = end_square[1];

                console.log(pieces_table[endX][endY]);

                if (pieces_table[endX][endY] === "" || pieces_table[endX - 2][endY] === "") {
                    return false;
                }
                return true;
            }
        }

        return false;
    }

    return true;
}

export default validadeMoves;
