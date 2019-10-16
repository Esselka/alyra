/* Exercice 1.4.11 : Réaliser une preuve de travail (PoW) naïve
Écrire une fonction qui tire aléatoirement une chaîne de n caractères (choisis parmi A..Z).

chaineAlea(8) -> “AKEKUIOP”
Écrire une fonction qui prend en paramètres une chaîne et lance la chaineAlea()  jusqu’à ce que le début du résultat corresponde à cette chaîne.

rechercheDebut(“AA”, 8) - >
   UEKOIPEO
   KEELJENE
   ….
   AAKJEOFE
Mesurer la durée de chaque recherche de solution en fonction de la longueur de la chaîne et de n
*/

log = console.log;

let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Renvoit un nombre entier aléatoire entre 0 et 25 inclus
function tirerNombre() {
    return parseInt(Math.random() * 26, 10);
  }

// Tire aléatoirement une chaîne de n caractères (choisis parmi A..Z)
const chaineAlea = (n) => {
    let out = '';
    
    for (let i = 0; i < n; i++) {
        out += alphabet[tirerNombre()]; 
    }

    return out;
}

// Fonction qui prend en paramètres une chaîne et lance la chaineAlea(n) jusqu’à ce que le début du résultat corresponde à cette chaîne.
const rechercheDebut = (chaine, n) => {
    log(`Longueur de la chaine : ${chaine.length} | Longueur de la chaine aléatoire : ${n}`                   )
    let debut = new Date();
    let randomString = chaineAlea(n);

    while (chaine != randomString.substring(0, chaine.length)) {
        randomString = chaineAlea(n);
    }
    let fin = new Date();
    let time = fin.getTime() - debut.getTime();
    
    // Conversion de la durée en secondes lorsque l'on dépasse les 999ms
    time >= 1000 ? (time /= 1000 , unite = 's') : unite = 'ms';
    
    log(`   '${chaine}' trouvé en ${time}${unite}`);
}

rechercheDebut('AAAA', 8);
rechercheDebut('ZCX', 6);
rechercheDebut('Z', 6);
rechercheDebut('ALYRA', 10);
rechercheDebut('ALYRAM', 10);