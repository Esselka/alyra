/* Exercice 1.4.9 : Calculer la taille de l'ensemble des en-têtes des blocs

Dans le white paper, Satoshi nakamoto relève que la tête d’un bloc est de 80 octets. Il en déduit le calcul suivant : 
“If we suppose that blocks are generated every 10 minutes, 80 bytes * 6 * 24 * 365 = 4.2MB per year”

Comment peut-on calculer précisément la taille de l’ensemble des en-têtes à ce jour?

source : https://bitcoin.fr/bloc-genesis/

*/

log = console.log;

let headerSize = 80;

// Récupération de la date actuelle en secondes (timestamp)
let now = Math.trunc((new Date).getTime()/1000);

// Récupération de la date du bloc genesis en secondes (timestamp)
let genesisBlockDate = new Date('January 3, 2009 18:15:05').getTime()/1000;

// Calcul de la différence (en sec) entre maintenant et la date du bloc genesis
let secSinceGenesisBloc = now - genesisBlockDate;

// Calcul du nombre de fois qu'il s'est écoulé 10min (= 1 bloc) depuis la date du bloc genesis
let nbOfBlocksSinceGenesisBloc = Math.trunc(secSinceGenesisBloc/(60*10));

// Convertion de la taille en octets vers des méga octets
let sizeInMB = (nbOfBlocksSinceGenesisBloc * headerSize)/(1024*1024);


log('Taille de l\'ensemble des en-têtes à ce jour : '+sizeInMB+' Mo')


