/*  Exercice 2.1.7 : Récupérer la récompense en cours à un instant t [optionnel]
    Écrire un programme qui prend en paramètre une date et retourne la récompense actuelle et le nombre total de bitcoins 
    en circulation à cette date.

    Combien il y aura-t-il de Bitcoins en circulation au maximum en 2100?*/

let log = console.log;

const recompenseBloc = (hauteurBloc) => {
	let palier = Math.floor(hauteurBloc / 210000);
	let recompense = 50 * Math.pow(10, 8);
	for (let i = 0; i < palier; i++) {
		recompense = Math.floor(recompense / 2);
		if (recompense === 0) {
			break;
		}
	}
	return recompense;
}

const bitcoinsEnCirculation = (hauteurBloc) => {

    let numOfBTC = 0;
    // Nombre de BTC en circulation à un instant t, ou plutôt à un bloc 'hauteurBloc'
    for (let i = 0; i <= hauteurBloc; i++) {
        numOfBTC += recompenseBloc(i);
    }
    return numOfBTC / Math.pow(10, 8); // Conversion pour avoir le nombre de BTC
}

const rewardAndBitcoinsAtDate = (uneDate) => {
    
    dateInTimestamp = Math.floor(uneDate.getTime());
    // Récupération de la date du bloc genesis en secondes (timestamp)
    let genesisBlockDate = new Date('January 3, 2009 18:15:05').getTime()/1000;
    
    // Date à laquelle on cherche la valeur de la récompense et le nombre de BTC (en temps timestamp)
    let date = Math.floor(new Date(uneDate).getTime()/1000);

    // Pour avoir la hauteur du bloc recherché on fait la différence entre la date recherchée et la date du bloc genesis
    // Et on divise le résultat par 10min
    let blockHeight = (date - genesisBlockDate) / (10*60);

    log(`A la date du        : ${uneDate}\nRécompense par bloc : ${recompenseBloc(blockHeight)/1e8} BTC\nBTC en circulation  : ${bitcoinsEnCirculation(blockHeight)}\n`)
}

let maintenant = new Date();
let septAnsApres = new Date('January 3, 2016 18:15:05');
rewardAndBitcoinsAtDate(maintenant);
rewardAndBitcoinsAtDate(septAnsApres);

