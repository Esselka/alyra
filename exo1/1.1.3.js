function estPalindrome(str) {
  // On enlève les espaces, on met en minuscule et on met le tout  
  // dans un tableau dont chaque élément contiendra un caractère
  let minusSansEspace = str.replace(/ /g,'').toLowerCase().split('');

  // On inverse les éléments du tableau pour le lire à l'envers, on
  // repasse en String pour pouvoir appeler replace() et enlever les virgules
  let reverse = minusSansEspace.reverse().toString().replace(/,/g, '');

  /* Etant donné que reverse écrit dans le tableau original, mon tableau est
     à l'envers je veux donc le remettre dans son état initial avant de 
     comparer si les chaines de caractères sont identiques */
  minusSansEspace = minusSansEspace.reverse().toString().replace(/,/g, '');
    
    if ( minusSansEspace == reverse ) {
      return true;
    } 
    else { 
      return false; 
    }
}

console.log(estPalindrome("ESOPE RESTE ICI ET SE REPOSE"));
console.log(estPalindrome("RADAR"));
console.log(estPalindrome("ASSIETTE"));
