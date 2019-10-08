// let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function chiffreCesar(chaine, decalage) {
    
    let resultat = "";
    
    for (let i = 0; i < chaine.length; i++) {
        const temp = chaine.charCodeAt(i) + Number(decalage);
        resultat += String.fromCharCode(temp);
        // resultat = resultat.replace('!', ' ');
        
    }
    return resultat;
}

console.log(chiffreCesar('Bonjour la france', 1));
console.log(chiffreCesar('ABCDE FGH', 3));