pragma solidity ^0.5.3;
contract Cartes {
   string[] cartes;

   function ajouterCarte(string memory s) public {
       cartes.push(s);
   }

   function recuperer(uint ind) view public returns (string memory) {
       return cartes[ind];
   }
}
