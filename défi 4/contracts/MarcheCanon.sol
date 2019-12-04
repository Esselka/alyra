pragma solidity ^0.5.11;

pragma experimental ABIEncoderV2;

import "https://github.com/Esselka/alyra/blob/master/d%C3%A9fi%204/contracts/Tournoi.sol";

contract MarcheCanon is TournoiCanon {
    
    struct Enchere {
        address meilleurAcheteur;
        uint256 meilleureOffre;
        uint256 finEnchere;
        uint256 objet;
        address vendeur;
    }
    
    struct EnchereHollandaise {
        address acheteur;
        uint256 prixVendeur;
        uint256 prixFinalVente;
        uint256 finEnchere;
        uint256 objet;
        address vendeur;
    }
    
    // Pour les besoins administrateur
    mapping (address => bool) isAdmin;
    address payable private owner;
    
    constructor () public {
        owner = msg.sender;
        isAdmin[msg.sender] = true;
    }
    
    BouletDeCanon objets;
    mapping (uint => Enchere) public bids;
    mapping (uint => EnchereHollandaise) public bidsHollandaise;
    mapping (address => uint) montantARembourser;
    
    function setAddress(address _address) public {
        require(msg.sender == owner, "Seul le propriétaire du contrat peut effectuer cette opération.");
        objets = BouletDeCanon(_address);
    }
    
    
    function proposerALaVenteClassique(uint objet) public {
        require(_exists(objet), "Cet objet n'existe pas.");
        require(objets.ownerOf(objet) == msg.sender, "Vous n'êtes pas propriétaire de cet objet.");
        
        objets.transferFrom(msg.sender, address(this), objet);
        bids[objet] = Enchere(address(0), 0, block.number+1000, objet, msg.sender);
    }
    
    function proposerALaVenteHollandaise(uint objet, uint prixVendeur) public {
        require(_exists(objet), "Cet objet n'existe pas.");
        require(objets.ownerOf(objet) == msg.sender, "Vous n'êtes pas propriétaire de cet objet.");
        require(prixVendeur > 0, "Vous devez fixer un prix de vente supérieur à 0.");
        
        objets.transferFrom(msg.sender, address(this), objet);
        bidsHollandaise[objet] = EnchereHollandaise(address(0), prixVendeur, 0, block.number+1000, objet, msg.sender);
    }
    
    function offreClassique(uint objet) public payable {
        require(_exists(objet), "Cet objet n'existe pas.");
        require(block.number <= bids[objet].finEnchere, "Enchère terminée.");
        require(msg.value > bids[objet].meilleureOffre, "Une offre supérieure à la votre est déjà disponible pour cet objet.");
        
        montantARembourser[bids[objet].meilleurAcheteur] = bids[objet].meilleureOffre;
        
        // m.a.j. du nouveau meilleur acheteur et de son offre
        bids[objet].meilleureOffre = msg.value;
        bids[objet].meilleurAcheteur = msg.sender;
    }
    
    function offreHollandaise(uint objet) public payable {
        require(_exists(objet), "Cet objet n'existe pas.");
        require(block.number <= bids[objet].finEnchere, "Enchère terminée.");
        
        uint nbBlocks = 1000-(bidsHollandaise[objet].finEnchere - block.number); // Nombre de blocs passés depuis le début de l'enchère
        uint montantReduction = (bidsHollandaise[objet].prixVendeur * nbBlocks)/1000;
        uint prixActuel = bidsHollandaise[objet].prixVendeur - montantReduction;
        
        require(msg.value >= prixActuel, "Votre offre est inférieure au prix de vente de l'objet.");
        
        bidsHollandaise[objet].acheteur = msg.sender;
        bidsHollandaise[objet].prixFinalVente = msg.value;
        bidsHollandaise[objet].finEnchere = block.number-1;
    }
    
    function Remboursement() public {
        require(montantARembourser[msg.sender] > 0, "Vous n'êtes pas éligible à un remboursement.");
        
        msg.sender.transfer(montantARembourser[msg.sender]);
        montantARembourser[msg.sender] = 0;
    }
    
    function recupererObjet(uint objet) public {
        require(_exists(objet), "Cet objet n'existe pas.");
        require(bids[objet].finEnchere < block.number, "Veuillez attendre la fin de l'enchère.");
        
        if (msg.sender == bids[objet].vendeur && bids[objet].meilleurAcheteur == address(0)) {
            objets.transferFrom(address(this), msg.sender, objet);
        }
        
        require(bids[objet].meilleurAcheteur == msg.sender, "Vous n'avez pas gagné l'enchère.");
        
        objets.transferFrom(address(this), msg.sender, objet);
    }
    
    function recupererObjetHollandaise(uint objet) public {
        require(_exists(objet), "Cet objet n'existe pas.");
        require(bidsHollandaise[objet].finEnchere < block.number, "Objet toujours en vente, faites une proposition ou attendez la fin de l'enchère.");
        
        if (msg.sender == bidsHollandaise[objet].vendeur && bidsHollandaise[objet].acheteur == address(0)) {
            objets.transferFrom(address(this), msg.sender, objet);
        }
        
        if (bidsHollandaise[objet].acheteur == msg.sender) {
            objets.transferFrom(address(this), msg.sender, objet);
        }
    }
}