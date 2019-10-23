contract CagnotteFestival {
    
    Organisateur organisateurs;
    
    constructor() public {
        organisateurs.parts[msg.sender] = 100;
        organisateurs.isOrga[msg.sender] = true;
    }
    
    struct Organisateur {
        mapping (address => uint) parts;
        address[] adresses;
        mapping (address => bool) isOrga;
    }
    
    function estOrga(address orga) public returns (bool){
        return organisateurs.isOrga[orga];
    }
    
    function transfererOrga(address orga, uint parts) public {
        require(estOrga(msg.sender), "Vous devez être organisateur pour effectuer cette opération");
        //require(estOrga(orga), "La personne à qui vous voulez transférer des parts doit être un organisateur");
        require(organisateurs.parts[msg.sender] > parts, "Vous essayez de transférer plus de parts que vous n'en possédez");
        
        organisateurs.parts[orga] += parts;
        organisateurs.parts[msg.sender] -= parts;
    }
}