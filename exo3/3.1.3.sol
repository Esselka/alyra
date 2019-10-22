pragma solidity ^0.5.11;
contract Assemblee {

    address[] membres;
    string[] descriptionDecisions;
    uint[] votesPour;
    uint[] votesContre;

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
        if(estMembre(msg.sender)){
            descriptionDecisions.push(description);
            votesPour.push(0);
            votesContre.push(0);
        }
    }

    function voter(uint vote,bool sens) public {
        if(estMembre(msg.sender)) {
            if(sens == true) {
                votesPour[vote]++;
            }
            else {
                votesContre[vote]++;
            }
        }
    }

    function comptabiliser(uint indice) public view returns (int){
        int proCount = int(votesPour[indice]);
        int conCount = int(votesContre[indice]);
        int res = proCount - conCount;
        return res;
    }
}
