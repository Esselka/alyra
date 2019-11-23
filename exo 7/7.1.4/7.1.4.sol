pragma solidity ^0.5.11;

import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract ERC721Simple {
    
    using strings for *;
    
    mapping (uint => address) tokens;
    mapping (address => uint) tokensCounter;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);

    function balanceOf(address _owner) public view returns (uint256 balance) {
        require(_owner != address(0), "Veuillez rentrer une adresse valide.");
        return tokensCounter[_owner];
    }
    
    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
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
    
    function decrireObjet(uint256 _tokenId) public view returns (string memory Objet) {
        require(exists(_tokenId),"Cet objet n'existe pas.");
        
        string memory rareteObj;  // 1er chiffre du token
        string memory typeObj;    // 2ème chiffre du token
        string memory puissanceObj; // 3ème chiffre du token
        string memory modeleObj;  // 4ème chiffre du token
        
        rareteObj = _tokenId/1000 == 0 ? "commun" : _tokenId/1000 == 1 ? "rare" : _tokenId/1000 == 2 ? "divin" : "ERREUR";
        typeObj = _tokenId%1000/100 == 0 ? "épée" : _tokenId%1000/100 == 1 ? "baguette" : _tokenId%1000/100 == 2 ? "arc" : "ERREUR";
        puissanceObj = _tokenId%100/10 == 0 ? "5" : _tokenId%100/10 == 1 ? "10" : _tokenId%100/10 == 2 ? "15" : _tokenId%100/10 == 3 ? "25" : "ERREUR";
        modeleObj = _tokenId%10 == 0 ? "Elfe" : _tokenId%10 == 1 ? "Nain" : _tokenId%10 == 2 ? "Humain" : _tokenId%10 == 3 ? "Orc" : "ERREUR";
        
        return string("Cet objet est un(e) ", typeObj, "fds");
    }
    
}