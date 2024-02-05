
import Square from "../Square/Square.js"

const ColumnSquares = ({ numbers, RowId }) => {
    const list = numbers.map((number) => {
        let id = parseInt(number) - 1;

        return (
            <Square id={id} RowId={RowId} />
        )
    });

    return list;
}

export default ColumnSquares;
