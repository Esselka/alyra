const frequences = (chaine) => {
   
    let map = new Map(); // Création de la map

    for (let i = 0; i < chaine.length; i++) {

        // Récupération de chaque caractère qui sera la clé
        let temp = String.fromCharCode(chaine.charCodeAt(i));

        // Si la valeur associé à la clé n'est pas définit -> set à 1, sinon incrémentation de 1
        map.get(temp) === undefined ? map.set(temp, 1) : map.set(temp, map.get(temp) + 1);
        
    }

    // Tri de la map
    let mapTriee = new Map([...map].sort((a, b) => a[1] < b[1] ? 1 : -1));
    
    // Affichage du résultat, trié par ordre décroissant
    let out = "";
    for (let [k, v] of mapTriee) {
        out += ` ${v}${k}`;
    }
    console.log(`Résultat:${out}`);
}


frequences("Etre contesté, c’est être constaté");