pragma solidity ^0.5.11;

pragma experimental ABIEncoderV2;

import "https://github.com/Esselka/alyra/blob/master/d%C3%A9fi%204/contracts/BouletDeCanon.sol";

contract TournoiCanon is BouletDeCanon {
    
    struct Tournoi {
        address payable meilleurLanceur;
        uint256 meilleureDistance;
        uint256 cagnotte;
        bool dejaPaye;
        bool isLive;
        bool resetCanons;
        uint heureFin;
    }
    
    // Pour les besoins administrateur
    mapping (address => bool) isAdmin;
    address payable private owner;
    
    constructor () public {
        owner = msg.sender;
        isAdmin[msg.sender] = true;
    }
    
    BouletDeCanon contratBoulet;
    mapping (address => bool) estParticipant;
    uint256 public numTN = 0;    // Numéro du tournoi en cours
    Tournoi[] tournois;          // Liste des tournois
    uint256[] listeCanonsTire;   // Liste des canons qui ont tiré pendant le tournoi pour les reset à la fin du tournoi
    address[] listeParticipants; // Liste des participants au tournoi pour reset en fin de tournoi
    bool setupContratEffectue;   // La configuration du contrat a t-elle était effectuée ?
    
    function setAddress(address _address) public {
        require(msg.sender == owner, "Seul le propriétaire du contrat peut effectuer cette opération.");
        contratBoulet = BouletDeCanon(_address);
    }
    
    // Pour que l'admin puisse utiliser la fonction creerTournoi() pour la 1ère fois
    function setupContrat() public {
        require(isAdmin[msg.sender] == true, "Seul un administrateur peut effectuer cette action.");
        require(setupContratEffectue == false, "Le contrat est déjà correctement configuré.");
        
        tournois[0].dejaPaye = true;
        tournois[0].isLive = false;
        tournois[0].resetCanons = true;
        setupContratEffectue = true;
    }
    
    function participerTournoi() public payable {
        require(msg.value >= 0.1 ether, "Le prix pour participer au tournoi est de 0.1 ETH.");
        require(estParticipant[msg.sender] == false, "Vous êtes déjà inscrit à ce tournoi.");
        require(tournois[numTN].isLive == true, "Aucun tournoi en cours.");
        
        tournois[numTN].cagnotte += msg.value*95/100; // 5% du prix d'entrée va à la plateforme
        estParticipant[msg.sender] = true;
        listeParticipants.push(msg.sender);
    }
    
    function lancerBouletCanon(uint _canonID) public returns (uint resultatLance) {
        // Vérification que le tournoi n'est pas terminé, si OUI alors on passe le tournoi à non live
        if (block.number > tournois[numTN].heureFin) tournois[numTN].isLive = false;
        
        require(tournois[numTN].isLive == true, "Aucun tournoi en cours.");
        require(estParticipant[msg.sender] == true, "Vous n'êtes pas enregistré à ce tournoi.");
        require(_exists(_canonID), "Ce canon n'existe pas.");
        require(ownerOf(_canonID) == msg.sender, "Ce canon n'est pas à vous.");
        require(joueurs[msg.sender].compteurLance <= 5, "Vous ne pouvez lancer que 5 fois maximum par tournoi.");
        require(canons[_canonID].aTire == false, "Votre canon a déjà tiré dans ce tournoi.");
        
        // Calcul du lance en cours avec ce canon
        uint distanceLance = (uint(blockhash(block.number-1))%100) + 
                             joueurs[msg.sender].niveauJoueur*2 + 
                             canons[_canonID].puissance + 
                             canons[_canonID].rarete*2 + 
                             canons[_canonID].magie*2;
                             
        // Ce lancé est-il le meilleur ? Si oui alors il devient le nouveau meilleur lancé et on mémorise l'adresse du meilleur lanceur                     
        if (distanceLance > tournois[numTN].meilleureDistance) {
            tournois[numTN].meilleureDistance = distanceLance;
            tournois[numTN].meilleurLanceur = msg.sender;
        }
        
        // Mise à jour du meilleur lancé du joueur
        if (distanceLance > joueurs[msg.sender].meilleurLance) joueurs[msg.sender].meilleurLance = distanceLance;
        
        joueurs[msg.sender].xp += 10;                     
        joueurs[msg.sender].compteurLance++;
        canons[_canonID].aTire = true;
        listeCanonsTire.push(_canonID);
        
        return distanceLance;
    }
    
    function recupererPrix() public {
        require(tournois[numTN].isLive == false, "Impossible de récupérer les gains pendant un tournoi.");
        require(tournois[numTN].meilleurLanceur == msg.sender || isAdmin[msg.sender] == true, "Vous nêtes pas le gagnant du tournoi.");
        require(tournois[numTN].dejaPaye == false, "La récompense de ce tournoi a déjà été réclamé.");
        
        tournois[numTN].meilleurLanceur.transfer(tournois[numTN].cagnotte);
        tournois[numTN].dejaPaye = true;
    }
    
    function creerTournoi() public {
        require(setupContratEffectue == true, "Vous devez exécuter la fonction 'setupContrat()' à la création du contrat.");
        require(tournois[numTN].dejaPaye == true, "Vous devez d'abord envoyer l'argent au gagnant du précedent tournoi avant d'en lancer un nouveau.");
        require(isAdmin[msg.sender] == true, "Seul un administrateur peut effectuer cette action.");
        require(tournois[numTN].isLive == false, "Un tournoi est déjà en cours.");
        require(tournois[numTN].resetCanons == true, "Vous devez reset le tournoi avant d'en lancer un nouveau.");
        
        numTN++; // Incrémentation de l'index du tournoi
        
        //Création d'un tournoi d'une durée d'une heure
        tournois[numTN] = Tournoi(address(0), 0, 0, false, true, false, (block.number + 1 hours)/4); // (block.number + 1 hours)/4 -> on divise par 4 car 1 bloc sur kovan = ~4s
    }
    
    function resetTournoi() public {
        require(isAdmin[msg.sender] == true, "Seul un administrateur peut effectuer cette action.");
        require(tournois[numTN].isLive == false, "Un tournoi est déjà en cours.");
        require(tournois[numTN].resetCanons = false, "Le tournoi est déjà reset.");
        
        for (uint i ; i < listeCanonsTire.length ; i++) {
            canons[listeCanonsTire[i]].aTire = false;
        }
        
        for (uint j ; j < listeParticipants.length ; j++) {
            joueurs[listeParticipants[j]].meilleurLance = 0;
            joueurs[listeParticipants[j]].compteurLance = 0;
        }
        
        // reset des listes
        listeCanonsTire.length = 0;
        listeParticipants.length = 0;
        
        tournois[numTN].resetCanons = true;
    }
    
    /* Getter qui retourne un tableau contenant les attributs du joueur à l'adresse indiquée en params
    function getJoueur(address _adresse) public view returns (string memory Pseudo, uint32 xp, uint8 niveauJoueur, bool isRegistered, uint meilleurLance, uint8 compteurLance) {
        return getJoueur(_adresse);
    }
    
    // Getter qui retourne le nombre de lancés d'un joueur
    function getJoueurCompteurLance(address _joueur) public view returns (uint8 compteurLance) {
        return contratBoulet.getJoueurCompteurLance(_joueur);
    }
    
    // Getter qui retourne si un canon a déjà tiré = TRUE, FALSE sinon
    function getCanonATire(uint256 _canonID) public view returns (bool aTire) {
        return contratBoulet.getCanonATire(_canonID);
    }
    
    // Getter qui retourne la puissance d'un canon
    function getCanonPuissance(uint256 _canonID) public view returns (uint256 puissance) {
        return contratBoulet.getCanonPuissance(_canonID);
    }
    
    // Getter qui retourne la rareté d'un canon
    function getCanonRarete(uint256 _canonID) public view returns (uint256 rarete) {
        return contratBoulet.getCanonRarete(_canonID);
    }
    
    // Getter qui retourne la valeur de magie d'un canon
    function getCanonMagie(uint256 _canonID) public view returns (uint256 magie) {
        return contratBoulet.getCanonMagie(_canonID);
    }
    
    // Getter qui retourne le niveau d'un joueur
    function getJoueurNiveau(address _joueur) public view returns (uint8 niveauJoueur) {
        return contratBoulet.getJoueurNiveau(_joueur);
    }
    
    // Getter qui retourne la valeur du meilleur lancé d'un joueur
    function getJoueurMeilleurLance(address _joueur) public view returns (uint meilleurLance) {
        return contratBoulet.getJoueurMeilleurLance(_joueur);
    }
    
    // Setter qui met à jour la valeur du meilleur lancé d'un joueur
    function setJoueurMeilleurLance(address _joueur, uint meilleurLance) public {
        contratBoulet.setJoueurMeilleurLance(_joueur, meilleurLance);
    }
    
    // Setter qui met à jour la valeur de l'xp d'un joueur
    function setJoueurXP(address _joueur, uint32 xp) public {
        contratBoulet.setJoueurXP(_joueur, xp);
    }
    
    // Setter qui définit le nombre de lancés d'un joueur
    function setJoueurCompteurLance(address _joueur, uint8 nbre) public {
        contratBoulet.setJoueurCompteurLance(_joueur, nbre);
    }
    
    // Setter qui incrémente le nombre de lancés de 1
    function setJoueurCompteurLance_plus_un(address _joueur) public {
        contratBoulet.setJoueurCompteurLance_plus_un(_joueur);
    }
    
    // Setter qui définit si un canon a déjà tiré = TRUE, FALSE sinon
    function setCanonATire(uint256 _canonID, bool valeur) public {
        contratBoulet.setCanonATire(_canonID, valeur);
    }
    
    // Getter qui retourne la liste des canons que possède une adresse
    function getListeCanons(address adresseALister) public view returns (uint256[] memory listeDesCanons) {
        return contratBoulet.getListeCanons(adresseALister);
    }*/
}