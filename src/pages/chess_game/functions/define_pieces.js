const definePieces = () => {
    let pieces_table = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""]
    ];

    pieces_table[0][0] = "wrook 0";
    pieces_table[1][0] = "wknight";
    pieces_table[2][0] = "wbishop";
    pieces_table[3][0] = "wqueen";
    pieces_table[4][0] = "wking 0";
    pieces_table[5][0] = "wbishop";
    pieces_table[6][0] = "wknight";
    pieces_table[7][0] = "wrook 0";

    for (let i = 0; i < 8; i++) {
        pieces_table[i][1] = "wpawn 0";
    }

    pieces_table[0][7] = "brook 0";
    pieces_table[1][7] = "bknight";
    pieces_table[2][7] = "bbishop";
    pieces_table[3][7] = "bqueen";
    pieces_table[4][7] = "bking 0";
    pieces_table[5][7] = "bbishop";
    pieces_table[6][7] = "bknight";
    pieces_table[7][7] = "brook 0";

    for (let i = 0; i < 8; i++) {
        pieces_table[i][6] = "bpawn 0";
    }
    return pieces_table;
}

export default definePieces;
