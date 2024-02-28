import './move.css'

const Move = ({move, count}) => {
    return (
            <div className="move_class d-flex">
                <div className="move_count p-1">
                    {count}.
                </div>

                <div className="move_itself p-1  d-flex justify-content-center">
                    {move}
                </div>
            </div>
    )
}

export default Move;