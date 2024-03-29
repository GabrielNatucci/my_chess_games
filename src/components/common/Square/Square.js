import "./styles.css"

const Square = ({ Row, Column, Text, children, attacked}) => {
    let cord = Row + " " + Column;

    let dark = '#7a5330'
    let light = '#c3a46e'

    let className;
    let bg_color;
    if ((Row + Column) % 2 === 1) {
        className = "square ";
        bg_color = dark;
    } else {
        className = "square";
        bg_color = light;
    }

    if (attacked === 1) {
        return (
            <div className={className} key={cord} style={{ backgroundColor: bg_color }}>
                <p className="text-black" >{Text}</p>
                {children}
            </div>
        )
    } else {
        return (
            <div className={className} key={cord} style={{ backgroundColor: bg_color }}>
                {/* <p>{Text}</p> */}
                {children}
            </div>
        )
    }
}

export default Square;
