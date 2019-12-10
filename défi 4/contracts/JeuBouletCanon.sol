pragma solidity ^0.5.11;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";

contract IERC721 {
    event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
    
    function balanceOf(address _owner) public view returns (uint256 balance);
    function ownerOf(uint256 _tokenId) public view returns (address _owner);
    function exists(uint256 _tokenId) public view returns (bool Exists);
    function transferFrom(address _from, address _to, uint256 _tokenId) public;
    function _mint(address to, uint256 tokenId) internal;
}

contract BouletDeCanon is IERC721 {
    using SafeMath for uint256;
    
    struct Canon {
        uint256 puissance; // Puissance du canon
        uint256 rarete;    // Rarete du canon
        uint256 magie;     // Puissance magique du canon
        bool aTire;        // Le canon a t-il déjà tiré son boulet ? True = oui, false sinon
    }
    
    struct Joueur {
        string Pseudo;       // Pseudo du joueur
        uint32 xp;           // Expérience du joueur
        uint8 niveauJoueur;  // Niveau du joueur permettant de lancer le boulet plus loin
        bool isRegistered;   // True si enregistré, false sinon
        uint meilleurLance;  // Meilleur lancé du joueur en mètre
        uint8 compteurLance; // Nombre de lancé du joueur
    }
    
    function statsJoueur(address Adresse) public view returns (string memory Pseudo, uint32 xp, uint8 niveauJoueur, uint meilleurLance, uint8 compteurLance) {
        return (joueurs[Adresse].Pseudo, joueurs[Adresse].xp, joueurs[Adresse].niveauJoueur, joueurs[Adresse].meilleurLance, joueurs[Adresse].compteurLance);
    }
    
    // Mapping from token ID to owner
    mapping (uint256 => address) _tokenOwner;

    // Mapping from owner to number of owned token
    mapping (address => uint256) _ownedTokensCount;
    
    // Mapping qui permet de connaître la liste des canons possédés par une adresse
    mapping (address => uint256[]) listeCanonsAdresse;
    
    // Mapping qui permet d'accéder aux attributs des canons via leur ID
    mapping (uint256 => Canon) canons;
    
    // Mapping qui permet d'accéder aux attributs des joueurs via leur adresse
    mapping (address => Joueur) joueurs;
    
    // Tableau des niveaux des joueurs en fonction dez leur xp
    uint32[10] xpJoueur = [ 50, 120, 290, 690, 1650, 4000, 9600, 23000, 55000, 140000 ];
    
    function sEnregistrer(string memory votrePseudo) public {
        require(joueurs[msg.sender].isRegistered == false, "Vous êtes déjà enregistré.");
        
        joueurs[msg.sender] = Joueur(votrePseudo, 0, 0, true, 0, 0);
    }
    
    function listerMesCanons() public view returns (uint256[] memory Liste) {
        return listeCanonsAdresse[msg.sender];
    }
    
    function creerCanon() public payable returns (uint256 ID, uint256 puissance, uint256 rarete, uint256 magie) {
        require(joueurs[msg.sender].isRegistered == true,"Vous n'êtes pas enregistré à la plateforme.");
        require(msg.value >= 0.1 ether, "Vous devez payer 0.1 ETH au minimum pour créer un canon.");
        require(balanceOf(msg.sender) < 5, "Vous ne pouvez posséder que 5 canons maximum.");
        
        uint256 tokenID = (uint(blockhash(block.number-1))%1000);
        require(!(exists(tokenID)), "Le canon trouvé existe déjà, veuillez recommencer." );
        
        listeCanonsAdresse[msg.sender].push(tokenID);
        _mint(msg.sender, tokenID);
        
        canons[tokenID].puissance = tokenID%1000/100 <= 3 ? 10 :  tokenID%1000/100 <= 6 ? 20 : tokenID%1000/100 <= 8 ? 35 : 50;
        canons[tokenID].rarete = tokenID%100/10 <= 3 ? 0 :  tokenID%100/10 <= 6 ? 1 : tokenID%100/10 <= 8 ? 2 : 3;
        canons[tokenID].magie = tokenID%10;
        
        return (tokenID, canons[tokenID].puissance, canons[tokenID].rarete, canons[tokenID].magie);
    }
    
    function updateNiveauJoueur() public {
        require(joueurs[msg.sender].isRegistered == true, "Vous n'êtes pas enregistré.");
        
        joueurs[msg.sender].niveauJoueur =  joueurs[msg.sender].xp < xpJoueur[0] ? 0 : 
                                            joueurs[msg.sender].xp < xpJoueur[1] ? 1 : 
                                            joueurs[msg.sender].xp < xpJoueur[2] ? 2 : 
                                            joueurs[msg.sender].xp < xpJoueur[3] ? 3 : 
                                            joueurs[msg.sender].xp < xpJoueur[4] ? 4 : 
                                            joueurs[msg.sender].xp < xpJoueur[5] ? 5 : 
                                            joueurs[msg.sender].xp < xpJoueur[6] ? 6 : 
                                            joueurs[msg.sender].xp < xpJoueur[7] ? 7 : 
                                            joueurs[msg.sender].xp < xpJoueur[8] ? 8 : 
                                            joueurs[msg.sender].xp < xpJoueur[9] ? 9 : 10;
    }

    // Pour supprimer un élément de la liste des canons possédés par une adresse
    function removeCanon(address addr, uint256 tokenId) internal {
        for (uint i = 0 ; i < listeCanonsAdresse[addr].length ; i++) {
            if (listeCanonsAdresse[addr][i] == tokenId) {
                delete listeCanonsAdresse[addr][i];
            }
        }
    }
    
    function balanceOf(address _owner) public view returns (uint256 balance){
        return _ownedTokensCount[_owner];
    }
    
    function ownerOf(uint256 _tokenId) public view returns (address _owner){
        require(exists(_tokenId));
        return _tokenOwner[_tokenId];
    }
    
     function exists(uint256 _tokenId) public view returns (bool Exist){
        return _tokenOwner[_tokenId] != address(0);
    }
    
    function transferFrom(address from, address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == from, "ERC721: transfer of token that is not own");
        require(to != address(0), "ERC721: transfer to the zero address");

        _ownedTokensCount[from]--;
        _ownedTokensCount[to]++;

        _tokenOwner[tokenId] = to;
        
        removeCanon(from, tokenId);
        listeCanonsAdresse[to].push(tokenId);
        

        emit Transfer(from, to, tokenId);
    }
    
    function _mint(address to, uint256 tokenId) internal {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!exists(tokenId), "ERC721: token already minted");

        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to]++;

        emit Transfer(address(0), to, tokenId);
    }
}

contract MarketPlace is BouletDeCanon {
    using SafeMath for uint256;
    
    struct Enchere {
        address meilleurAcheteur;
        uint256 meilleureOffre;
        uint256 finEnchere;
        uint256 objet;
        address vendeur;
    }
    
    struct EnchereHollandaise {
        address acheteur;
        uint256 prixVendeur;
        uint256 prixFinalVente;
        uint256 finEnchere;
        uint256 objet;
        address vendeur;
    }
    
    // Mapping qui permet d'accéder aux attributs des Enchères via leur identifiant
    mapping (uint => Enchere) public bids;
    mapping (uint => EnchereHollandaise) public bidsHollandaise;
    
    // Mapping qui permet de connaître le montant à rembourser à une adresse
    mapping (address => uint) montantARembourser;
    
    function proposerALaVenteClassique(uint256 objet) public {
        require(exists(objet), "Cet objet n'existe pas.");
        require(ownerOf(objet) == msg.sender, "Vous n'êtes pas propriétaire de cet objet.");
        
        transferFrom(msg.sender, address(this), objet);
        bids[objet] = Enchere(address(0), 0, block.number+(5 minutes/4), objet, msg.sender); // 5 minutes pour les tests
    }
    
    function proposerALaVenteHollandaise(uint objet, uint prixVendeur) public {
        require(exists(objet), "Cet objet n'existe pas.");
        require(ownerOf(objet) == msg.sender, "Vous n'êtes pas propriétaire de cet objet.");
        require(prixVendeur > 0, "Vous devez fixer un prix de vente supérieur à 0.");
        
        transferFrom(msg.sender, address(this), objet);
        bidsHollandaise[objet] = EnchereHollandaise(address(0), prixVendeur, 0, block.number+1000, objet, msg.sender);
    }
    
    function offreClassique(uint objet) public payable {
        require(exists(objet), "Cet objet n'existe pas.");
        require(block.number <= bids[objet].finEnchere, "Enchère terminée.");
        require(msg.value > bids[objet].meilleureOffre, "Une offre supérieure à la votre est déjà disponible pour cet objet.");
        
        montantARembourser[bids[objet].meilleurAcheteur] = bids[objet].meilleureOffre;
        
        // m.a.j. du nouveau meilleur acheteur et de son offre
        bids[objet].meilleureOffre = msg.value;
        bids[objet].meilleurAcheteur = msg.sender;
    }
    
    function offreHollandaise(uint objet) public payable {
        require(exists(objet), "Cet objet n'existe pas.");
        require(block.number <= bids[objet].finEnchere, "Enchère terminée.");
        
        uint nbBlocks = 1000-(bidsHollandaise[objet].finEnchere - block.number); // Nombre de blocs passés depuis le début de l'enchère
        uint montantReduction = (bidsHollandaise[objet].prixVendeur * nbBlocks)/1000;
        uint prixActuel = bidsHollandaise[objet].prixVendeur - montantReduction;
        
        require(msg.value >= prixActuel, "Votre offre est inférieure au prix de vente de l'objet.");
        
        bidsHollandaise[objet].acheteur = msg.sender;
        bidsHollandaise[objet].prixFinalVente = msg.value;
        bidsHollandaise[objet].finEnchere = block.number-1;
    }
    
    function Remboursement() public {
        require(montantARembourser[msg.sender] > 0, "Vous n'êtes pas éligible à un remboursement.");
        
        // Pour éviter un re-entry
        uint securePayback = montantARembourser[msg.sender];
        
        montantARembourser[msg.sender] = 0;
        msg.sender.transfer(securePayback);
    }
    
    function recupererObjet(uint objet) public {
        require(exists(objet), "Cet objet n'existe pas.");
        require(bids[objet].finEnchere < block.number, "Veuillez attendre la fin de l'enchère.");
        
        if (msg.sender == bids[objet].vendeur && bids[objet].meilleurAcheteur == address(0)) {
            transferFrom(address(this), msg.sender, objet);
        }
        
        require(bids[objet].meilleurAcheteur == msg.sender, "Vous n'avez pas gagné l'enchère.");
        
        transferFrom(address(this), msg.sender, objet);
    }
    
    function recupererObjetHollandaise(uint objet) public {
        require(exists(objet), "Cet objet n'existe pas.");
        require(bidsHollandaise[objet].finEnchere < block.number, "Objet toujours en vente, faites une proposition ou attendez la fin de l'enchère.");
        
        if (msg.sender == bidsHollandaise[objet].vendeur && bidsHollandaise[objet].acheteur == address(0)) {
            transferFrom(address(this), msg.sender, objet);
        }
        
        if (bidsHollandaise[objet].acheteur == msg.sender) {
            transferFrom(address(this), msg.sender, objet);
        }
    }
}

contract JeuBouletCanon is MarketPlace {
    using SafeMath for uint256;
    
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
    
    
    // Mapping qui permet d'accéder aux attributs des tournois via leur numero
    mapping (uint256 => Tournoi) tournois;
    
    // Mapping qui permet de savoir si une adresse participe ou non au tournoi
    mapping (address => bool) estParticipant; 
    
    uint256 public numTN = 0;    // Numéro du tournoi en cours
    uint256[] listeCanonsTire;   // Liste des canons qui ont tiré pendant le tournoi pour les reset à la fin du tournoi
    address[] listeParticipants; // Liste des participants au tournoi pour reset en fin de tournoi
    
    function participerTournoi() public payable {
        require(msg.value >= 0.1 ether, "Le prix pour participer au tournoi est de 0.1 ETH.");
        require(estParticipant[msg.sender] == false, "Vous êtes déjà inscrit à ce tournoi.");
        require(tournois[numTN].isLive == true, "Aucun tournoi en cours.");
        
        tournois[numTN].cagnotte += msg.value*95/100; // 5% du prix d'entrée va à la plateforme
        estParticipant[msg.sender] = true;
        listeParticipants.push(msg.sender);
    }
    
    function lancerBouletCanon(uint256 tokenID) public returns (uint256 resultatLance) {
        // Vérification que le tournoi n'est pas terminé, si OUI alors on passe le tournoi à non live
        if (block.number > tournois[numTN].heureFin) tournois[numTN].isLive = false;
        
        require(tournois[numTN].isLive == true, "Aucun tournoi en cours.");
        require(estParticipant[msg.sender] == true, "Vous n'êtes pas enregistré à ce tournoi.");
        require(exists(tokenID), "Ce canon n'existe pas.");
        require(ownerOf(tokenID) == msg.sender, "Ce canon n'est pas à vous.");
        require(joueurs[msg.sender].compteurLance < 5, "Vous ne pouvez lancer que 5 fois maximum par tournoi.");
        require(canons[tokenID].aTire == false, "Votre canon a déjà tiré dans ce tournoi.");
        
        // Calcul du lance en cours avec ce canon
        uint256 distanceLance = (uint(blockhash(block.number-1))%100) +
                             joueurs[msg.sender].niveauJoueur*2 +
                             canons[tokenID].puissance +
                             canons[tokenID].rarete*2 +
                             canons[tokenID].magie*2;
                             
        // Ce lancé est-il le meilleur ? Si oui alors il devient le nouveau meilleur lancé et on mémorise l'adresse du meilleur lanceur                     
        if (distanceLance > tournois[numTN].meilleureDistance) {
            tournois[numTN].meilleureDistance = distanceLance;
            tournois[numTN].meilleurLanceur = msg.sender;
        }
        
        // Mise à jour du meilleur lancé du joueur
        if (distanceLance > joueurs[msg.sender].meilleurLance) joueurs[msg.sender].meilleurLance = distanceLance;
        
        joueurs[msg.sender].xp += 10;
        joueurs[msg.sender].compteurLance++;
        canons[tokenID].aTire = true;
        listeCanonsTire.push(tokenID);
        
        return distanceLance;
    }
    
    function recupererPrix() public {
        // Tournoi terminé ? Si OUI alors on passe le tournoi à non live
        if (block.number > tournois[numTN].heureFin) tournois[numTN].isLive = false;
        
        require(tournois[numTN].isLive == false, "Impossible de récupérer les gains pendant un tournoi.");
        require(tournois[numTN].meilleurLanceur == msg.sender || isAdmin[msg.sender] == true, "Vous nêtes pas le gagnant du tournoi.");
        require(tournois[numTN].dejaPaye == false, "La récompense de ce tournoi a déjà été réclamé.");
        
        tournois[numTN].dejaPaye = true;
        tournois[numTN].meilleurLanceur.transfer(tournois[numTN].cagnotte);
    }
    
    function creerTournoi() public {
        // Simule un 1er tournoi dont on aurait déjà payé le gagnant
        if (numTN == 0) {
            tournois[numTN] = Tournoi(address(0), 0, 0, true, false, true, 0);
        }
        require(tournois[numTN].dejaPaye == true, "Vous devez d'abord envoyer l'argent au gagnant du précedent tournoi avant d'en lancer un nouveau.");
        require(isAdmin[msg.sender] == true, "Seul un administrateur peut effectuer cette action.");
        require(tournois[numTN].isLive == false, "Un tournoi est déjà en cours.");
        require(tournois[numTN].resetCanons == true, "Vous devez reset le tournoi avant d'en lancer un nouveau.");
        
        numTN++; // Incrémentation du numéro du tournoi
        
        //Création d'un tournoi d'une durée d'une heure
        tournois[numTN] = Tournoi(address(0), 0, 0, false, true, false, (block.number + (3 minutes/4))); // (block.number + 1 hours/4) -> on divise par 4 car 1 bloc sur kovan = ~4s
    }
    
    function resetTournoi() public {
        // Tournoi terminé ? Si OUI alors on passe le tournoi à non live
        if (block.number > tournois[numTN].heureFin) tournois[numTN].isLive = false;
        
        require(isAdmin[msg.sender] == true, "Seul un administrateur peut effectuer cette action.");
        require(tournois[numTN].isLive == false, "Un tournoi est déjà en cours.");
        require(tournois[numTN].resetCanons == false, "Le tournoi est déjà reset.");
        
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
    
    // Les faucets ne sont pas généreux 
    function recupArgent() public{
        require(isAdmin[msg.sender] == true, "Seul un administrateur peut effectuer cette action.");
        msg.sender.transfer(address(this).balance);
    }
}