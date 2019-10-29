pragma solidity >=0.5.12 <0.6.0;
pragma experimental ABIEncoderV2;

contract Marketplace {
    
    enum Etat { OUVERTE, ENCOURS, FERMEE }
    
    struct Participant {
        string nom;
        mapping (address => uint) reputation;
        bool dejaInscrit;
    }
    
    struct Demande {
        uint remuneration;           // Valeur en wei
        uint delaiDepuisAcceptation; // Le délai à compter de l’acceptation (en secondes)
        string description;          // Une description de la tâche à mener (champ texte)
        Etat etat;                   // Etat de la demande : OUVERTE, ENCOURS ou FERMEE
        uint minReputation;          // Réputation minimum pour pouvoir postuler
        address[] candidats;          // Une liste de candidats
    }
    
    Participant participants;
    string[] demandesEtOffres;
    
    function inscription(string memory nom) public {
        require(participants.dejaInscrit == false, "Vous êtes déjà inscrit");
        participants.reputation[msg.sender] = 1;
        participants.nom = nom;
        participants.dejaInscrit = true;
        
    }
}