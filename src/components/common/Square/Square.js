import "./styles.css"

const Square = ({ Row, Column, Text, children }) => {
    let cord = Row + " " + Column;

    let className;
    if ((Row + Column) % 2 === 1) {
        className = "square bg-dark square";
    } else {
        className = "square bg-secondary square";
    }

    return (
        <div className={className} key={cord}>
            {/* <p>{Text}</p> */}
            {children}
        </div>
    )
}

export default Square;
