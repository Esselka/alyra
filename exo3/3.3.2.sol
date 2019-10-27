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
    
    Pulsation pulse;

    function provoquerUnePulsation() public {
        pulse.ajouterBattement();
    }
}