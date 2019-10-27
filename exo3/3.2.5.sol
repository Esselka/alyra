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
        require(block.timestamp >= dateLiquidation, "Veuillez attendre la fin du festival pour retirer vos parts");
        
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
}

contract Loterie is CagnotteFestival {
    
    bool tirageEffectue;
    uint prizePool; // Cagnotte de tous les participants à se partager en cas de victoire
    uint numeroGagnant; // Numéro tiré au sors valable pendant les 5 jours de chaque loterie
    
    /* Nombre aléatoire basé sur le hash du bloc précédent, converti en uint8 pour correspondre à
       ce que les gens choississent comme nombre lors de l'achat d'un ticket */
    uint8 tirageNumeroLoterie;
    mapping (address => TicketLoto) ticketsloto;
    
    uint dateDuProchainTirage = now + 1 minutes; // 1 days normalement
    uint dateDeValiditeDuTirage = now + 5 minutes; // Date jusqu'à laquelle on peut tenter sa chance 1x par jour
    bool tirageEnCours; // true = ne peut plus faire de nouveau tirage
    uint nombreDeGagnants;
    uint8 numeroTirage = 1; // Initialisation du 1er tirage
    
    struct TicketLoto {
        uint8 numero; // Numéro que le festivalier choisi
        uint8 choixTirage; // Le numéro du tirage auquel le festivalier veut participer (1er = 0-5 jours, 2eme = 5-10 jours, 3eme = 10-14 jours) 
        bool estGagnant; // true si le ticket est gagnant
        bool aTenteUnTirage; // true si ce ticket a déjà été joué
        bool aRetirerSesGains;
    }
    
    function acheterTicketLoterie (uint8 choixNumTirageLoterie, uint8 choixNombre) public payable {
        require(block.timestamp < dateLiquidation, "Festival terminé, loterie fermée");
        require(tirageEffectue == false, "Le tirage du jour a déjà été effectué");
        require(msg.value >= 100 finney, "Le ticket est à 0.1 Ether");
        require(festivaliers[msg.sender], "Pour participer à la loterie vous devez être festivalier");
        require(choixNombre <= 255 && choixNombre >= 1, "Vous devez choisir un nombre entre 1 et 255 inclus");
        require(choixNumTirageLoterie >= 1 && choixNumTirageLoterie <= 3, "Il y a 3 tirages, choisissez le numéro du tirage auquel vous voulez participer(1, 2 ou 3)");
        
        prizePool += msg.value;
        ticketsloto[msg.sender].choixTirage = choixNumTirageLoterie;
        ticketsloto[msg.sender].numero = choixNombre;
        ticketsloto[msg.sender].estGagnant = false;
        ticketsloto[msg.sender].aTenteUnTirage = false;
    }
    
    function retirerGains () public {
        require(now > dateLiquidation && now < dateLiquidation + 2 days, "Vous ne pouvez retirer vos gains qu'après le festival pendant 48h");
        require(ticketsloto[msg.sender].estGagnant = true, "Vous n'avez pas de ticket gagnant");
        require(ticketsloto[msg.sender].aRetirerSesGains = false, "Vous avez déjà récupéré vos gains");
        
        payer(msg.sender, prizePool.div(nombreDeGagnants));
        ticketsloto[msg.sender].aRetirerSesGains = true;
    }
    
    function randomNum() internal returns (uint8) {
        uint unNombre = uint(blockhash(block.number-1));
        uint8 nombreUint8 = uint8(unNombre);
        return nombreUint8;
    }
    
    function tirageLoterie() internal {
        if(now > dateDeValiditeDuTirage) {
            numeroTirage++; // Passage au tirage suivant
            dateDeValiditeDuTirage += 5 minutes; // 5 days normalement
            tirageEnCours = false;
            tirageLoterie(); // Si cela fait trop longtemps qu'il n'y a pas eu de tirage
        }
        require(tirageEnCours == false, "Il y a déjà un tirage en cours");
        tirageNumeroLoterie = randomNum();
        if(tirageNumeroLoterie == 0) tirageLoterie(); // Les gens ne peuvent choisir qu'entre 1 et 255
        tirageEnCours = true;
    }
    
    function tirageQuotidien () public returns (string memory) {
        require(tirageEffectue == false, "Le tirage quotidien a déjà été effectué, revenez demain");
        require(now > dateDuProchainTirage - 30 seconds, "Le tirage ne peut être effectué qu'à partir de 20h00"); // Exemple arbitraire, ici j'utilise les secondes pour tester le contrat
        if(tirageNumeroLoterie == 0) tirageLoterie(); // Effectue un premier tirage
        require(block.timestamp < dateLiquidation, "Festival terminé, loterie fermée");
        /* Si nous sommes une nouvelle journée de tirage, alors augmenter la date du prochain tirage d'un jour
           Et redonne le droit de faire un tirage */
        if(now > dateDuProchainTirage) {
            dateDuProchainTirage += 1 minutes; // 1 days normalement
            ticketsloto[msg.sender].aTenteUnTirage = false; // Octroit le droit de refaire un tirage
            tirageQuotidien(); // Si cela fait trop longtemps qu'il n'y a pas eu de tirage
        }
        
        require(ticketsloto[msg.sender].choixTirage == numeroTirage, "Votre ticket n'est pas valide pour ce tirage ");
        require(ticketsloto[msg.sender].aTenteUnTirage == false, "Vous avez déjà tenté votre chance aujourd'hui, revenez demain");
        if (ticketsloto[msg.sender].numero == tirageNumeroLoterie) {
            ticketsloto[msg.sender].aTenteUnTirage = true;
            ticketsloto[msg.sender].estGagnant = true;
            nombreDeGagnants++;
            return "Vous avez gagné, félicitations ! Vous pouvez réclamer votre prix après la fin du festival.";
        }
        else {
            ticketsloto[msg.sender].aTenteUnTirage = true;
            return "Vous avez perdu ! Rententez votre chance demain.";
        }
        tirageEffectue = true; // On ne peut plus faire de tirage pour la journée
    }
    
    function afficherNumeroGagnant () public view returns (uint8) {
        return tirageNumeroLoterie;
    }
}