// Création d'un tableau contenant les caractères de notation des nombres hexadécimaux
let hexa = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

// Transforme un nombre décimal en un nombre hexadecimal Big Endian
const decToHexaBigEndian = (nombre) => {
    let out = "";
    let indexHexa; // Il s'agit de l'index sur lequel on ira chercher la valeur dans hexa = ['0'...'f']

    while (nombre > 0) {
        indexHexa = nombre % 16; // Faire le modulo du nombre nous donne un reste entre 0 et 15 
        out = hexa[indexHexa] + out; // Ajouter le résultat au début de la chaine de caractères
        nombre = Math.trunc(nombre/16); // Garder le quotient de la division par 16
    }

    // Ajout d'un '0' à gauche si on a un nombre impaire d'hexa
    if (out.length % 2 != 0) {
        out = '0' + out; 
    }
    return out;
}

// Transforme un nombre Big Endian en un Little Endian
const bigToLittleEndian = (nombre) => {
    let out = "";
    let bigEndian = decToHexaBigEndian(nombre);

    // On place l'index à l'avant dernier caractère de BigEndian, on ne garde que 2 caractères à partir de là
    // Puis on déplace l'index de 2 vers la gauche et on recommence jusqu'à ce que l'index soit placé à 0 au max
    for (let i = bigEndian.length - 2; i >= 0; i -= 2) {
        out += bigEndian.substr(i, 2); /* Peut être remplacé par bigEndian.substring(i, i + 2) car substr est à éviter
                                                                           ^^^^^^^^^ */
    }

    return out;
}

const conversion = (nombreAConvertir) => {
    
    console.log(`INPUT NUMBER  : ${nombreAConvertir}`);
    console.log(`BIG ENDIAN    : 0x` + decToHexaBigEndian(nombreAConvertir));
    console.log(`LITTLE ENDIAN : 0x` + bigToLittleEndian(nombreAConvertir));
}

conversion(466321);



