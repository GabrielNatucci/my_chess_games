const areSameColor = (
    pieces_table,
    first,
    second,
) => {
    console.log(pieces_table[first[0]][first[1]][0]);
    console.log(pieces_table[second[0]][second[1]][0]);

    if (pieces_table[first[0]][first[1]][0] === pieces_table[second[0]][second[1]][0])
        return true;

    return false;
}

export default areSameColor;
