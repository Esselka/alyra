pragma solidity ^0.5.11;
contract Assemblee {

    address[] membres;

    function rejoindre() public {
    membres.push(msg.sender);
    }

    function estMembre(address utilisateur) public view returns (bool) {
        bool isMember = false;
        for (uint i = 0; i<membres.length; i++) {
            if (utilisateur == membres[i]) {
                isMember = true;
            }
            return isMember;
        }
    }
}