import "./styles.css"
// import Knight from "../pieces/knight/Knight"

const square = (props) => {
    if ((props.RowId + props.id) % 2 === 0) {
        return (
            <div className="col bg-dark square" id={props.id} >
                {/* <Knight /> */}
            </div>
        )
    } else {
        return (
            <div className="col bg-secondary square" id={props.id} >
            </div>
        )
    }
}

export default square;
