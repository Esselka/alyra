/*  Exercice 2.1.6 : Calculer le nombre total de Bitcoin à un instant t 
    Écrire une fonction qui, étant donné une hauteur de bloc, calcule le nombre total de bitcoins
    en circulation lors de la publication de ce bloc. Le graphique ci-dessous peut vous aider */

let log = console.log;

// Récompense du bloc en Satoshis
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

log(bitcoinsEnCirculation(2100001));



