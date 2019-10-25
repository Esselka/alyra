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
        
        organisateurs[orga] = organisateurs[orga].add(parts);
        organisateurs[msg.sender] = organisateurs[msg.sender].sub(parts);
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
    uint private argentRestant;
    uint private partsRestituee;
    
    uint prixTicket = 500 finney;
    
    string[] sponsors;
    
    // Pour contrôler le seuil de dépenses par jour
    uint depensesMaxParJour = 20 ether;
    uint depensesDuJour; // Montant des dépenses de la journée
    uint dateFestival;
    uint dateLiquidation;
    uint cycle24h;
    
    
    constructor() public {
        dateFestival = now; // Création de la date de début du festival au déployement du contrat
        dateLiquidation = dateFestival + 2 weeks; // Date de fin du festival
        cycle24h = dateFestival; // Initialisation du 1er cycle pour les dépenses du jour
    }
    
    function acheterTicket() public payable {
        require(msg.value == prixTicket,"Place à 0.5 Ether");
        require(placesRestantes > 0,"Plus de places !");
        require(festivaliers[msg.sender] == false, "Vous avez déjà acheter votre ticket");
        require(block.timestamp <= dateLiquidation, "Festival terminé, guichet fermé");
        
        festivaliers[msg.sender] = true; // Devient un festivalier après l'achat d'un ticket
        comptabiliserCagnotte(msg.value); // Ajout dans la cagnotte
        placesRestantes--;
    }
    
    function payer(address payable destinataire, uint montant) public {
        require(estOrga(msg.sender), "Vous devez être organisateur pour effectuer cette opération");
        require(destinataire != address(0), "Adresse invalide");
        require(montant > 0, "Le montant de la transaction doit être > 0");
        require(droitDeDepenser(), "Le montant max des dépenses du jour a été atteint");
        require(depensesDuJour + montant <= depensesMaxParJour, "Vous dépassez le montant max de dépense par jour");
        
        destinataire.transfer(montant);
        comptabiliserDepenses(montant);
    }
    
    function comptabiliserDepenses(uint montant) private {
        depensesTotales = depensesTotales.add(montant);
        depensesDuJour = depensesDuJour.add(montant);
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
    
    // Pour les paiements et dons anonymes
    function () external payable {}
    
    function sponsoriser(string memory nomSponsor) public payable {
        require(msg.value >= 30 ether, "Don minimum de 30 Ethers pour être sponsor");
        sponsors.push(nomSponsor);
        comptabiliserCagnotte(msg.value);
    }
    
    function droitDeDepenser() internal returns (bool) {
        if(now - cycle24h < 1 days) {
            bool capableDepenser = true;
            if (depensesDuJour > depensesMaxParJour) capableDepenser = false;
            
            return capableDepenser;
        }
        else {
            cycle24h += 1 days;
            depensesDuJour = 0; // reset des dépenses du jour
            droitDeDepenser();
        }
    }
    
    function retraitOrga() public payable {
        require(estOrga(msg.sender), "Vous devez être organisateur pour effectuer cette opération");
        require(block.timestamp >= dateLiquidation);
        
        argentRestant = cagnotte - depensesTotales;
        
        // Ajout du retrait en cours aux dépenses
        depensesTotales += argentRestant.mul(organisateurs[msg.sender]).div(100);
        
        msg.sender.transfer(argentRestant.mul(organisateurs[msg.sender]).div(100));
        
        partsRestituee += organisateurs[msg.sender]; // Compte les parts restituée
        organisateurs[msg.sender] = 0; // Retire toutes les parts, n'est plus organisateur
        
        /* Quand tous les organisteurs auront réclamé leurs parts, destruction du contrat
           Et restitution de l'argent restant au dernier organisateur qui appel la fonction */
        if (partsRestituee == 100) selfdestruct(msg.sender);
    }
    
    function afficherBalance() public view returns (uint){
        return address(this).balance;
    }
    
    function afficherParts () public view returns (uint) {
        return organisateurs[msg.sender];
    }
    
    function afficherCagnotte () public view returns (uint) {
        return cagnotte;
    }
    
    function afficherDepensesTotales () public view returns (uint) {
        return depensesTotales;
    }
}