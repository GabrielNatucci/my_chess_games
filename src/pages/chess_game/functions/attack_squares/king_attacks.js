const kingAttacks = ( // função que atualiza as casa de ataque do bispo
    square,
    w_pieces_attack, 
) => {
    // passa pelas casas que o rei domina e vai marcando
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            try {
                w_pieces_attack.current[square[0] + i][square[1] + j] = 1;
            } catch (error) {
                // varios nada
            }
        }
    }
}

export default kingAttacks;