pragma solidity ^0.5.11;

contract Pulsation {
    
    uint public battement;
    string private message;
    uint public nombre;
    
    constructor(string memory unMessage) public {
        battement = 0;
        message = unMessage;
    }
    
    function ajouterBattement() public returns (string memory) {
        battement++;
        
        // Renvoie "Criii" 10% du temps au lieu du message
        return random10Pourcent() >= 10 ? message : "Criii";
    }
    
    function random10Pourcent () public returns (uint) {
        nombre = (uint(blockhash(block.number-1)))%99;
        return nombre;
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
            balancier.length % 2 == 0 ? balancier.push(contratTic.ajouterBattement()) : balancier.push(contratTac.ajouterBattement());
        }
    }
    
    function compareStringsbyBytes(string memory s1, string memory s2) internal pure returns(bool) {
        return keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2));
    }
    
    function inspection() public view returns (uint indexErreur) {
        for(uint i = 0 ; i < balancier.length; i++) {
            if(compareStringsbyBytes(balancier[i], "Criii")) return i;
        }
        return 55250; // 55250 est mon code pour dire qu'il n'y a pas d'erreur ici
    }
}