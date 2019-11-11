// Addresse de notre DApp si pas de connexion à metamask
let address = '0x0';
let provider = ethers.getDefaultProvider();

// Initialisation de l'objet dapp
let dapp = { address, provider };

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
        dapp = { provider, monContrat, monContratSigne, user };
        console.log("DApp ready: ", dapp);
        document.getElementById("metaMaskOK").innerHTML = " Connexion au contrat établie";
    } catch (err) {
        // Gestion des erreurs
        document.getElementById("metaMaskOK").innerHTML = " La connexion à MetaMask a échouée";
        console.error(err);
    }
}


async function ajouterFichier(fichier) {
    await ipfs.add(new ipfs.types.Buffer.from(fichier), (err, data) => {
        if (err) {
            return console.error(err);
        }
        else {
            dapp.monContratSigne.ajouterCarte(data[0].hash);
        }
    });
}

function recupFichier(hash) {
    ipfs.cat(hash, (err, data) => {
        err ? console.error(err) : document.getElementById("fichierImage").value;
    })
}

const ajouterImageSC = () => {
    try {
        let image = document.getElementById("fichierImage").files[0];
        const reader = new FileReader();
        reader.readAsArrayBuffer(image);
        reader.onloadend = async function () {
            ajouterFichier(reader.result);
            document.getElementById("resultTransfer").innerHTML = " Image transférée";
        }
    } catch (err) {
        document.getElementById("resultTransfer").innerHTML = " Le transfer a échoué";
        console.error(err);
    }
}

async function afficher10images() {
    let tailleTableau = await dapp.monContrat.nbCartes();
    document.getElementById("nombreImages").innerHTML = ` Il y a ${tailleTableau} images dans le contrat.`;
    document.getElementById("list-image").innerHTML = ""; // Vider l'affichage de "list-image" pour éviter d'afficher les mêmes éléments

    if (tailleTableau != 0) {
        if (tailleTableau < 10) {
            for (let index = 0; index < tailleTableau; index++) {
                afficherImage(index);
            }
        } else {
            for (let i = 0; i < 10; i++) {
                afficherImage(i);
            }
        }
    } else document.getElementById("nombreImages").innerHTML = " Il n'y a aucune image dans le contrat.";
}

async function afficherImage(index) {
    let hashImage = await dapp.monContrat.recuperer(index);
    ipfs.cat(hashImage, (err, data) => {
        if (err) console.error(err);
        let img = new Image();
        img.width = 200;
        img.height = 200;
        img.src = "data:image/jpg;base64,"+ data.toString('base64');
        console.log("image : ", img);
        document.getElementById("list-image").appendChild(img);
    });
}

function resetTableau () {
    dapp.monContratSigne.effacerTableau();
}