import React from "react";
import Texture from "../../../../assets/pieces/white/white_knight.svg"

class Knight extends React.Component {
    render() {
        return (
            <div>
                <img src={Texture} alt="White_knight" class="piece" />
            </div>
        )
    }
}

export default Knight;
