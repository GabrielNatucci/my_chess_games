import './move.css'

const Move = ({move, count}) => {
    return (
            <div className="move_class d-flex">
                <div className="mov_count p-1 m-1 d-flex justify-content-center items-align-center">
                    {count}.
                </div>

                <div className="move_itself p-1 m-1 d-flex justify-content-center items-align-center">
                    {move}
                </div>
            </div>
    )
}

export default Move;