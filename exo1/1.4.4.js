// Exercice 1.4.4 : décomposer une transaction
let log = console.log;

let trx = "0100000001f129de033c57582efb464e94ad438fff493cc4de4481729b859712368582"+
         "75c2010000006a4730440220155a2ea4a702cadf37052c87bfe46f0bd24809759acff8"+
         "d8a7206979610e46f6022052b688b784fa1dcb1cffeef89e7486344b814b0c578133a7"+
         "b0bce5be978a9208012103915170b588170cbcf6380ef701d19bd18a526611c0c69c62"+
         "d2c29ff6863d501affffffff02ccaec817000000001976a9142527ce7f0300330012d6"+
         "f97672d9acb5130ec4f888ac18411a000000000017a9140b8372dffcb39943c7bfca84"+
         "f9c40763b8fa9a068700000000";

// Inverse l'ordre des octets
const reverseBytesOrder = (value) => {
    let out = "";

    for (let i = 0; i < value.length; i += 2) {
        out = value.substring(i, i + 2) + out; // Ajout par la droite
    }

    return out;
}

const decomposeTx = (tx) => {
    let index = 0; // Initialisation d'un index pour parcourir la transaction

    let version = tx.substring(index, index += 8);
    log('VERSION        : ' + reverseBytesOrder(version));

    let inputCount = tx.substring(index, index += 2);
    log('INPUT COUNT    : ' + inputCount);

    let txPreviousHash = tx.substring(index, index += 64);
    log('PREVIOUS HASH  : ' + reverseBytesOrder(txPreviousHash));

    let indexOutput = tx.substring(index, index += 8);
    log('INDEX OUTPUT   : ' + reverseBytesOrder(indexOutput));

    let scriptSigSize = tx.substring(index, index += 2);
    let decalage = (parseInt(scriptSigSize, 16)) * 2; // On garde en mémoire la taille de ScriptSig en nombre de caractères pour sélectionner ScriptSig dans la transaction
    //log(`TX SCRIPTSIG SIZE : ${scriptSigSize} => ${decalage/2} octets`);

    let scriptSig = tx.substring(index, index += decalage);
    log('SCRIPTSIG      : ' + scriptSig);

    let sequence = tx.substring(index, index += 8);
    log('SEQUENCE       : ' + reverseBytesOrder(sequence));

    let outputCount = tx.substring(index, index += 2);
    log('OUTPUT COUNT   : ' + outputCount);

    for (let i = 0; i < parseInt(outputCount, 16); i++) {

        log(`TX NUMBER : ${i+1}`);
        let value = tx.substring(index, index += 16); // Récupération de la valeur en satoshis mais en notation littleEndian
        let nbSatoshis = parseInt(reverseBytesOrder(value), 16); // Récupération de la valeur en décimal
        log('   VALUE          : ' + nbSatoshis + ' satoshis = ' + nbSatoshis*1e-8 + ' BTC');
    
        let pubKeySize = tx.substring(index, index += 2);
        decalage = (parseInt(pubKeySize, 16)) * 2; // pubKeySize = x octets = x*2 caratères
            
        let scriptPubKey = tx.substring(index, index += decalage);
        log('   SCRIPTPUBKEY   : ' + scriptPubKey);
    }

        let locktime = tx.substring(index, index += 8);
        log('LOCKTIME       : ' + reverseBytesOrder(locktime));
}

decomposeTx(trx);




