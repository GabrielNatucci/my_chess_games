const getInvertedTable = (table) => {
    let invertedTable = [...table];

    for (let i = 0; i <= 64; i++) {
        invertedTable[i] =  table[64 - i];
    }

   return invertedTable;
}

export default getInvertedTable;
