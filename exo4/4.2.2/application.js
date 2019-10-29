// Addresse de notre DApp si pas de connexion à metamask
let address = '0x0';
let provider = ethers.getDefaultProvider();

// Initialisation de l'objet dapp
let dapp = { address, provider };

const CONTRACT_ADDRESS = document.getElementById("contractAddr").value;
const CONTRACT_ABI = document.getElementById("contractABI").value;

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
        console.error(err);
    }
}

async function remettreDevoir() {
    try {
        if (dapp.address != 0) {
            let devoirAddr = document.getElementById("devoir").value;
            console.log('Adresse du devoir : ', devoirAddr);
            let devoirHash = await dapp.monContratSigne.produireHash(devoirAddr);
            console.log('Hash du devoir : ', devoirHash);
            let position = await dapp.monContratSigne.remettre(devoirHash);
            console.log('Position : ', position);
            document.getElementById("hashDevoir").innerHTML = devoirHash;
            document.getElementById("position").innerHTML = position.nonce; // Le nonce compte le nombre de fois que la tx a été appelé, ici ça correspond à la position mais ATTENTION à bien l'utiliser
        } else {
            alert("Veuillez vous connecter à MetaMask avant toute action.")
        }
    } catch (err) {
        // Gestion des erreurs
        console.error(err);
    }
}

async function credibilite() {
    try {
        if (dapp.address != 0) {
            // Demande à MetaMask l'autorisation de se connecter
            const addresses = await ethereum.enable();
            const user = addresses[0];
            // Connection au noeud fourni par l'objet web3
            const provider = new ethers.providers.Web3Provider(ethereum);
            let monContrat = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
            let monContratSigne = monContrat.connect(provider.getSigner(user.address));
            monContrat.cred(dapp.user).then((maCredibilite) => {
                document.getElementById("credibilite").innerHTML = maCredibilite;
                console.log('Credibilité : ', maCredibilite);
            });
        } else {
            alert("Veuillez vous connecter à MetaMask avant toute action.")
        }
    } catch (err) {
        // Gestion des erreurs
        console.error(err);
    }
}