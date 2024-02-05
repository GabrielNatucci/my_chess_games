import React from "react";
import Texture from "../../../../assets/pieces/white/white_knight.svg"
import Piece from "../piece";

class Knight extends Piece {
    constructor() {
        super();
    }

    render() {
        console.log(super.location);
        return (
            <div>
                <img src={Texture} alt="White_knight" class="piece" />
            </div>
        )
    }
}

export default Knight;
