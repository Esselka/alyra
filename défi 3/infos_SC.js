let CONTRACT_ADDRESS = '0xBC20b7E50ff26cdca97C0a77d7bd4DDD1b74Da6a';

let CONTRACT_ABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "detruireContrat",
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
				"name": "IDENTIFIANT",
				"type": "string"
			}
		],
		"name": "payerStockage",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
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
				"indexed": false,
				"internalType": "string",
				"name": "IDENTIFIANT",
				"type": "string"
			}
		],
		"name": "Epingler",
		"type": "event"
	}
];