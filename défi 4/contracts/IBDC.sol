pragma solidity ^0.5.11;

interface BouletDeCanonInterface {
    // Getter qui retourne les attributs du joueur à l'adresse indiquée en params
    function getJoueur(address _adresse) external view returns (string memory Pseudo, uint32 xp, uint8 niveauJoueur, bool isRegistered, uint meilleurLance, uint8 compteurLance);
    
    // Getter qui retourne les attributs d'un canon selon son isRegistered
    function getCanon(uint256 tokenID) external view returns (uint256 puissance, uint256 rarete, uint256 magie, bool aTire);
    
    // Getter qui retourne la liste des canons que possède une adresse
    function getListeCanons(address adresseALister) external view returns (uint256[] memory listeDesCanons);
    
    // Setter qui permet de changer la valeur du meilleur lancé d'un joueur
    function setMeilleurLanceJoueur(address adresse, uint valeur) external;
    
    // Setter qui permet d'augmenter l'xp d'un joueur
    function setAjoutXpJoueur(address adresse, uint32 valeur) external;
    
    // Setter qui permet d'incrémenter le compteur des lancés d'un joueur de 1
    function setCompteurLanceIncrement(address adresse) external;
    
    // Setter qui premet de changer l'état de aTire d'un canon
    function setCanonATire(uint256 tokenID, bool etat) external;
    
    // Setter qui permet d'attribuer une valeur au compteur des lancés d'un joueur
    function setCompteurLance(address adresse, uint8 valeur) external;
    
    function balanceOf(address owner) external view returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);
    function transferFrom(address from, address to, uint256 tokenId) external;
    function _exists(uint256 tokenId) external view returns (bool);
    
}