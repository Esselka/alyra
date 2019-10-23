pragma solidity ^0.5.11;
contract Assemblee {
    
    constructor(string memory nom) public {
        nomAssemblee = nom;
        admins.adresses.push(msg.sender);
        admins.isAdmin[msg.sender] = true;
    }

    string public nomAssemblee;
    Membre membres;
    Administrateur admins;
    Decision[] decisions;
    
    struct Membre {
        address[] adresses;
        mapping (address => uint) blame;
    }

    struct Administrateur {
       address[] adresses;
       mapping (address => bool) isAdmin;
    }
    
    struct Decision {
       string description;
       uint votesPour;
       uint votesContre;
       mapping (address => bool) aVote;
       bool isOpenToVotes; // Une décision est-elle ouverte aux votes ?
    }

    function rejoindre() public {
        membres.adresses.push(msg.sender);
    }

    function estMembre(address utilisateur) public view returns (bool) {
        bool isMember = false;
        
        // Si un membre a 2 blames, il est expulsé et n'est donc plus un membre
        if(membres.blame[utilisateur] < 2) {
            for (uint i = 0; i<membres.adresses.length; i++) {
                if (utilisateur == membres.adresses[i]) isMember = true;
            }
        }
        return isMember;
    }

    function proposerDecision(string memory description) public {
        require(estMembre(msg.sender), "Vous n'êtes pas un membre ou bien vous avez été expulsé par un admin");
        Decision memory proposition;
        proposition.description = description;
        proposition.isOpenToVotes = true;
        decisions.push(proposition);
    }
    
    function voter(uint voteIndex,bool sens) public {
        require(estMembre(msg.sender), "Vous n'êtes pas un membre ou bien vous avez été expulsé par un admin");
        require(decisions[voteIndex].aVote[msg.sender] == false, "Vous avez déjà voté"); // Evite les votes multiples
        require(decisions[voteIndex].isOpenToVotes == true, "Ce vote a été fermé par un administrateur"); // La décision doit être ouverte aux votes
        
        sens == true ? decisions[voteIndex].votesPour++ : decisions[voteIndex].votesPour++;
        decisions[voteIndex].aVote[msg.sender] = true;
    }

    function comptabiliser(uint indice) public view returns (int){
        int proCount = int(decisions[indice].votesPour);
        int conCount = int(decisions[indice].votesContre);
        int res = proCount - conCount;
        return res;
    }
    
    function nommerAdmin(address adresseNouvelAdmin) public {
        require(admins.isAdmin[msg.sender] == true, "Vous devez être administrateur pour effectuer cette opération");
        admins.adresses.push(adresseNouvelAdmin);
        admins.isAdmin[adresseNouvelAdmin] == true;
    }
    
    function demissionnerAdmin() public {
        require(admins.isAdmin[msg.sender] == true, "Vous devez être administrateur pour effectuer cette opération");
        
        // Il faut au moins 2 admins pour pouvoir démissionner
        require(admins.adresses.length > 1, "Vous êtes le seul admin, vous ne pouvez pas démissionner");
        
        admins.isAdmin[msg.sender] == false;
    }
    
    function fermerDecision(uint voteIndex) public {
        require(admins.isAdmin[msg.sender] == true, "Vous devez être administrateur pour effectuer cette opération");
        
        decisions[voteIndex].isOpenToVotes == false;
    }
    
    function ajouterBlame(address adresseMembre) public {
        require(admins.isAdmin[msg.sender] == true, "Vous devez être administrateur pour effectuer cette opération");
        
        membres.blame[adresseMembre]++;
    }
}
