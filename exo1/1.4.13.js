/* Exercice 1.4.13 : Commencer à adapter sa preuve de travail au niveau de difficulté
Écrire une fonction cibleAtteinte qui prend pour paramètre l’exposant et le coefficient de la cible et un hash sur 256 bits et qui retourne vrai si ce hash est inférieur à la cible.

cibleAtteinte(coefficient, exposant, hash) -> true
*/
log = console.log;

/* Exemple : (Bits) = 0x180696f4 -> 18 = exposant, 0696f4 = coef donc cible = 0696f4000000000000000000000000000000000000000000
   On utilise l’exposant pour calculer le nombre de zéros à écrire, puis on remplace les 3 premiers octets par le coefficient.
   L'exposant est en base16, ici 0x18 = 24 octets = 48 caractères. */

const cibleAtteinte = (coefficient, exposant, hash) => {

    // Récupération du nombre de caractères de la cible
    exposant = parseInt(exposant, 16)*2; 

    // Création d'un buffer remplis de '0' du nombre de '0' qu'il y a après le coefficient
    let cibleFin = new Buffer.allocUnsafe(exposant-coefficient.length).fill('0');
    
    // Création d'un buffer remplis de '0' du nombre de '0' qu'il y a avant le coefficient
    let cibleDebut = new Buffer.allocUnsafe(64 - exposant).fill('0').toString()
   
    // Concaténation des 3 valeurs de cible
    let cible = cibleDebut + coefficient + cibleFin; 

    log('CURRENT HASH  : '+ hash);
    log('TARGET        : '+ cible);
    log('HASH < TARGET : ' + (hash < cible ? true : false)+'\n');
}

cibleAtteinte('3218a5', '17', '00000000000000000003218a5618fec000000f22000000450000000b9000884c');
cibleAtteinte('3218a5', '17', '000000000015fc0a227def68cab1234587fe3d5f6ab2200000000000000c1241');
