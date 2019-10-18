/*  Exercice 2.1.3 : Vérifier si la difficulté a été ajustée
    Écrire une fonction blocReajustement(hauteurBloc) qui détermine s’il s’agit d’un bloc pendant 
    lequel la difficulté est réajustée ou non.

blocReajustement(556416) → true */

let log = console.log;

// La difficulté étant réajustée tous les 2016 blocs, il suffit de savoir si nous sommes sur un multiple de 2016
const blocReajustement = (hauteurBloc) => {
    return hauteurBloc%2016 === 0;
}

log(blocReajustement(556416));