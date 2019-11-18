const ipfs = window.IpfsHttpClient('localhost', '5001');

async function createMetaMaskDapp() {
  try {
    // Demande à MetaMask l'autorisation de se connecter
    const addresses = await ethereum.enable();
    const user = addresses[0];
    // Connection au noeud fourni par l'objet web3
    const provider = new ethers.providers.Web3Provider(ethereum);
    // Création de l'accès au contrat
    let monContrat = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    let monContratSigne = monContrat.connect(provider.getSigner(user.address));
    dapp = { monContrat, monContratSigne };
    console.log("DApp ready: ", dapp);
    document.getElementById("metaMaskOK").innerHTML = " Connexion au contrat établie";
  } catch (err) {
    document.getElementById("metaMaskOK").innerHTML = " La connexion à MetaMask a échouée";
    console.error(err);
  }

  // Surveiller l'event 'Epingler' et exécuter le callback dès que le SC emet l'event
  dapp.monContrat.on('Epingler', (IDENTIFIANT) => {
    ipfs.pin.add(IDENTIFIANT, (err, data) => {
      if (err) {
        return console.error(err);
      }
      else {
        document.getElementById('resEpingler').innerHTML = `<h3>Fichier : '<span style="color:red">${data[0].hash}</span>' épinglé avec succès !</h3>`;
      }
    });
  });
}

async function payerStockage(hash) {
  try {
    //https://docs.ethers.io/ethers.js/html/api-contract.html?highlight=send#overrides
    let overrides = { value: ethers.utils.parseEther('0.1') };
    await dapp.monContratSigne.payerStockage(hash, overrides);

  } catch (err) {
    console.error(err);
  }
}

async function getFileHash(fichier) {
  await ipfs.add(new ipfs.types.Buffer.from(fichier), (err, data) => {
    if (err) {
      return console.error(err);
    }
    else {
      document.getElementById('fileAdded').innerHTML = `Hash du fichier ajouté : ${data[0].hash}`;
    }
  });
}

async function publierChaine(CHAINE) {
  await ipfs.add(new ipfs.types.Buffer.from(CHAINE.toString()), (err, data) => {
    err ? console.log(err) : document.getElementById("resultatPublier").innerHTML = `<u>Hash du fichier sur IPFS</u> : ${data[0].hash} <br>`;
  })
}

const ajouterFichier = () => {
  try {
    let fichier = document.getElementById("fichier").files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(fichier);
    reader.onloadend = function () {
      getFileHash(reader.result);
      document.getElementById("resultTransfer").innerHTML = " Fichier transférée";
    }
  } catch (err) {
    document.getElementById("resultTransfer").innerHTML = " Le transfer a échoué";
    console.error(err);
  }
}