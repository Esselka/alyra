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
    Pulsation contratTic;
    Pulsation contratTac;
    string[] public balancier;

    function provoquerUnePulsation() public {
        pulse.ajouterBattement();
    }
    
    function ajouterTicTac(Pulsation Tic, Pulsation Tac) public {
        contratTic = Tic;
        contratTac = Tac;
    }
    
    function mouvementsBalancier() public {
        balancier.push(contratTic.ajouterBattement());
        balancier.push(contratTac.ajouterBattement());
    }
}