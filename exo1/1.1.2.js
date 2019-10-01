let estimation = 50;
let solution = Number(prompt('Bonjour, veuillez saisir un nombre entre 1 et 100'));
let borneMin = 0, borneMax = 100;


function verification() {
  if (solution == estimation) {
    alert(`La réponse était : ${solution}`);
  } else {
    console.log(`Ma proposition est ${estimation}`);
    recherche();
    }
  }

function recherche () {
  if (estimation < solution) {
    borneMin = estimation;
    estimation = Math.round((estimation + borneMax) / 2);
  } else {
    borneMax = estimation;
    estimation = Math.round((estimation + borneMin) / 2);
  }
}

while (isNaN(solution) || solution < 1 || solution > 100) {
  solution = Number(prompt('Erreur: vous devez saisir un nombre entre 1 et 100 (inclus)'));
  }

do {
  verification();
} while (estimation != solution);
verification();
