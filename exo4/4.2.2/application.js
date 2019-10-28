// Addresse de notre DApp si pas de connexion à metamask
let address = '0x0';
let provider = ethers.getDefaultProvider();

// Initialisation de l'objet dapp
let dapp = { address, provider };

async function createMetaMaskDapp() {
    try {
        // Demande à MetaMask l'autorisation de se connecter
        const addresses = await ethereum.enable();
        const user = addresses[0];
        const CONTRACT_ADDRESS = document.getElementById("contractAddr").value;
        const CONTRACT_ABI = document.getElementById("contractABI").value;
        // Connection au noeud fourni par l'objet web3
        const provider = new ethers.providers.Web3Provider(ethereum);
        // Création de l'accès au contrat
        let monContrat = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        let monContratSigne = monContrat.connect(provider.getSigner(user.address))
        dapp = { provider, monContrat, monContratSigne, user };
        console.log("DApp ready: ", dapp);
        document.getElementById("metaMaskOK").innerHTML = " Connexion au contrat établie";
    } catch (err) {
        // Gestion des erreurs
        console.error(err);
    }
}

async function balance() {
    try {
        if (dapp.address != 0) {
            dapp.provider.getBalance(dapp.address).then((balance) => {
                let etherString = ethers.utils.formatEther(balance);
                console.log("Balance: " + etherString);
                document.getElementById("balance").innerHTML = etherString + " ETH";
            });
        } else {
            alert("Veuillez vous connecter à MetaMask avant toute action.")
        }
    } catch (err) {
        // Gestion des erreurs
        console.error(err);
    }
}

async function currentBlockNumber() {
    if (dapp.address != 0) {
        try {
            dapp.provider.getBlockNumber().then((blockNumber) => {
                console.log("Current block number: " + blockNumber);
                document.getElementById("blockNumber").innerHTML = blockNumber;
            });
        } catch (err) {
            console.error(err);
        }
    } else {
        alert("Veuillez vous connecter à MetaMask avant toute action.")
    }
}

async function getGasPrice() {
    if (dapp.address != 0) {
        dapp.provider.getGasPrice().then((gasPrice) => {
            // gasPrice is a BigNumber; convert it to a decimal string
            gasPriceString = gasPrice.toString();

            console.log("Current gas price: " + gasPriceString);
            document.getElementById("gas").innerHTML = gasPriceString + " wei";
        });
    } else {
        alert("Veuillez vous connecter à MetaMask avant toute action.")
    }
}

