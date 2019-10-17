/* Exercice 2.1.1 : Convertir la cible en difficulté (JavaScript)
Écrire une fonction qui convertit la cible en difficulté.
*/

let log = console.log;

const targetToDifficulty = (target) => {
    
    // Valeur max de la cible
    const targetMax = ((2**16-1)*2**208);

    // Test si la cible est un nombre
    if (isNaN(target)) {
        throw 'ERREUR: Vous devez rentrer un nombre\n'
    }
    
    // Test si la cible est dans l'interval correct pour que cela fonctionne
    if (target <= 0 || target > targetMax) {
        throw 'ERREUR: valeur de la cible trop grande ou égale à zéro\n'
    } 
    else log(`Pour la cible : ${target}, la difficulté actuelle est : ${targetMax/target}\n`);

}

try {
    targetToDifficulty('2e60');
} catch (e) {
    log(e);
}

try {
    targetToDifficulty('0');
} catch (e) {
    log(e);
}

try {
    targetToDifficulty('bonjour');
} catch (e) {
    log(e);
}