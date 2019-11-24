pragma solidity ^0.5.11;

interface ObjetsMagiquesInterface {
    
    event Transfer(address indexed _from, address indexed _to, uint256 tokenID);

    function balanceOf(address owner) external returns (uint256 balance);
    function ownerOf(uint256 tokenID) external view returns (address owner);
    function exists(uint256 tokenID) external view returns (bool exists);

    function transferFrom(address from, address to, uint256 tokenID) external;
    function creuser() external;
    function utiliser(uint256 tokenID) external returns (uint256 tirage);
}

contract Bazar {
    
    struct Enchere {
        address meilleurAcheteur;
        uint256 meilleureOffre;
        uint256 finEnchere;
        uint256 objet;
        address vendeur;
    }
    
    ObjetsMagiquesInterface objets;
    mapping (uint => Enchere) public offre;
    
    constructor (ObjetsMagiquesInterface objetsContrat) public {
        objets = objetsContrat;
    }
    
    function proposerALaVente(uint objet) public {
        require(objets.exists(objet), "Cet objet n'existe pas.");
        require(objets.ownerOf(objet) == msg.sender, "Vous n'êtes pas propriétaire de cet objet.");
        
        objets.transferFrom(msg.sender, address(this), objet);
        offre[objet] = Enchere(address(0), 0, block.number+1000, objet, msg.sender);
    }
}