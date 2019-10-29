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
            await dapp.monContratSigne.produireHash(devoirAddr);
            dapp.monContratSigne.on('DevoirRemis', (hash, eleveAdresse) => {
                console.log('Hash : ', hash);
                console.log('Adresse élève : ', eleveAdresse);

                document.getElementById("hashDevoir").innerHTML = "• Hash du devoir : " + hash;
                document.getElementById("adresseEleve").innerHTML = "• Adresse élève : " + eleveAdresse;
            });
        } else {
            alert("Veuillez vous connecter à MetaMask avant toute action.")
        }
    } catch (err) {
        // Gestion des erreurs
        console.error(err);
    }
}
