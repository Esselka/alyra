const sha256 = require("./node_modules/crypto-js/sha256.js");
const ripmd160 = require("./node_modules/crypto-js/ripemd160.js");
const getRandomValues = require('get-random-values');
const bs58 = require('bs58')




function genereAdresseBitcoin() {
    console.log('GENERATION ADRESSE BITCOIN...\n')

    // Simulation d'une clé publique en utilisant un nombre aléatoire
    let array = new Uint8Array(3);
    getRandomValues(array); 
    let publicKey = array.join('');
    console.log(`PUBLIC KEY  : ${publicKey}`);

    // Obtention du hash ripmd160 en faisant auparavant un SHA-256 de la clé publique   
    let hashRipmd160 = ripmd160(sha256(publicKey));
    console.log(`RIPMD160    : ${hashRipmd160}`);

    // Pour sécuriser l'adresse on effectue un double hash (SHA-256) et on 
    // garde les 4 premiers octets pour les ajouter à la fin de notre adresse
    let doubleHash = sha256(sha256(hashRipmd160));
    let _4PremiersOctets = (doubleHash+"").substr(0,8);
    console.log(`DOUBLE HASH : ${doubleHash}`);

    // Encodage du hash en base58 + ajout du préfixe 0x00 (mainnet)
    let btcAddr = "0x00" + hashRipmd160 + _4PremiersOctets;
    console.log(`BTC ADDRESS : ${btcAddr}`)
    const bytes = Buffer.from(btcAddr.substr(2, btcAddr.length -1), 'hex');
    const address = bs58.encode(bytes);
    console.log(`BASE58 ADDR : ${address}`);
    
    console.log('\n...FIN DE LA GENERATION');
}

genereAdresseBitcoin();




