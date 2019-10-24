pragma solidity ^0.5.11;

contract CagnotteFestival {
    
    mapping (address => uint) organisateurs;
    
    constructor() public {
        organisateurs[msg.sender] = 100;
    }
    
    function estOrga(address orga) public view returns (bool){
        // Si l'adresse 'orga' possède au moins 1 part, alors c'est un organisateur
        return organisateurs[orga] > 0 ? true : false;
    }
    
    function transfererOrga(address orga, uint parts) public {
        require(estOrga(msg.sender), "Vous devez être organisateur pour effectuer cette opération");
        require(organisateurs[msg.sender] >= parts, "Vous essayez de transférer plus de parts que vous n'en possédez");
        
        organisateurs[orga] += parts;
        organisateurs[msg.sender] -= parts;
    }
}