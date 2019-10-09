/*let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (const i in alpha) {
    console.log(alpha[i] + " = " + alpha.charCodeAt(i));
}*/

function vigenere(chaine, key) {
    
    let out = ""; // Sortie de la fonction
    indexClé = 0;
    console.log("Entrainement A -> Chiffrage Vigenere :")
    
    clé = sansEspace(key).toUpperCase(); // On met la clé en majuscules et on enlève les espaces
    console.log(`Clé    : ${clé}`);
    
    chaine = sansEspace(chaine).toUpperCase(); // On enlève les espaces du texte et on le met en majuscules
    console.log(`Entrée : ${chaine}`);
    
    // Convertir chaque caractère de la chaîne
    for (const i in chaine) {
        const temp = chaine.charCodeAt(i); // Caractère temporaire sur lequel on effectue le décalage
        const decalage = clé.charCodeAt(indexClé) - 65; // Décalage de chaque lettre dans la clé : A = 0, B = 1... Z = 25

        temp + decalage % 26 > 90 ? out += String.fromCharCode(temp - 26 + decalage % 26) : out += String.fromCharCode(temp + decalage % 26);

        // Permet de boucler l'index de la clé
        indexClé++;
        if (indexClé==clé.length) {
            indexClé=0;
        }
            
    }
    console.log(`Sortie : ${out}`);
    return out;
}

function reverseVigenere(chaine, key) {
    
    let out = ""; // Sortie de la fonction
    indexClé = 0;
    console.log("Entrainement B -> Déchiffrage Vigenere :")
    
    clé = sansEspace(key).toUpperCase(); // On met la clé en majuscules et on enlève les espaces
    console.log(`Clé    : ${clé}`);
    
    chaine = sansEspace(chaine).toUpperCase(); // On enlève les espaces du texte et on le met en majuscules
    console.log(`Entrée : ${chaine}`);
    
    // Convertir chaque caractère de la chaîne
    for (const i in chaine) {
        const temp = chaine.charCodeAt(i); // Caractère temporaire sur lequel on effectue le décalage
        const decalage = clé.charCodeAt(indexClé) - 65; // Décalage de chaque lettre dans la clé : A = 0, B = 1... Z = 25

        temp - decalage % 26 < 65 ? out += String.fromCharCode(temp + 26 - decalage % 26) : out += String.fromCharCode(temp - decalage % 26);

        // Permet de boucler l'index de la clé
        indexClé++;
        if (indexClé==clé.length) {
            indexClé=0;
        }
            
    }
    console.log(`Sortie : ${out}`);
}

function regroupement(texte, n) {
    texte = sansEspace(texte).toUpperCase(); // Enlève les espaces et mise en majuscules
    let tabOut = []; // Création du tableau de sortie
    let indexTab = 0; // Index du tableau
    console.log("Entrainement C -> Regroupement :");
    console.log(`Entrée : ${texte}`);

    for (i in texte) {
        tabOut[indexTab] === undefined ? tabOut[indexTab] = texte.charAt(i) : tabOut[indexTab] = tabOut[indexTab] + texte.charAt(i);

        indexTab++;
        if (indexTab >= n) indexTab = 0;
    }
    console.log(`Sortie : [${tabOut}]`);
}

// Retirer les espaces d'une chaîne de caractères
function sansEspace(chaine) {
    if (chaine.length == 0) return "";
    else {
        var out = "";
        for (const lettre in chaine) { 
            out  += chaine.charAt(lettre) == " " ? "" : chaine.charAt(lettre);
        }
        return out ;
    }
}

let recup = vigenere("Bien le bonjour madame", "Alyra");
console.log("");
reverseVigenere(recup, "Alyra");
console.log("");
regroupement("Mes vieilles tantes", 3);



