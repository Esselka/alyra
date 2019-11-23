pragma solidity ^0.5.11;

pragma experimental ABIEncoderV2;

contract ERC721Simple {
    
    mapping (uint => address) public tokens;
    mapping (address => uint) public tokensCounter;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
    
    function balanceOf(address _owner) public view returns (uint256 balance) {
        require(_owner != address(0), "Veuillez rentrer une adresse valide.");
        return tokensCounter[_owner];
    }
    
    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        require(exists(_tokenId), "Cet objet n'existe pas.");
        return tokens[_tokenId];
    }
    
    function exists(uint256 _tokenId) public view returns (bool exists) {
        return tokens[_tokenId] != address(0);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public {
        require(tokens[_tokenId] == msg.sender && _from == msg.sender, "Vous ne possédez pas cet objet.");
        
        tokens[_tokenId] = _to;
        tokensCounter[_from]--;
        tokensCounter[_to]++;
        
        emit Transfer(_from, _to, _tokenId);
    }
}

contract ObjetsMagiques is ERC721Simple {
    
    mapping (address => bool) isAdmin;
    address payable private addrAdmin;
    
    constructor  () public {
        addrAdmin = msg.sender;
        isAdmin[msg.sender] = true;
    }
    
    struct Objet {
        string rareteObj;  // 1er chiffre du token
        string typeObj;    // 2ème chiffre du token
        uint puissanceObj; // 3ème chiffre du token
        string modeleObj;  // 4ème chiffre du token
    }
    
    // Récupérer les fonds qu'il reste à l'adresse du contrat à sa destruction
    function detruireContrat() public {
        require(isAdmin[msg.sender] == true, "Vous n'êtes pas autorisé à détruire le contrat");
        selfdestruct(msg.sender);
    }
    
    function decrireObjet(uint256 _tokenId) public view returns (Objet memory unObjet) {
        require(exists(_tokenId),"Cet objet n'existe pas.");
        
        Objet memory monObjet;
        
        monObjet.rareteObj = _tokenId/1000 == 0 ? "commun" : _tokenId/1000 == 1 ? "rare" : _tokenId/1000 == 2 ? "divin" : "ERREUR";
        monObjet.typeObj = _tokenId%1000/100 == 0 ? "épée" : _tokenId%1000/100 == 1 ? "baguette" : _tokenId%1000/100 == 2 ? "arc" : _tokenId%1000/100 == 3 ? "pistolet" : _tokenId%1000/100 == 4 ? "bâton" : _tokenId%1000/100 == 5 ? "cailloux" : _tokenId%1000/100 == 6 ? "bouclier" : _tokenId%1000/100 == 7 ? "plastron" : _tokenId%1000/100 == 8 ? "bottes" : _tokenId%1000/100 == 9 ? "casque" : "ERREUR";
        monObjet.puissanceObj = _tokenId%100/10 == 0 | 1 | 2 | 3 | 4 ? 5 : _tokenId%100/10 == 6 | 7 | 8 ? 10 : _tokenId%100/10 == 9 ? 20 : 0;
        monObjet.modeleObj = _tokenId%10 == 0 | 1 ? "Elfe" : _tokenId%10 == 2 | 3 ? "Nain" : _tokenId%10 == 4 | 5 ? "Humain" : _tokenId%10 == 6 | 7 ? "Orc" : _tokenId%10 == 8 | 9 ? "Zorg" : "ERREUR";
        
        return monObjet; // retourne l'objet pour être exploité dans une interface web par la suite
    }
    
    function creuser() public payable {
        require(msg.value >= 0.1 ether, "Vous devez payer 0.1 ETH au minimum pour creuser.");
        
        uint tokenID = (uint(blockhash(block.number-1))%3000);
        require(!(exists(tokenID)), "L'objet trouvé existe déjà, veuillez recommencer." );
        
        tokens[tokenID] = msg.sender;
        tokensCounter[msg.sender]++;
            
        addrAdmin.transfer(msg.value);
    }
}