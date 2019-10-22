/* Exercice 3.1.2 - Vérifier que le participant est membre

Définir la fonction suivante qui parcourt le tableau des participants pour déterminer si le détenteur de l’adresse passée en paramètre 
est membre de l’assemblée. NB, la syntaxe des boucles for est la même qu’en JavaScript :

 for (uint i=0; i<membres.length; i++) {}
 */

pragma solidity ^0.5.11;
contract Assemblee {

    address[] membres;

    function rejoindre() public {
    membres.push(msg.sender);
    }

    function estMembre(address utilisateur) public view returns (bool) {
        bool isMember = false;
        for (uint i = 0; i<membres.length; i++) {
            if (utilisateur == membres[i]) {
                isMember = true;
            }
            return isMember;
        }
    }
}