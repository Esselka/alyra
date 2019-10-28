pragma solidity ^0.5.7;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Credibilite {
  
   using SafeMath for uint256;
  
   mapping (address => uint256) public cred;
   bytes32[] private devoirs;
   
   function produireHash(string memory url) public pure returns (bytes32 Hash) {
       bytes32 hash = keccak256(bytes(url));
       return hash;
   }
   
   function transfer(address destinataire, uint256 valeur) public {
       require(cred[msg.sender] > valeur, "Vous devez garder au moins 1 de crédibilité");
       cred[msg.sender] -= valeur;
       cred[destinataire] += valeur;
   }
   
   function remettre(bytes32 dev) public returns (uint ordreArrivee) {
       devoirs.push(dev);
       if(devoirs.length == 1) {
           cred[msg.sender] += 30;
           return devoirs.length;
       } else if(devoirs.length == 2) {
           cred[msg.sender] += 20;
           return devoirs.length;
       } else if(devoirs.length > 2) {
           cred[msg.sender] += 10;
           return devoirs.length;
       }
   }

}