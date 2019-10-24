pragma solidity ^0.5.11;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Cogere {
    
    using SafeMath for uint256;
    
    mapping (address => uint) organisateurs;
    uint placesRestantes = 500;

    constructor() internal {
        organisateurs[msg.sender] = 100;   
    }

    function transfererOrga(address orga, uint parts) public {
        require(estOrga(msg.sender), "Vous devez être organisateur pour effectuer cette opération");
        require(organisateurs[msg.sender] >= parts, "Vous essayez de transférer plus de parts que vous n'en possédez");
        
        organisateurs[orga] += parts;
        organisateurs[msg.sender] -= parts;
        
    }
    
    function estOrga(address orga) public view returns (bool){
        // Si l'adresse 'orga' possède au moins 1 part, alors c'est un organisateur
        return organisateurs[orga] > 0 ? true : false;
    }
    
    function getPlacesRestantes () public view returns (uint) {
        return placesRestantes;
    }
}

contract CagnotteFestival is Cogere {
    
    mapping (address => bool) festivaliers;
    uint private depensesTotales;
    uint private cagnotte;
    uint prixTicket = 500 finney;
    string[] sponsors;
    
    function acheterTicket(address payable unOrga) public payable {
        require(msg.value == prixTicket,"Place à 0.5 Ether");
        require(placesRestantes > 0,"Plus de places !");
        require(estOrga(unOrga), "Vous devez acheter votre ticket à un organisateur");
        require(festivaliers[msg.sender] == false, "Vous avez déjà acheter votre ticket");
        
        festivaliers[msg.sender] = true; // Devient un festivalier après l'achat d'un ticket
        comptabiliserCagnotte(msg.value); // Ajout dans la cagnotte
        placesRestantes--;
        unOrga.transfer(msg.value);
    }
    
    function payer(address payable destinataire) public payable {
        require(estOrga(msg.sender), "Vous devez être organisateur pour effectuer cette opération");
        require(destinataire != address(0), "Adresse invalide");
        require(msg.value > 0, "Le montant de la transaction doit être > 0");
        
        destinataire.transfer(msg.value);
        comptabiliserDepense(msg.value);
    }
    
    function comptabiliserDepense(uint montant) private {
        depensesTotales = depensesTotales.add(montant);
    }
    
    function comptabiliserCagnotte(uint montant) private {
        cagnotte = cagnotte.add(montant);
    }
    
    function getDepensesTotales () private view returns (uint) {
        return depensesTotales;
    }
    
    function getCagnotte () private view returns (uint) {
        return cagnotte;
    }
    
    function getSponsors (uint index) public view returns (string memory) {
        return sponsors[index];
    }
    
    function sponsoriser(string memory nomSponsor, address payable unOrga) public payable {
        require(msg.value >= 30 ether, "Don minimum de 30 Ethers pour être sponsor");
        require(estOrga(unOrga), "Vous devez faire votre don à un organisateur");
        unOrga.transfer(msg.value);
        sponsors.push(nomSponsor);
        comptabiliserCagnotte(msg.value);
    }
}