pragma solidity ^0.5.11;

contract Cogere {
    
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
    
    constructor() public {
        
    }
    
    function acheterTicket() public payable {
        require(msg.value == prixTicket,"Place à 0.5 Ether");
        require(placesRestantes > 0,"Plus de places !");
        require(festivaliers[msg.sender] == false, "Vous avez déjà acheter votre ticket");
        
        festivaliers[msg.sender] = true; // Devient un festivalier après l'achat d'un ticket
        comptabiliserCagnotte(msg.value); // Ajout dans la cagnotte
        placesRestantes--;
    }
    
    function payer(address payable destinataire, uint montant) public payable {
        require(estOrga(msg.sender), "Vous devez être organisateur pour effectuer cette opération");
        require(destinataire != address(0), "Adresse invalide");
        require(montant > 0, "Le montant de la transaction doit être > 0");
        
        destinataire.transfer(montant);
        comptabiliserDepense(montant);
    }
    
    function comptabiliserDepense(uint montant) private {
        depensesTotales += montant;
    }
    
    function comptabiliserCagnotte(uint montant) private {
        cagnotte += montant;
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
    
    function sponsoriser(string memory nomSponsor) public payable {
        require(msg.value >= 30 ether, "Don minimum de 30 Ethers pour être sponsor");
        sponsors.push(nomSponsor);
        comptabiliserCagnotte(msg.value);
    }
}