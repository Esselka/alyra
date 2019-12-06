pragma solidity ^0.5.11;

pragma experimental ABIEncoderV2;

import "https://github.com/Esselka/alyra/blob/master/d%C3%A9fi%204/contracts/IBDC.sol";

contract TournoiCanon is BouletDeCanonInterface {
    
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
    
    constructor (BouletDeCanonInterface interfaceBouletDeCanon) public {
        owner = msg.sender;
        isAdmin[msg.sender] = true;
        bdci = interfaceBouletDeCanon;
    }
    
    BouletDeCanonInterface bdci;
    mapping (address => bool) estParticipant;
    uint256 public numTN = 0;    // Numéro du tournoi en cours
    Tournoi[] tournois;          // Liste des tournois
    uint256[] listeCanonsTire;   // Liste des canons qui ont tiré pendant le tournoi pour les reset à la fin du tournoi
    address[] listeParticipants; // Liste des participants au tournoi pour reset en fin de tournoi
    bool setupContratEffectue;   // La configuration du contrat a t-elle était effectuée ?
    
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
    
    function lancerBouletCanon(uint tokenID) public returns (uint resultatLance) {
        // Vérification que le tournoi n'est pas terminé, si OUI alors on passe le tournoi à non live
        if (block.number > tournois[numTN].heureFin) tournois[numTN].isLive = false;
        
        require(tournois[numTN].isLive == true, "Aucun tournoi en cours.");
        require(estParticipant[msg.sender] == true, "Vous n'êtes pas enregistré à ce tournoi.");
        require(bdci._exists(tokenID), "Ce canon n'existe pas.");
        require(bdci.ownerOf(tokenID) == msg.sender, "Ce canon n'est pas à vous.");
        require(getCompteurLance(msg.sender) < 5, "Vous ne pouvez lancer que 5 fois maximum par tournoi.");
        require(getCanonATire(tokenID) == false, "Votre canon a déjà tiré dans ce tournoi.");
        
        // Calcul du lance en cours avec ce canon
        uint distanceLance = (uint(blockhash(block.number-1))%100) + 
                             getNiveauJoueur(msg.sender)*2 + 
                             getCanonPuissance(tokenID) + 
                             getCanonRarete(tokenID)*2 + 
                             getCanonMagie(tokenID)*2;
                             
        // Ce lancé est-il le meilleur ? Si oui alors il devient le nouveau meilleur lancé et on mémorise l'adresse du meilleur lanceur                     
        if (distanceLance > tournois[numTN].meilleureDistance) {
            tournois[numTN].meilleureDistance = distanceLance;
            tournois[numTN].meilleurLanceur = msg.sender;
        }
        
        // Mise à jour du meilleur lancé du joueur
        if (distanceLance > getMeilleurLance(msg.sender)) bdci.setMeilleurLanceJoueur(msg.sender, distanceLance);
        
        bdci.setAjoutXpJoueur(msg.sender, 10);
        bdci.setCompteurLanceIncrement(msg.sender);
        bdci.setCanonATire(tokenID, true);
        listeCanonsTire.push(tokenID);
        
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
            bdci.setCanonATire(listeCanonsTire[i], false);
        }
        
        for (uint j ; j < listeParticipants.length ; j++) {
            bdci.setMeilleurLanceJoueur(listeParticipants[j], 0);
            bdci.setCompteurLance(listeParticipants[j], 0);
        }
        
        // reset des listes
        listeCanonsTire.length = 0;
        listeParticipants.length = 0;
        
        tournois[numTN].resetCanons = true;
    }
    
    function getCompteurLance(address adresseJoueur) private view returns (uint8 compteur) {
        (string memory Pseudo, uint32 xp, uint8 niveauJoueur, bool isRegistered, uint meilleurLance, uint8 compteurLance) = bdci.getJoueur(adresseJoueur);
        return compteurLance;
    }
    
    function getMeilleurLance(address adresseJoueur) private view returns (uint meilleurLanceJoueur) {
        (string memory Pseudo, uint32 xp, uint8 niveauJoueur, bool isRegistered, uint meilleurLance, uint8 compteurLance) = bdci.getJoueur(adresseJoueur);
        return meilleurLance;
    }
    
    function getNiveauJoueur(address adresseJoueur) private view returns (uint8 niveau) {
        (string memory Pseudo, uint32 xp, uint8 niveauJoueur, bool isRegistered, uint meilleurLance, uint8 compteurLance) = bdci.getJoueur(adresseJoueur);
        return niveauJoueur;
    }
    
    function getCanonATire(uint256 tokenID) private view returns (bool canonATire) {
        (uint256 puissance, uint256 rarete, uint256 magie, bool aTire) = bdci.getCanon(tokenID);
        return aTire;
    }
    
    function getCanonPuissance(uint256 tokenID) private view returns (uint256 puissanceCanon) {
        (uint256 puissance, uint256 rarete, uint256 magie, bool aTire) = bdci.getCanon(tokenID);
        return puissance;
    }
    
    function getCanonRarete(uint256 tokenID) private view returns (uint256 rareteCanon) {
        (uint256 puissance, uint256 rarete, uint256 magie, bool aTire) = bdci.getCanon(tokenID);
        return rarete;
    }
    
    function getCanonMagie(uint256 tokenID) private view returns (uint256 magieCanon) {
        (uint256 puissance, uint256 rarete, uint256 magie, bool aTire) = bdci.getCanon(tokenID);
        return magie;
    }
}