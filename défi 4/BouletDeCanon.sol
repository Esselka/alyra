pragma solidity ^0.5.11;

pragma experimental ABIEncoderV2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

contract BouletDeCanon is ERC721 {
    struct Canon {
        uint256 puissance; // Puissance du canon
        uint256 rarete;    // Rarete du canon
        uint256 magie;     // Puissance magique du canon
        bool aTire;        // Le canon a t-il déjà tiré son boulet ? True = oui, false sinon
    }
    
    struct Joueur {
        string Pseudo;        // Pseudo du joueur
        uint32 xp;           // Expérience du joueur
        uint8 niveauJoueur;  // Niveau du joueur permettant de lancer le boulet plus loin
        bool isRegistered;   // True si enregistré, false sinon
        uint meilleurLance;  // Meilleur lancé du joueur en mètre
        uint8 compteurLance; // Nombre de lancé du joueur
    }
    
    ERC721 fonctionsERC721; // Pour un accès des fonctions depuis le marché
    // Pour les besoins administrateur
    mapping (address => bool) isAdmin;
    address payable private addrAdmin;
    
    constructor () public {
        addrAdmin = msg.sender;
        isAdmin[msg.sender] = true;
    }
    
    // Mapping qui permet de lier un token à une adresse qui en devient le propriétaire
    mapping (uint256 => address) public tokens;
    
    // Mapping qui permet d'accéder aux attributs des canons via leur ID
    mapping (uint256 => Canon) canons;
    
    // Mapping qui permet d'accéder aux attributs des joueurs via leur adresse
    mapping (address => Joueur) joueurs;
    
    // Mapping qui permet de compter le nombre de LancePatate détenus par un joueur
    mapping (address => uint) public tokensCounter;
    
    // Tableau des niveaux des joueurs en fonction dez leur xp
    uint32[10] public xpJoueur = [ 50, 120, 290, 690, 1650, 4000, 9600, 23000, 55000, 140000 ];
    
    function sEnregistrer(string memory votrePseudo) public {
        require(joueurs[msg.sender].isRegistered == false, "Vous êtes déjà enregistré.");
        
        joueurs[msg.sender] = Joueur(votrePseudo, 0, 0, true, 0, 0);
    }
    
    function chercherCanon() public payable returns (Canon memory canonTrouve) {
        require(joueurs[msg.sender].isRegistered == true,"Vous n'êtes pas enregistré à la plateforme.");
        require(msg.value >= 0.1 ether, "Vous devez payer 0.1 ETH au minimum pour chercher un canon.");
        require(tokensCounter[msg.sender] <= 5, "Vous ne pouvez posséder que 5 canons maximum.");
        
        addrAdmin.transfer(msg.value); // Parce que l'argent (même fictif) c'est cool
        
        uint tokenID = (uint(blockhash(block.number-1))%1000);
        require(!(_exists(tokenID)), "Le canon trouvé existe déjà, veuillez recommencer." );
        
        tokens[tokenID] = msg.sender;
        tokensCounter[msg.sender]++;
        
        Canon memory canonTrouve;
        
        canonTrouve.puissance = tokenID%1000/100 <= 3 ? 10 :  tokenID%1000/100 <= 6 ? 20 : tokenID%1000/100 <= 8 ? 35 : 50;
        canonTrouve.rarete = tokenID%100/10 <= 3 ? 0 :  tokenID%100/10 <= 6 ? 1 : tokenID%100/10 <= 8 ? 2 : 3;
        canonTrouve.magie = tokenID%10;
        
        return canonTrouve;
    }
}