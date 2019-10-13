// Exercice 1.4.3 : Identifier les différents champs d'une entrée de transaction

let log = console.log;

const identifyTxFields = (trx) => {
    let index = 0;

    let txPreviousHash = tx.substring(index, index + 64);
    index += 64;
    log('TX PREVIOUS HASH  : ' + txPreviousHash);

    let indexOutput = tx.substring(index, index + 8);
    index += 8;
    log('TX INDEX OUTPUT   : ' + indexOutput);

    let scriptSigSize = tx.substring(index, index + 2);
    index += 2;
    let decalage = (parseInt(scriptSigSize, 16)) * 2; // On garde en mémoire la taille de ScriptSig en nombre de caractères pour sélectionner ScriptSig dans la transaction
    //log(`TX SCRIPTSIG SIZE : ${scriptSigSize} => ${decalage/2} octets`);

    let scriptSig = tx.substring(index, index + decalage);
    index += decalage;
    log('TX SCRIPTSIG      : ' + scriptSig);

    let sequence = tx.substring(index, index + 8);
    log('TX SEQUENCE       : ' + sequence);
}

// Passage de la transaction en minuscule pour éviter d'éventuelles erreurs de manipulation par la suite
let tx = "941e985075825e09de53b08cdd346bb67075ef0ce5c94f98853292d4bf94c10d010000006b483045022100ab44ef425e6d85c03cf301bc16465e3176b55bba9727706819eaf07cf84cf52d02203f7dc7ae9ab36bead14dd3c83c8c030bf8ce596e692021b66441b39b4b35e64e012102f63ae3eba460a8ed1be568b0c9a6c947abe9f079bcf861a7fdb2fd577ed48a81Feffffff".toLowerCase();

identifyTxFields(tx);

