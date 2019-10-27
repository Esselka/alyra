pragma solidity ^0.5.11;

contract Pulsation {
    
    uint public battement;
    string private message;
    
    constructor(string memory unMessage) public {
        battement = 0;
        message = unMessage;
    }
    
    function ajouterBattement() public returns (string memory) {
        battement++;
        return message;
    }
}

contract Pendule  {
    
    Pulsation contratTic;
    Pulsation contratTac;
    string[] public balancier;
    
    function ajouterTicTac() public {
        contratTic = new Pulsation("Tic");
        contratTac = new Pulsation("Tac");
    }
    
    function mouvementsBalancier(uint k) public {
        for(uint i = 0 ; i < k ; i++) {
            balancier.push(contratTic.ajouterBattement());
            balancier.push(contratTac.ajouterBattement());
        }
    }
}