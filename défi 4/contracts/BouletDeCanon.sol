pragma solidity ^0.5.11;

pragma experimental ABIEncoderV2;

import "https://github.com/Esselka/alyra/blob/master/d%C3%A9fi%204/contracts/ERC721Boulet.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";

contract BouletDeCanon is ERC721Boulet {
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
    
    // Pour les besoins administrateur
    mapping (address => bool) isAdmin;
    address payable private addrAdmin;
    address[] allowedContracts;
    
    constructor () public {
        addrAdmin = msg.sender;
        isAdmin[msg.sender] = true;
    }
    
    // Mapping qui permet de connaître la liste des canons possédés par une adresse
    mapping (address => uint256[]) public listeCanonsAdresse;
    
    // Mapping qui permet d'accéder aux attributs des canons via leur ID
    mapping (uint256 => Canon) public canons;
    
    // Mapping qui permet d'accéder aux attributs des joueurs via leur adresse
    mapping (address => Joueur) public joueurs;
    
    // Tableau des niveaux des joueurs en fonction dez leur xp
    uint32[10] public xpJoueur = [ 50, 120, 290, 690, 1650, 4000, 9600, 23000, 55000, 140000 ];
    
    // Pour autoriser le contrat Tournoi et le contrat MarcheBoulet à appeler des fonctions
    modifier contratAccepte() {
        require(msg.sender == allowedContracts[0] || msg.sender == allowedContracts[1]);
        _;
    }
    
    // Seul le propriétaire du contrat peut exécuter ces fonctions
    modifier onlyOwner() {
        require(msg.sender == addrAdmin);
        _;
    }
    
    // Donner l'autorisation à des adresses d'exécuter certaines fonctions
    function setOtherContract(address _adresseAutorise, uint8 index) public onlyOwner {
        require(index == 0 || index == 1, "Veuillez modifier l'index 0 ou 1.");
        allowedContracts[index] = _adresseAutorise;
    }
    
    function sEnregistrer(string memory votrePseudo) public {
        require(joueurs[msg.sender].isRegistered == false, "Vous êtes déjà enregistré.");
        
        joueurs[msg.sender] = Joueur(votrePseudo, 0, 0, true, 0, 0);
    }
    
    function chercherCanon() public payable returns (Canon memory CanonTrouve) {
        require(joueurs[msg.sender].isRegistered == true,"Vous n'êtes pas enregistré à la plateforme.");
        require(msg.value >= 0.1 ether, "Vous devez payer 0.1 ETH au minimum pour chercher un canon.");
        require(balanceOf(msg.sender) < 5, "Vous ne pouvez posséder que 5 canons maximum.");
        
        addrAdmin.transfer(msg.value); // Parce que l'argent (même fictif) c'est cool
        
        uint256 tokenID = (uint(blockhash(block.number-1))%1000);
        require(!(_exists(tokenID)), "Le canon trouvé existe déjà, veuillez recommencer." );
        
        listeCanonsAdresse[msg.sender].push(tokenID);
        _mint(msg.sender, tokenID);
        
        canons[tokenID].puissance = tokenID%1000/100 <= 3 ? 10 :  tokenID%1000/100 <= 6 ? 20 : tokenID%1000/100 <= 8 ? 35 : 50;
        canons[tokenID].rarete = tokenID%100/10 <= 3 ? 0 :  tokenID%100/10 <= 6 ? 1 : tokenID%100/10 <= 8 ? 2 : 3;
        canons[tokenID].magie = tokenID%10;
        
        return canons[tokenID];
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
    
    function statsJoueur(address _joueur) public view returns (Joueur memory statsDuJoueur) {
        require(joueurs[msg.sender].isRegistered == true, "Vous n'êtes pas enregistré.");
        require(_joueur != address(0), "Adresse non valide.");
        return joueurs[_joueur];
    }
    
    // Getter qui retourne les attributs du joueur à l'adresse indiquée en params
    function getJoueur(address _adresse) public view contratAccepte returns (string memory Pseudo, uint32 xp, uint8 niveauJoueur, bool isRegistered, uint meilleurLance, uint8 compteurLance) {
        require(_adresse != address(0), "Adresse non valide.");
        return (joueurs[_adresse].Pseudo, joueurs[_adresse].xp, joueurs[_adresse].niveauJoueur, joueurs[_adresse].isRegistered, joueurs[_adresse].meilleurLance, joueurs[_adresse].compteurLance);
    }
    
    // Getter qui retourne les attributs d'un canon selon son isRegistered
    function getCanon(uint256 tokenID) public view returns (uint256 puissance, uint256 rarete, uint256 magie, bool aTire) {
        require(_exists(tokenID), "Ce canon n'existe pas." );
        return (canons[tokenID].puissance, canons[tokenID].rarete, canons[tokenID].magie, canons[tokenID].aTire);
    }
    
    // Getter qui retourne la liste des canons que possède une adresse
    function getListeCanons(address adresseALister) public view contratAccepte returns (uint256[] memory listeDesCanons) {
        require(adresseALister != address(0), "Adresse non valide.");
        return listeCanonsAdresse[adresseALister];
    }
    
    // Setter qui premet de changer l'état de aTire d'un canon
    function setCanonATire(uint256 tokenID, bool etat) external {
        require(_exists(tokenID), "Ce canon n'existe pas." );
        canons[tokenID].aTire = etat;
    }
    
    // Setter qui permet de changer la valeur du meilleur lancé d'un joueur
    function setMeilleurLanceJoueur(address adresse, uint valeur) public {
        require(adresse != address(0), "Adresse non valide.");
        joueurs[adresse].meilleurLance = valeur;
    }
    
    // Setter qui permet d'augmenter l'xp d'un joueur
    function setAjoutXpJoueur(address adresse, uint32 valeur) public {
        require(adresse != address(0), "Adresse non valide.");
        joueurs[adresse].xp += valeur;
    }
    
    // Setter qui permet d'incrémenter le compteur des lancés d'un joueur de 1
    function setCompteurLanceIncrement(address adresse) public {
        require(adresse != address(0), "Adresse non valide.");
        joueurs[adresse].compteurLance++;
    }
    
    // Setter qui permet d'attribuer une valeur au compteur des lancés d'un joueur
    function setCompteurLance(address adresse, uint8 valeur) external {
        require(adresse != address(0), "Adresse non valide.");
        joueurs[adresse].compteurLance = valeur;
    }
    
    // Getter qui permet de connaître l'adresse du propriétaire d'un tokenID
    function getOwnerOf(uint256 tokenId) external view returns (address) {
        return ownerOf(tokenId);
    }
    
    // Getter qui permet de vérifier si un token existe, TRUE s'il existe, FALSE sinon
    function getIsExists(uint256 tokenId) external view returns (bool) {
        return _exists(tokenId);
    }
    
    // Setter qui permet de transférer un objet à une adresse
    function setTransferFrom(address _from, address _to, uint256 tokenId) external {
        transferFrom(_from, _to, tokenId);
    }
}