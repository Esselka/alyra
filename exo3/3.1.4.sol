pragma solidity ^0.5.11;
contract Assemblee {

    address[] membres;
    
    struct Decision {
       string description;
       uint votesPour;
       uint votesContre;
       mapping (address => bool) aVote;
    }
    
    Decision[] decisions;

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

    function proposerDecision(string memory description) public {
        require(estMembre(msg.sender));
            Decision memory proposition;
            proposition.description = description;
            decisions.push(proposition);
    }
    
    function voter(uint voteIndex,bool sens) public {
        require(estMembre(msg.sender));
        
        // Evite les votes multiples
        require(decisions[voteIndex].aVote[msg.sender] == false);
        
        sens == true ? decisions[voteIndex].votesPour++ : decisions[voteIndex].votesPour++;
        decisions[voteIndex].aVote[msg.sender] = true;
    }

    function comptabiliser(uint indice) public view returns (int){
        int proCount = int(decisions[indice].votesPour);
        int conCount = int(decisions[indice].votesContre);
        int res = proCount - conCount;
        return res;
    }
}
