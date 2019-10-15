// Exercice 1.4.7 : Vérifier la validité d’une transaction Pay-to-pubkey-hash

let log = console.log;
const crypto = require('crypto')
const sha256 = crypto.createHash('sha256');
const ripemd160 = crypto.createHash('ripemd160')

const OP_DUP = '76';
const OP_EQUALVERIFY = '88';
const OP_HASH160 = 'a9';
const OP_CHECKSIG = 'ac'; // Considéré toujours true pour cet exercice
let index = 0; // Initialisation d'un index pour parcourir scriptSig et scriptPubSig
let stack = [];

// Retourne la taille en nombre de caractères du VarInt
const varInt = (value) => {
    switch (value.substring(0,2)) {
        case 'fd':
            index += 6;
            return parseInt(value.substring(2,6), 16) * 2; // 2 octets
            break;
        case 'fe':
            index += 10;
            return parseInt(value.substring(2,10), 16) * 2; // 4 octets
            break;
        case 'ff':
            index += 18;
            return parseInt(value.substring(2,18), 16) * 2; // 8 octets
            break;
        default:
            index += 2;
            return parseInt(value.substring(0, 2), 16) * 2; // 1 octet
            break;
    }
}

const verificationP2PKH = (scriptSig, scriptPubSig) => {
    
    // On retire '0x' de scriptSig et de scriptPubSig
    if (scriptSig.startsWith('0x')) scriptSig = scriptSig.substring(2);
    if (scriptPubSig.startsWith('0x')) scriptPubSig = scriptPubSig.substring(2);

    // Vérification qu'il s'agit bien d'un script P2PKH
    if (!(scriptPubSig.startsWith(OP_DUP+OP_HASH160) && (scriptPubSig.endsWith(OP_EQUALVERIFY+OP_CHECKSIG)))) {
        throw 'This is not a P2PKH script';
    }

    // Récupération de la signature et ajout dans la pile
    let sigLen = varInt(scriptSig.substring(index, index + 18)); // 18 = longueur max d'un varInt
    let signature = scriptSig.substring(index, index += sigLen);
    log(`SIGNATURE     : ${signature}`);
    stack.push(signature); // Ajout de la signature à la pile
    
    // Récupération de la clé publique et ajout dans la pile
    let pubKeyLen = varInt(scriptSig.substring(index, index + 18)); // 18 = longueur max d'un varInt
    let pubKey = scriptSig.substring(index, index += pubKeyLen);
    stack.push(pubKey); // Ajout de la clé publique à la pile
    log(`PUBLIC KEY    : ${pubKey}`);

    index = 0; // Réinitialisation de l'index pour l'utiliser sur scriptPubSig
    
    // Duplique le dernier élément de la pile si OP_DUP est trouvé
    if (scriptPubSig.substring(index, index += 2) == OP_DUP) {
        stack.push(stack[stack.length - 1]);
    }

    // Effectue un SHA256 puis un RIPMD160 sur la clé publique
    if (scriptPubSig.substring(index, index += 2) == OP_HASH160) {
        // Récupération de la clé publique, on lui applique sha256 puis un ripemd160
        // Et on ajoute le résultat à la pile
        let lastIndexOfStack = stack.pop();
        let sha256PubKey = sha256.update(Buffer.from(lastIndexOfStack, 'hex')).digest('hex');
        let hash160PubKey = ripemd160.update(Buffer.from(sha256PubKey, 'hex')).digest('hex');
        log('HASH160PUBKEY : '+ hash160PubKey);
        stack.push(hash160PubKey);
    }

    // Récupération du hash160 de la clé publique du script et ajout dans la pile
    let hashPubKeyLen = varInt(scriptPubSig.substring(index, index + 18)); // 18 = longueur max d'un varInt
    let hashPubKey = scriptPubSig.substring(index, index += hashPubKeyLen);
    log('HASHPUBKEY    : '+ hashPubKey);
    stack.push(hashPubKey); // Ajout du hash160 de la clé publique du script dans la pile

    // Vérifie si les clés sont égales si OP_EQUALVERIFY est trouvé
    if (scriptPubSig.substring(index, index += 2) == OP_EQUALVERIFY) {
        log('\nEQUALVERIFY : ' + (stack.pop() == stack.pop()));
    }
}

try {
verificationP2PKH("0x483045022100d544eb1ede691f9833d44e5266e923dae058f702d2891e4ee87621a433ccdf4f022021e405c26b0483cd7c5636e4127a9510f3184d1994015aae43a228faa608362001210372cc7efb1961962bba20db0c6a3eebdde0ae606986bf76cb863fa460aee8475c", "0x76a9147c3f2e0e3f3ec87981f9f2059537a355db03f9e888ac");
}
catch(e) { log(e);}

