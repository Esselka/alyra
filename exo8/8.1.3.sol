pragma solidity ^ 0.5.0;

contract CanalDePaiement {
    enum EtatCanal { VIDE, ACTIF, ENCOURSFERMETURE, FERME }
    
    address partieA;
    address partieB;
    uint montant;
    EtatCanal etat;
    uint blocFermeture; 
    uint dernierNonce;
    uint equilibreA;
    uint equilibreB;
    
    constructor(address _partieA, address _partieB, uint _montant) public {
        partieA = _partieA;
        partieB = _partieB;
        montant = _montant;
    }
    
    function financer() payable public {
        require(msg.value >= montant, "Montant trop faible.");
        require(msg.sender == partieA || msg.sender == partieB, "Vous n'êtes pas autorisé à utiliser ce canal de paiement.");
        
        if(msg.sender == partieA) equilibreA = msg.value;
        if(msg.sender == partieB) equilibreB = msg.value;
        
        if(equilibreA >= montant && equilibreB >= montant) etat = EtatCanal.ACTIF;
    }
    
    function message(uint _dernierNonce, uint _equilibreA, uint _equilibreB) public pure returns (bytes32 MSG) {
        return keccak256(abi.encodePacked(_dernierNonce, _equilibreA, _equilibreB));
    }
}