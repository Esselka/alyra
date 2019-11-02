// Addresse de notre DApp si pas de connexion à metamask
let address = '0x0';
let provider = ethers.getDefaultProvider();

// Initialisation de l'objet dapp
let dapp = { address, provider };

const CONTRACT_ADDRESS = "0xbFb03B1B6B3896a59d4202e85b9b9aA749B950cb";
const CONTRACT_ABI = [
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "indexDemande",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "indexCandidat",
                "type": "uint256"
            }
        ],
        "name": "accepterOffre",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "remuneration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "delaiEnSecondes",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "minReputation",
                "type": "uint256"
            }
        ],
        "name": "ajouterDemande",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "mechant",
                "type": "address"
            }
        ],
        "name": "bannirUtilisateur",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "adresseDuNouvelAdmin",
                "type": "address"
            }
        ],
        "name": "donnerDroitAdmin",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "nom",
                "type": "string"
            }
        ],
        "name": "inscription",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "hash",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "indexDemande",
                "type": "uint256"
            }
        ],
        "name": "livraison",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "indexDemande",
                "type": "uint256"
            }
        ],
        "name": "postuler",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "indexDemande",
                "type": "uint256"
            }
        ],
        "name": "reclamerSalaire",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "indexDemande",
                "type": "uint256"
            }
        ],
        "name": "refuserTravail",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "indexDemande",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "indexCandidat",
                "type": "uint256"
            }
        ],
        "name": "validerTravail",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "demandes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "remuneration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "delaiMax",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "dateRemise",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "illustrateur",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "hashUrl",
                "type": "bytes32"
            },
            {
                "internalType": "enum Marketplace.Etat",
                "name": "etat",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "minReputation",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "demandeur",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "listerDemandes",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "remuneration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "delaiMax",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "dateRemise",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "illustrateur",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "hashUrl",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "enum Marketplace.Etat",
                        "name": "etat",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minReputation",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address[]",
                        "name": "candidats",
                        "type": "address[]"
                    },
                    {
                        "internalType": "address",
                        "name": "demandeur",
                        "type": "address"
                    }
                ],
                "internalType": "struct Marketplace.Demande[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "string",
                "name": "url",
                "type": "string"
            }
        ],
        "name": "obtenirHash",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "Hash",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "utilisateurs",
        "outputs": [
            {
                "internalType": "string",
                "name": "nom",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "reputation",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "estInscrit",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isAdmin",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

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

async function listerOffres() {
    try {
        if (dapp.address != 0) {
            let listeDemandes = await dapp.monContratSigne.listerDemandes();
            console.log("Liste des demandes : ", listeDemandes);

            let fragment = document.createDocumentFragment();

            // Entête du tableau
            let tableau = `
            <table>
           <thead>
             <tr>
               <th scope="col">Demande</th>
               <th scope="col">Description</th>
               <th scope="col">Réputation minimum</th>
               <th scope="col">Rémunération (ETH)</th>
               <th scope="col">Délai</th>
               <th scope="col">Adresse du candidat</th>
               <th scope="col">Statut</th>
               <th scope="col">Adresse demandeur</th>
               <th scope="col">Adresse illustrateur</th>
               <th scope="col">Hash de l'adresse du travail</th>
             </tr>
           </thead>`

            let indexDemande; // pour pouvoir l'utiliser dans tableau
            if (listeDemandes.length > 0) {
                for (dem of listeDemandes) { // Pour chaque demande dans la liste des demandes
                    let unCandidat = document.createElement("div");
                    indexDemande = listeDemandes.indexOf(dem);

                    for (candidat of dem) { // Pour le candidat de chaque demande
                        unCandidat.innerHTML += candidat + "<br>";
                    }

                    unCandidat.innerHTML +=
                        `<td>
                            <button onclick="postuler(${indexDemande})">Postuler<br>
                            <button onclick="accepter(${indexDemande})">Accepter candidat
                        </td>`

                    tableau +=
                        `<tbody>
                            <tr>
                                <th scope="row">index #${indexDemande}</th>
                                <td align="center">${dem.description}</td>
                                <td align="center">${dem.minReputation}</td>
                                <td align="center">${dem.remuneration / 10e18} ETH</td>
                                <td align="center">${(dem.delaiMax / 86400).toFixed(2)} jours</td>
                                <td align="center">${candidat}</td>
                                <td align="center">${status(dem.etat)}</td>
                                <td align="center">${dem.demandeur}</td>
                                <td align="center">${dem.illustrateur}</td>
                                <td align="center">${dem.hashUrl}</td>
                            </tr>
                        </tbody>`;
                    document.getElementById("offres").innerHTML = tableau;
                    let tab = document.createElement("div");
                    tab.innerHTML = tableau;
                    fragment.appendChild(tab);
                }
            } else {
                document.getElementById("offres").innerHTML = "Aucune offre encore enregistrée à ce jour !";
            }
        } else {
            alert("Veuillez vous connecter à MetaMask avant toute action.")
        }
    } catch (err) {
        // Gestion des erreurs
        console.error(err);
    }
}

function status(etat) {
    switch (etat) {
        case 0:
            return "OUVERTE";
            break;
        case 1:
            return "ENCOURS";
            break;
        case 2:
            return "FERMEE";
            break;
        case 3:
            return "REFUSEE";
            break;
        default:
            return "ERREUR: pb status : " + etat;
            break;
    }
}
