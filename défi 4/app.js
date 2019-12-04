async function createMetaMaskDapp() {
    try {
        // Demande à MetaMask l'autorisation de se connecter
        const addresses = await ethereum.enable();
        const user = addresses[0];
        // Connection au noeud fourni par l'objet web3
        const provider = new ethers.providers.Web3Provider(ethereum);
        // Création de l'accès aux contrats
        let contratBoulet = new ethers.Contract(CONTRACT_BOULET_ADDRESS, CONTRACT_BOULET_ABI, provider);
        let contratBouletSigne = contratBoulet.connect(provider.getSigner(user.address));

        let contratMarche = new ethers.Contract(CONTRACT_MARCHE_ADDRESS, CONTRACT_MARCHE_ABI, provider);
        let contratMarcheSigne = contratMarche.connect(provider.getSigner(user.address));

        let contratTournoi = new ethers.Contract(CONTRACT_TOURNOI_ADDRESS, CONTRACT_TOURNOI_ABI, provider);
        let contratTournoiSigne = contratTournoi.connect(provider.getSigner(user.address));

        dapps = { contratBoulet, contratBouletSigne, contratMarche, contratMarcheSigne, contratTournoi, contratTournoiSigne, user };
        console.log("dapps ready: ", dapps);
        document.getElementById("metaMaskOK").innerHTML = " Connexion MetaMask établie";
    } catch (err) {
        document.getElementById("metaMaskOK").innerHTML = " La connexion à MetaMask a échouée";
        console.error(err);
    }
}

async function register(pseudo) {
    /*try {

      } catch (err) {
        console.error(err);
      } */
    try {
        await dapps.contratBouletSigne.sEnregistrer(pseudo);
        document.getElementById('isRegistered').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('isRegistered').innerHTML = `<img src="images/cross.png" alt="cross" class="okpasok">`;
        console.error(err);
    }
}

async function chercherCanon() {
    try {
        let overrides = { value: ethers.utils.parseEther('0.1') };
        let monCanon = await dapps.contratBouletSigne.chercherCanon(overrides);
        console.log('Chercher un canon : ', monCanon)

        document.getElementById('canonTrouve').innerHTML = `--> <u>Vous avez trouvé un canon</u> :<br><strong>ID</strong> : ${monCanon.ID}<br><strong>Puissance</strong> : ${monCanon.puissance}<br><strong>Rareté</strong> : ${monCanon.rarete}<br><strong>Magie</strong> : ${monCanon.magie}`;
        document.getElementById('canonTrouveOuPas').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('canonTrouveOuPas').innerHTML = `<img src="images/cross.png" alt="cross" class="okpasok">`;
        console.error(err);
    }
}

async function updateNiveau() {
    try {
        await dapps.contratBoulet.updateNiveauJoueur();
        document.getElementById('majNiveau').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('majNiveau').innerHTML = `<img src="images/cross.png" alt="cross" class="okpasok">`;
        console.error(err);
    }
}

async function statsJoueur(adresse) {
    try {
        let stats = await dapps.contratBouletSigne.statsJoueur(adresse);
        document.getElementById('statsJoueurRes').innerHTML = `Pseudo : ${stats.Pseudo}<br>XP : ${stats.xp}<br>Niveau : ${stats.niveauJoueur}<br>Meilleur lancé du tournoi : ${stats.meilleurLance}<br>Nombre de lancé du tournoi : ${stats.compteurLance}`;
    } catch (err) {
        document.getElementById('statsJoueur_okpasok').innerHTML = `<img src="images/cross.png" alt="cross" class="okpasok">`;
        console.error(err);
    }
}

async function listeCanonsJoueur(adresse) {
    try {
        let listeCanons = await dapps.contratBouletSigne.listerCanonsAdresse(adresse);
        document.getElementById('listeCanons_okpasok').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
        
        document.getElementById('listeCanonsRes').innerHTML = listeCanons.length === 0 ? `Ce joueur ne possède aucun canon :<br>` :
                                                              listeCanons.length === 1 ? `Ce joueur possède 1 canon :<br>` :
                                                              `Ce joueur possède ${listeCanons.length} canons :<br>`;

        for (let i = 0; i < listeCanons.length; i++) {
            const element = listeCanons[i];
            document.getElementById('listeCanonsRes').innerHTML += `<strong>- Canon n°${i+1}</strong> : ${element}<br>`;
        };
    } catch (err) {
        document.getElementById('listeCanons_okpasok').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
    
}

async function setupContrat() {
    try {
        await dapps.contratTournoiSigne.setupContrat();
        document.getElementById('setupOKpasOK').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('setupOKpasOK').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
}
