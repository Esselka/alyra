let address = '0x0';
let provider = '0x0';
let dapp = { address, provider };

async function createMetaMaskDapp() {
    try {
        // Demande à MetaMask l'autorisation de se connecter
        const addresses = await ethereum.enable();
        const address = addresses[0]
        // Connection au noeud fourni par l'objet web3
        const provider = new ethers.providers.Web3Provider(ethereum);
        dapp = { address, provider };
        console.log(dapp)
        document.getElementById("metaMaskOK").innerHTML = "Connexion établie";
    } catch (err) {
        // Gestion des erreurs
        console.error(err);
    }
}

async function balance() {
    if (dapp.address != 0) {
        dapp.provider.getBalance(dapp.address).then((balance) => {
            let etherString = ethers.utils.formatEther(balance);
            console.log("Balance: " + etherString);
            document.getElementById("balance").innerHTML = etherString + " ETH";
        });
    } else {
        alert("Veuillez vous connecter à MetaMask avant toute action.")
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

