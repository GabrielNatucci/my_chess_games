/**
 * copia os valores da tabela_2 na tabela_1
 */ 

const copyTable = (
    table_1,
    table_2, 
) => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            table_1[i][j] = table_2[i][j];
        }
    }
}

export default copyTable;
