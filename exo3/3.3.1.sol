pragma solidity ^0.5.11;

contract Pulsation {
    
    uint public battement;
    
    constructor() public {
        battement = 0;
    }
    
    function ajouterBattement() public {
        battement++;
    }
}