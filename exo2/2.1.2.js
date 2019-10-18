/*  Exercice 2.1.2 : Identifier le niveau de difficulté d'un bloc
    Écrire une fonction calculerDifficulte(bits) qui, étant donné le champ Bits d’un bloc en déduit la difficulté

    Pour mémoire, nous avons vu ce qu’était le champ Bits dans le cours sur le protocole et livre blanc.

    Sous cette forme hexadécimale, le premier octet représente le nombre d'octets, le reste représente un coefficient.
    0x1c0ae493 est donc composé de l'exposant 0x1c = 28 et du coefficient 0x0ae493. Le nombre se comprend 
    donc comme 0x0ae49300 00000000 00000000 00000000 00000000 00000000 00000000 en hexadécimal 
    (comptez le nombre de caractères par exemple, hors "0x", deux caractères par octets). */
    
    let log = console.log;
    
    const calculerDifficulte = (bits) => {
        
        // Enlève '0x' si présent au début de bits
        if (bits.startsWith('0x')) {
            bits = bits.substring(2);
        }

        // Longueur de la cible en nombre de caractères en enlevant les caractères du coefficient
        let exposant = parseInt(bits.substring(0, 2), 16)*2 - 6;
        let zeros = '';

        // Récupération du nombre de zéros après le coefficient
        while (exposant !== 0) {
            zeros += '0';
            exposant--;
        }

        // Concaténation du coefficient et du nombre de zéro pour atteindre la taille de l'exposant
        let target = bits.substring(2) + zeros;
        
        // Target en base10
        let targetDecimal = parseInt(target, 16);

        // Valeur max de la cible
        const targetMax = ((2**16-1)*2**208);

        let difficulty = targetMax/targetDecimal;

        log('Difficulté : ' + difficulty)
    }

    calculerDifficulte("0x1c0ae493");
    