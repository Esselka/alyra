// Initialisation des variables
let estimation = 50;
let solution = Number(prompt('Bonjour, veuillez saisir un nombre entre 1 et 100'));
let borneMin = 0, borneMax = 100;

/* Vérification si l'estimation est égal à la solution, si oui alors on affiche la bonne réponse, si non nous affichons notre proposition
   et nous lançons une nouvelle recherche */
function verification() {
  if (solution == estimation) {
    alert(`La réponse était : ${solution}`);
  } else {
    console.log(`Ma proposition est ${estimation}`);
    recherche();
    }
  }

// Test si estimation est < ou > à la solution, puis ajustement des bornes min et max pour que le prochain test soit plus optimisé
function recherche () {
  if (estimation < solution) {
    borneMin = estimation;
    estimation = Math.round((estimation + borneMax) / 2);
  } else {
    borneMax = estimation;
    estimation = Math.round((estimation + borneMin) / 2);
  }
}

// Tant que solution n'est pas soit un nombre soit une valeur entre 1 et 100 nous affichons une erreur
while (isNaN(solution) || solution < 1 || solution > 100) {
  solution = Number(prompt('Erreur: vous devez saisir un nombre entre 1 et 100 (inclus)'));
  }

/* On appel verification() tant que estimation est différent de solution, une fois que c'est le cas on appel verification()
pour afficher la réponse*/
while (estimation != solution) {
  verification();
}
verification();
