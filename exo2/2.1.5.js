/*  Exercice 2.1.5 : Calculer la récompense associée à un bloc.
    Écrire une fonction recompenseBloc(hauteurBloc) qui, étant donné une hauteur de bloc, 
    calcule la récompense associée à ce bloc. */

let log = console.log;

const recompenseBloc = (hauteurBloc) => {
    
    // Récompense initiale en BTC
    let initialReward = 50;
    
    // Numéro du palier des récompenses
    let stepReward = Math.trunc(hauteurBloc/210000);

    // Récompense divisée par 2 tous les paliers de 210 000 blocs
    let reward = initialReward / Math.pow(2, stepReward);

    if(reward < 1e-8) reward = 0;
    
    return reward;
}

log(recompenseBloc(2100001))

/***************************************************
                    CORRECTION

function recompenseBloc(hauteurBloc) {
	let palier = Math.floor(hauteurBloc / 210000);
	let recompense = 50 * Math.pow(10, 8);
	for (let i = 0; i < palier; i++) {
		recompense = Math.floor(recompense / 2);
		if (recompense === 0) {
			break;
		}
	}
	return recompense / Math.pow(10, 8);
}
*/