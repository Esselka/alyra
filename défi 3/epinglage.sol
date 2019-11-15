pragma solidity ^0.5.11;

contract Epinglage {
    
    mapping (address => bool) isAdmin;
    address payable private addrAdmin;
    
    constructor() public {
        addrAdmin = msg.sender;
        isAdmin[addrAdmin] = true;
    }
    
    event Epingler(string IDENTIFIANT);
    
    function payerStockage(string memory IDENTIFIANT) public payable {
        require(msg.value >= 0.1 ether, "Le montant minimum est de 0.1 Ether");
        addrAdmin.transfer(msg.value);
        emit Epingler(IDENTIFIANT);
    }
    
    // Récupérer les fonds qu'il reste à l'adresse du contrat à sa destruction
    function detruireContrat() public {
        require(isAdmin[msg.sender] == true, "Vous n'êtes pas autorisé à détruire le contrat");
        selfdestruct(addrAdmin);
    }
}