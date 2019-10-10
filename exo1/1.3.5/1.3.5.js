const sha256 = require("./node_modules/crypto-js/sha256.js");
const ripmd160 = require("./node_modules/crypto-js/ripemd160.js");
const getRandomValues = require('get-random-values');


function genereAdresseBitcoin() {
    console.log('GENERATION ADRESSE BITCOIN...\n')

    // Création d'un nombre aléatoire
    let array = new Uint8Array(3);
    getRandomValues(array); 
    rnd = array.join('');
    console.log(`CLE PRIVEE  : ${rnd}`);

    // Hash de la clé privée (ici rnd) pour obtenir la clé public
    let hashSha256Rnd = sha256(rnd);
    console.log(`SHA 256     : ${hashSha256Rnd}`);

    // Hash ripmd160 de la clé public et ajout du préfixe 0x00 (mainnet)
    let hashRipmd160 = ripmd160(hashSha256Rnd);
    console.log(`RIPMD160    : ${hashRipmd160}`);

    // Pour sécuriser l'adresse on effectue un double hash (SHA-256) et on 
    // garde les 4 premiers octets pour les ajouter à la fin de notre adresse
    let doubleHash = sha256(sha256(hashRipmd160));
    let _4PremiersOctets = (doubleHash+"").substr(0,8);
    console.log(`DOUBLE HASH : ${doubleHash}`);

    console.log(`BTC ADDRESS : 0x00${hashRipmd160}${_4PremiersOctets}`);

    console.log('\n...FIN DE LA GENERATION');
}

genereAdresseBitcoin();



