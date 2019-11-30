pragma solidity ^0.5.11;

pragma experimental ABIEncoderV2;

import "https://github.com/Esselka/alyra/blob/master/d%C3%A9fi%204/BouletDeCanon.sol";

contract Tournoi is BouletDeCanon {
    
    struct Tournoi {
        address payable meilleurLanceur;
        uint256 meilleureDistance;
        uint256 cagnotte;
        bool dejaPaye;
        bool isLive;
        uint heureFin;
    }
    
    mapping (address => bool) estParticipant;
    uint256 public numTN = 0; // Numéro du tournoi en cours
    Tournoi[] tournois;
    
    constructor () public {
        // Pour que l'admin puisse utiliser la fonction creerTournoi() pour la 1ère fois, il faut que le tournoi en cours soit dejaPaye = true
        tournois[numTN] = Tournoi(address(0), 0, 0, true, false, 0); 
    }
    
    function participerTournoi() public payable {
        require(joueurs[msg.sender].isRegistered == true, "Vous n'êtes pas enregistré à la plateforme.");
        require(msg.value >= 0.1 ether, "Le prix pour participer au tournoi est de 0.1 ETH.");
        require(estParticipant[msg.sender] == false, "Vous êtes déjà inscrit à ce tournoi.");
        require(tournois[numTN].isLive == true, "Aucun tournoi en cours.");
        
        tournois[numTN].cagnotte += msg.value*95/100; // 5% du prix d'entrée va à la plateforme
        estParticipant[msg.sender] = true;
    }
    
    function lancerBouletCanon(uint _canonID) public returns (uint resultatLance) {
        // Vérification que le tournoi n'est pas terminé, si OUI alors on passe le tournoi à non live
        if (block.number > tournois[numTN].heureFin) tournois[numTN].isLive = false;
        
        require(tournois[numTN].isLive == true, "Aucun tournoi en cours.");
        require(joueurs[msg.sender].isRegistered == true, "Vous n'êtes pas enregistré à la plateforme.");
        require(estParticipant[msg.sender] == true, "Vous n'êtes pas enregistré à ce tournoi.");
        require(_exists(_canonID), "Ce canon n'existe pas.");
        require((ownerOf(_canonID) == msg.sender), "Ce canon n'est pas à vous.");
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
        
        return distanceLance;
    }
    
    function recupererPrix() public {
        require(tournois[numTN].isLive == false, "Impossible de récupérer les gains pendant un tournoi.");
        require(tournois[numTN].meilleurLanceur == msg.sender || isAdmin[msg.sender] == true, "Vous nêtes pas le gagnant du tournoi.");
        require(tournois[numTN].dejaPaye == false, "La récompense de ce tournoi a déjà été réclamé.");
        
        tournois[numTN].meilleurLanceur.transfer(tournois[numTN].cagnotte);
        tournois[numTN].dejaPaye = true;
    }
    
    function creerTournoi () public {
        require(tournois[numTN].dejaPaye == true, "Vous devez d'abord envoyer l'argent au gagnant du précedent tournoi avant d'en lancer un nouveau.");
        require(isAdmin[msg.sender] == true, "Seul un administrateur peut effectuer cette action.");
        require(tournois[numTN].isLive == false, "Un tournoi est déjà en cours.");
        
        numTN++; // Incrémentation de l'index du tournoi
        
        //Création d'un tournoi d'une durée d'une heure
        tournois[numTN] = Tournoi(address(0), 0, 0, false, true, (block.number + 1 hours)/4); // (block.number + 1 hours)/4 -> on divise par 4 car 1 bloc sur kovan = ~4s
    }
}