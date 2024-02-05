import ColumnSquares from "./ColumnSquares";

const RowSquares = ({ arrays }) => {
    let index = -1

    const list = arrays.map((numbers) => {
        index++;
        return (
            <div className="row" id={index}>
                <ColumnSquares numbers={numbers} RowId={index} />
            </div>
        )
    });


    return list;
}

export default RowSquares;
