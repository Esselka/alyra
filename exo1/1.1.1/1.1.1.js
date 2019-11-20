// Initialisation des variables
let unNombre = tirerNombre();
let saisie = 0;
let prenom = prompt('Bonjour, quel est ton prénom ?');

// Renvoit un nombre entier aléatoire entre 1 et 100 inclus
function tirerNombre() {
  return parseInt(Math.random() * 100 + 1, 10);
}

// Test si la saisie de l'utilisateur est > ou < au nombre tiré aléatoirement et lui retourne une indication
// s'il est proche ou très proche du résultat
function supOuInf(a, b) {
  if (a == b) {
    alert(`Félicitations ${prenom}, le nombre à trouver était : ${unNombre} !`);
  }
  else if (a < b) {
    return "C'est + " + pasLoin(a, b);
  } else { return "C'est - " + pasLoin(a, b); }
return "Au revoir";
}

// Renvoit des infos si on est proche (<=5) ou très proche (<= 6-10) du résultat
function pasLoin(a, b) {
  if (Math.abs(b-a) <= 5 || Math.abs(a-b) <= 5) {
    return "mais vous êtes très proche";
  } else if (Math.abs(b-a) <= 10 || Math.abs(a-b) <= 10) {
    return "mais vous êtes proche";
  } else return "";
}


// Boucle qui demande de saisir un nombre entre 1 et 100, retourne une erreur dans le cas contraire
// Si l'utilisateur a saisit un nombre entre 1 et 100, affiche le résultat de la fonction supOuInf()
while (saisie != unNombre) {
  saisie = Number(prompt("Devinez un nombre entre 1 et 100 (inclus):"));
  if (isNaN(saisie) || saisie < 1 || saisie > 100) {
    alert('Vous devez saisir un nombre entre 1 et 100 (inclus)')
  } else {
    alert(supOuInf(saisie, unNombre));
  }
}
