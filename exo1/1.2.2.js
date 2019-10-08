// Déclaration des variables d'environnement
let maxTailleBloc = 6000;
let pourboire = 0;
let meilleurPourboire = 0;
let tailleBloc = 0;
let complexite = 0;
let ratio = 0;
let solution;
let transactionsRetenues = [];
let data =     [2000, 6000, 800, 700, 1200, 1000, 1300, 600];
let satoshis = [13000, 9000, 2000, 1500, 3500, 2800, 5000, 1500];

/* Recherche séquentielle de la plus grande somme de données de chaque bloc sans dépasser 6000 octets
   on stocke dans un tableau tous les blocs que l'on garde puis on additionne les pourboires de chaque bloc retenus*/
function meilleureGestionBloc(tabData, tabSatoshis) {
    pourboire = 0;
    tailleBloc = 0;
    transactionsRetenues = [];
    for (let i = 0; i < tabData.length; i++) {
        complexite++;

        if (tailleBloc + tabData[i] < maxTailleBloc) {
            tailleBloc += tabData[i];
            transactionsRetenues.push(tabData[i]);
            pourboire += tabSatoshis[i];
        }  
    }
    if (pourboire > meilleurPourboire) {
        meilleurPourboire = pourboire;
    }  
}

/* Appel de meilleureGestionBloc pour faire un 1er passage et trouver le 1er meilleur pourboire
   Puis on effectue un décalage sur les tableaux et on recommence la boucle jusqu'à avoir tester
   toutes les possibilitées de tableaux pour trouver un meilleur pourboire*/
for (let i = 0; i < data.length; i++) {
    complexite++;

    meilleureGestionBloc(data, satoshis);
    data.push(data.shift());         //* on enlève le 1er élément du tableau et on le met à la fin, on boucle le tableau
    satoshis.push(satoshis.shift()); //* même chose ici
    if (meilleurPourboire == pourboire) {
        solution = `Pourboire = ${pourboire} satoshis\nTailleBloc = ${tailleBloc} octets\nRatio = ${pourboire/tailleBloc}\nComplexité : ${complexite} opérations\nTransactions à retenir -> [${transactionsRetenues}]`;
    } 
}

console.log(`Voici le meilleur pourboire que vous puissiez avoir dans cette situation :\n${solution}`);