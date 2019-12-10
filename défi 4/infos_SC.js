let CONTRACT_ADDRESS  = '0xfC2F5D84dBf833B902d6A4869D12aE69409D50B3';

let CONTRACT_ABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "creerCanon",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "puissance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rarete",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "magie",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "creerTournoi",
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
				"name": "tokenID",
				"type": "uint256"
			}
		],
		"name": "lancerBouletCanon",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "resultatLance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "objet",
				"type": "uint256"
			}
		],
		"name": "offreClassique",
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
				"name": "objet",
				"type": "uint256"
			}
		],
		"name": "offreHollandaise",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "participerTournoi",
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
				"name": "objet",
				"type": "uint256"
			}
		],
		"name": "proposerALaVenteClassique",
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
				"name": "objet",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "prixVendeur",
				"type": "uint256"
			}
		],
		"name": "proposerALaVenteHollandaise",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "recupArgent",
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
				"name": "objet",
				"type": "uint256"
			}
		],
		"name": "recupererObjet",
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
				"name": "objet",
				"type": "uint256"
			}
		],
		"name": "recupererObjetHollandaise",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "recupererPrix",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "Remboursement",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "resetTournoi",
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
				"name": "votrePseudo",
				"type": "string"
			}
		],
		"name": "sEnregistrer",
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
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "updateNiveauJoueur",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bids",
		"outputs": [
			{
				"internalType": "address",
				"name": "meilleurAcheteur",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "meilleureOffre",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "finEnchere",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "objet",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "vendeur",
				"type": "address"
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bidsHollandaise",
		"outputs": [
			{
				"internalType": "address",
				"name": "acheteur",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "prixVendeur",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "prixFinalVente",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "finEnchere",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "objet",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "vendeur",
				"type": "address"
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
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "exists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "Exist",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "listerMesCanons",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "Liste",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numTN",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "_owner",
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
		"name": "recupListeOffres",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
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
				"internalType": "address",
				"name": "Adresse",
				"type": "address"
			}
		],
		"name": "statsJoueur",
		"outputs": [
			{
				"internalType": "string",
				"name": "Pseudo",
				"type": "string"
			},
			{
				"internalType": "uint32",
				"name": "xp",
				"type": "uint32"
			},
			{
				"internalType": "uint8",
				"name": "niveauJoueur",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "meilleurLance",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "compteurLance",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];