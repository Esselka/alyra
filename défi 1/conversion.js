/* Défi #1 : Outil d’analyse bitcoin
    Conversion de valeur :
        - Hexadécimal -> décimal
        - Décimal -> hexadécimal
        - Hexadécimal little endian -> hexadécimal
        - varInt -> décimal
        - Champ Bits -> Cible correspondante
        - Cible -> Difficulté
*/

// Vérification qu'il s'agit bien d'un nombre hexadécimal
const isHexa = (value) => {
                
    // Tous les caractères non hexadécimaux
    let notHexa = /[^a-fA-F0-9]/;

    // Retourne false si on trouve au moins 1 caractère non hexa, sinon retourne true
    return notHexa.test(value) ? false : true;
}

// Conversion d'un décimal en hexadécimal
const decToHex = (d) => {
    let notDec = /[^0-9]/; // Tout ce qui n'est pas un chiffre
    let hexa = Number(d).toString(16);

    if (notDec.test(d)) {
        return "ERREUR: vous devez rentrer un nombre";
    }
    else if (hexa.length % 2 == 1) {
        hexa = '0' + hexa;
    } 
    return hexa;
}

// Conversion d'un hexadécimal en décimal
const hexToDec = (h) => {
    h = h.toLowerCase();

    if (isHexa(h)) {
        return parseInt(h,16);
    }
    else return "ERREUR: vous devez rentrer un nombre hexadécimal";
}

// Inverse l'ordre des octets (little endian -> big endian ou big endian -> little endian)
const reverseBytesOrder = (value) => {
    value = value.toLowerCase();
    let out = "";

    if (isHexa(value)) {
        for (let i = 0; i < value.length; i += 2) {
            out = value.substring(i, i + 2) + out; // Ajout par la droite
        }
        return out;
    }
    else return "ERREUR: vous devez rentrer un nombre hexadécimal";
}

// Retourne la taille en octets du VarInt
const varInt = (value) => {
    value = value.toLowerCase();

    if (isHexa(value)) {

        switch (value.substring(0,2)) {
            case 'fd':
            if (value.length < 6) {
                    return "ERREUR : la longueur du varInt doit être de 6 caractères au minimum"
                } else {
                    return parseInt(reverseBytesOrder(value.substring(2,6)), 16); // 2 octets
                }
                break;
            case 'fe':
            if (value.length < 10) {
                    return "ERREUR : la longueur du varInt doit de 10 caractères au minimum"
                } else {
                    return parseInt(reverseBytesOrder(value.substring(2,10)), 16); // 4 octets
                }
                break;
            case 'ff':
                if (value.length < 18) {
                    return "ERREUR : la longueur du varInt doit être de 18 caractères au minimum"
                } else {
                    return parseInt(reverseBytesOrder(value.substring(2,18)), 16); // 8 octets
                }
                break;
            default:
                return parseInt(value.substring(0, 2), 16); // 1 octet
                break;
        }
    } 
    else return "ERREUR: vous devez rentrer un nombre hexadécimal";
}

// Obtention de la cible à partir du champs BITS
const bitsToTarget = (bits) => {
                
    // Si Bits commence par '0x' on l'enlève
    if (bits.startsWith('0x')) {
        bits  = bits.substring(2);
    }

    if (isHexa(bits)) {

        // Si l'exposant de BITS est > 20 cela veut dire que cible > 32 octets et ce n'est pas possible
        if (parseInt((bits.substring(0,2)), 16) > 32 || parseInt((bits.substring(0,2)), 16) < 3) {
            return "ERREUR: valeur de l'exposant du champs BITS hors limites";
        } else {

            // Récupération du nombre de caractères de la cible
            let targetLength = parseInt(bits.substring(0,2), 16)*2; 

            // Nombre de '0' qu'il y a après le coefficient
            let targetEnd = "";
            for (let i = 0; i < targetLength-6; i++) {
                targetEnd += '0';                         
            }
    
            // Nombre de '0' qu'il y a avant le coefficient
            let targetBegin = "";
            for (let i = 0; i < 64 - targetLength; i++) {
                targetBegin += '0';
            }

            // Concaténation des 3 valeurs de cible
            let target = targetBegin + bits.substring(2) + targetEnd; 
            
            return target;
        }
    }
    else return "ERREUR: vous devez rentrer un nombre hexadécimal";
}

// Conversion de la cible en difficulté
const targetToDifficulty = (target) => {
    // Valeur max de la cible
    const targetMax = ((2**16-1)*2**208);
    target = parseInt(target, 16);

    // Test si la cible est un nombre
    if (isNaN(target)) {
        return 'ERREUR: Vous devez rentrer un nombre'
    }
    
    // Test si la cible est dans l'interval correct pour que cela fonctionne
    if (target <= 0 || target > targetMax) {
        return 'ERREUR: valeur de la cible trop grande ou égale à zéro'
    } 
    else return targetMax/target;
}
