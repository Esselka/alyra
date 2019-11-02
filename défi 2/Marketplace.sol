pragma solidity >=0.5.11 <0.6.0;
pragma experimental ABIEncoderV2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";

contract Marketplace {
    
    using SafeMath for uint256;
    
    enum Etat { OUVERTE, ENCOURS, FERMEE, REFUSEE } // Etat de la demande : OUVERTE, ENCOURS, FERMEE ou REFUSEE
    
    struct Utilisateur {
        string nom;
        uint reputation;
        bool estInscrit; // Pour éviter de redéfinir la réputation à 1
        bool isAdmin;
    }
    
    struct Demande {
        uint remuneration;    // Valeur en wei
        uint delaiMax;        // Le délai à compter de l’acceptation (en secondes) + le délai du demandeur (en secondes)
        uint dateRemise;      // Date à laquelle un illustrateur remet son travail
        string description;   // Une description de la tâche à mener (champ texte)
        address illustrateur; // Adresse de l'illustrateur
        bytes32 hashUrl;      // Le hash de l'adresse du lien où se trouve le travail de l'illustrateur
        Etat etat;            // Etat de la demande : OUVERTE, ENCOURS ou FERMEE
        uint minReputation;   // Réputation minimum pour pouvoir postuler
        address[] candidats;  // Une liste de candidats
        address demandeur;    // L'adresse du demandeur sur la plateforme
    }
    
    mapping (address => bool) estBanni;                   // Si un admin banni un compte, passe à true
    mapping (address => Utilisateur) public utilisateurs;
    mapping (address => bool) reclamerRemuneration;       // Doit être true pour pouvoir réclamer sa rémunération
    Demande[] public demandes;
    
    // Celui qui déploie le contrat est administrateur et s'appelle Admin
    constructor() public {
        utilisateurs[msg.sender].isAdmin = true;
        utilisateurs[msg.sender].nom = "Admin";
        utilisateurs[msg.sender].reputation = 1;
    }
    
    function listerDemandes() public view returns (Demande[] memory) {
        return demandes;
    }
    
    function inscription(string memory nom) public {
        require(estBanni[msg.sender] == false, "Votre compte a été banni, veuillez contacter un administrateur pour plus d'informations.");
        require(utilisateurs[msg.sender].estInscrit == false, "Vous êtes déjà inscrit.");
        utilisateurs[msg.sender].reputation = 1;
        utilisateurs[msg.sender].nom = nom;
        utilisateurs[msg.sender].estInscrit = true;
    }
    
    function ajouterDemande(uint remuneration, uint delaiEnSecondes, string memory description, uint minReputation) public payable {
        require(estBanni[msg.sender] == false, "Votre compte a été banni, veuillez contacter un administrateur pour plus d'informations.");
        require(msg.value == remuneration * 102 / 100, "Veuillez déposer le montant de la rémunération + 2% de frais pour la plateforme, merci.");
        Demande memory nouvelleDemande;
        nouvelleDemande.remuneration = remuneration / 102 * 100; // Récupération de la rémunération sans les frais
        nouvelleDemande.demandeur = msg.sender;
        nouvelleDemande.description = description;
        nouvelleDemande.minReputation = minReputation;
        nouvelleDemande.delaiMax = delaiEnSecondes;
        nouvelleDemande.etat = Etat.OUVERTE;
        demandes.push(nouvelleDemande);
    }
    
    function postuler(uint indexDemande) public {
        require(estBanni[msg.sender] == false, "Votre compte a été banni, veuillez contacter un administrateur pour plus d'informations.");
        require(utilisateurs[msg.sender].estInscrit == true, "Vous devez être inscrit pour pouvoir postuler.");
        require(utilisateurs[msg.sender].reputation >= demandes[indexDemande].minReputation, "Votre réputation n'est pas suffisante pour postuler.");
        require(demandes[indexDemande].etat == Etat.OUVERTE, "Vous ne pouvez postuler que pour une demande en cours d'acceptation.");
        demandes[indexDemande].candidats.push(msg.sender); // Ajout du candidat à la liste des candidats pour la demande[index]
    }
    
    function accepterOffre(uint indexDemande, uint indexCandidat) public {
        require(estBanni[msg.sender] == false, "Votre compte a été banni, veuillez contacter un administrateur pour plus d'informations.");
        require(demandes[indexDemande].etat == Etat.OUVERTE, "La demande doit être OUVERTE pour l'accepter.");
        demandes[indexDemande].etat = Etat.ENCOURS;
        demandes[indexDemande].delaiMax = now + demandes[indexDemande].delaiMax;
        demandes[indexDemande].illustrateur = demandes[indexDemande].candidats[indexCandidat]; // Un candidat devient illustrateur après acceptation
    }
    
    function livraison(bytes32 hash, uint indexDemande) public {
        require(estBanni[msg.sender] == false, "Votre compte a été banni, veuillez contacter un administrateur pour plus d'informations.");
        require(utilisateurs[msg.sender].estInscrit == true, "Vous devez être inscrit pour pouvoir remettre une illustration.");
        require(hash != "0x0", "Veuillez rentrer une adresse valide.");
        require(demandes[indexDemande].illustrateur == msg.sender, "Vous n'êtes pas l'illustrateur de cette demande.");
        demandes[indexDemande].dateRemise = now;
        demandes[indexDemande].hashUrl = hash;
    }
    
    function obtenirHash(string memory url) public pure returns (bytes32 Hash) {
       bytes32 hash = keccak256(bytes(url));
       return hash;
    }
    
    function validerTravail(uint indexDemande, uint indexCandidat) public {
        require(estBanni[msg.sender] == false, "Votre compte a été banni, veuillez contacter un administrateur pour plus d'informations.");
        require(demandes[indexDemande].demandeur == msg.sender, "Vous n'êtes pas l'auteur de la demande.");
        // L'illustrateur peut réclamer sa rémunération et gagne 1pt de réputation
        reclamerRemuneration[demandes[indexDemande].candidats[indexCandidat]] = true;
        demandes[indexDemande].etat = Etat.FERMEE;
        // Adresse du candidat
        address adresseCandidat = demandes[indexDemande].candidats[indexCandidat]; 
        utilisateurs[adresseCandidat].reputation++;
    }
    
    function refuserTravail(uint indexDemande) public {
        require(estBanni[msg.sender] == false, "Votre compte a été banni, veuillez contacter un administrateur pour plus d'informations.");
        require(demandes[indexDemande].demandeur == msg.sender, "Vous n'êtes pas l'auteur de la demande.");
        demandes[indexDemande].etat = Etat.REFUSEE;
    }
    
    function reclamerSalaire(uint indexDemande) public payable {
        require(estBanni[msg.sender] == false, "Votre compte a été banni, veuillez contacter un administrateur pour plus d'informations.");
        require(demandes[indexDemande].illustrateur == msg.sender, "Vous n'êtes pas l'illustrateur de ce travail.");
        require(demandes[indexDemande].etat != Etat.REFUSEE, "Votre travail a été refusé.");
        
        // Si l'illustrateur a remis son travail depuis au moins 7 jours, le travail est automatiquement validé
        if(demandes[indexDemande].dateRemise + 7 days <= now) {
            reclamerRemuneration[msg.sender] = true;
            demandes[indexDemande].etat = Etat.FERMEE;
            utilisateurs[msg.sender].reputation++;
        }
        
        require(demandes[indexDemande].etat == Etat.FERMEE);
        require(reclamerRemuneration[msg.sender] == true, "Pour demander votre rémunération, le demandeur doit valider votre travail.");
        
        msg.sender.transfer(demandes[indexDemande].remuneration);
    }
    
    function bannirUtilisateur(address mechant) public {
        require(utilisateurs[msg.sender].isAdmin == true, "Seul un admin peut bannir un utilisateur.");
        estBanni[mechant] = true;
    }
    
    function donnerDroitAdmin(address adresseDuNouvelAdmin) public {
        require(utilisateurs[msg.sender].isAdmin == true, "Vous n'êtes pas un administrateur de la plateforme.");
        utilisateurs[adresseDuNouvelAdmin].isAdmin = true;
    }
}