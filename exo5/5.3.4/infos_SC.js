let CONTRACT_ADDRESS = "0xC749788EC96e4AE802D9Da1a08A38dbfA724f3De";

let CONTRACT_ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "s",
				"type": "string"
			}
		],
		"name": "ajouterCarte",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "effacerTableau",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nbCartes",
		"outputs": [
			{
				"name": "nbDeCartes",
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
				"name": "ind",
				"type": "uint256"
			}
		],
		"name": "recuperer",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];