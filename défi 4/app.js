async function createMetaMaskDapp() {
    try {
        // Demande à MetaMask l'autorisation de se connecter
        const addresses = await ethereum.enable();
        const user = addresses[0];
        // Connection au noeud fourni par l'objet web3
        const provider = new ethers.providers.Web3Provider(ethereum);
        // Création de l'accès aux contrats
        let contratBoulet = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        let contratBouletSigne = contratBoulet.connect(provider.getSigner(user.address));

        dapps = { contratBoulet, contratBouletSigne, user };
        console.log("dapps ready: ", dapps);

        // Pour afficher une adresse raccourcie
        let adrRaccourcie = `${user.substring(0, 6)}...${user.substring(38, 42)}`;

        document.getElementById("metaMaskOK").innerHTML = ` <span id="adresseMeta">${adrRaccourcie}</span> : connecté !`;

        // Surveiller l'évênement Transfer et notifier les transferts dans la console
        dapps.contratBoulet.on('Transfer', (_from, _to, _tokenID) => {
                console.log(`Transfert effectué\nFrom    : ${_from}\nTo      : ${_to}\nTokenID : ${_tokenID}`);
            });

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

async function creerCanon() {
    try {
        let overrides = { value: ethers.utils.parseEther('0.1') };
        let monCanon = await dapps.contratBouletSigne.creerCanon(overrides);
        console.log('Mon Canon : ', monCanon)

        document.getElementById('canonTrouve').innerHTML = `--> <u>Vous avez créé un canon</u> :<br><strong>ID</strong> : ${monCanon.ID}<br><strong>Puissance</strong> : ${monCanon.puissance}<br><strong>Rareté</strong> : ${monCanon.rarete}<br><strong>Magie</strong> : ${monCanon.magie}`;
        document.getElementById('canonTrouveOuPas').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('canonTrouveOuPas').innerHTML = `<img src="images/cross.png" alt="cross" class="okpasok">`;
        console.error(err);
    }
}

async function updateNiveau() {
    try {
        await dapps.contratBouletSigne.updateNiveauJoueur();
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

async function listerMesCanons(adresse) {
    try {
        let listeCanonsDapp = await dapps.contratBouletSigne.listerMesCanons();
        let listeCanons = [];

        // Boucle qui permet d'enlever tous les index avec un ID = 0 (lors de la suppression d'un canon dans la liste, son ID devient 0)
        for (let i = 0; i < listeCanonsDapp.length; i++) {
            const element = listeCanonsDapp[i];
            if (element != 0) listeCanons.push(element);
        }

        document.getElementById('listeCanons_okpasok').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
        
        document.getElementById('listeCanonsRes').innerHTML = listeCanons.length === 0 ? `Vous ne possédez aucun canon.<br>` :
                                                              listeCanons.length === 1 ? `Vous possédez 1 canon :<br>` :
                                                              `Vous possédez ${listeCanons.length} canons :<br>`;

        for (let i = 0; i < listeCanons.length; i++) {
            const element = listeCanons[i];
            document.getElementById('listeCanonsRes').innerHTML += `<strong>- Canon n°${i+1}</strong> : ${element}<br>`;
        };
    } catch (err) {
        document.getElementById('listeCanons_okpasok').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
    
}

async function recupArgent() {
    try {
        await dapps.contratBouletSigne.recupArgent();
        document.getElementById('argentOKpasOK').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('argentOKpasOK').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
}

async function creerTournoi() {
    try {
        await dapps.contratBouletSigne.creerTournoi();
        document.getElementById('creerTournoiOKpasOK').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('creerTournoiOKpasOK').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
}

async function resetTournoi() {
    try {
        await dapps.contratBouletSigne.resetTournoi();
        document.getElementById('resetTournoiOKpasOK').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('resetTournoiOKpasOK').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
}

async function participerTournoi() {
    try {
        let overrides = { value: ethers.utils.parseEther('0.1') };
        await dapps.contratBouletSigne.participerTournoi(overrides);

        document.getElementById('participerOKpasOK').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('participerOKpasOK').innerHTML = `<img src="images/cross.png" alt="cross" class="okpasok">`;
        console.error(err);
    }
}

async function lancerBouletCanon(idCanon) {
    try {
        let distance = await dapps.contratBouletSigne.lancerBouletCanon(idCanon);
        document.getElementById('lancerBouletOKpasOK').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
        console.log("Distance : ", distance)
        document.getElementById('DistanceLanceBoulet').innerHTML = `La distance parcourue par votre boulet est de : ${distance.resultatLance} mètres !`
    } catch (err) {
        document.getElementById('lancerBouletOKpasOK').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
}

async function recupererPrix() {
    try {
        await dapps.contratBouletSigne.recupererPrix();
        document.getElementById('recupPrixOKpasOK').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('recupPrixOKpasOK').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
}

async function proposerALaVenteClassique(objet) {
    try {
        await dapps.contratBouletSigne.proposerALaVenteClassique(objet);
        document.getElementById('proposerALaVenteClassiqueOKpasOK').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('proposerALaVenteClassiqueOKpasOK').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
}

async function offreClassique(objet, montant) {
    try {
        let overrides = { value: ethers.utils.parseEther(montant) };
        await dapps.contratBouletSigne.offreClassique(objet, overrides);
        document.getElementById('offreClassiqueOKpasOK').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('offreClassiqueOKpasOK').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
}

async function recupererObjet(objet) {
    try {
        await dapps.contratBouletSigne.recupererObjet(objet);
        document.getElementById('ObjetARecupererOKpasOK').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('ObjetARecupererOKpasOK').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
}

async function proposerALaVenteHollandaise(objet, prixVendeur) {
    try {
        await dapps.contratBouletSigne.proposerALaVenteHollandaise(objet, prixVendeur);
        document.getElementById('propoVenteHollOKpasOK').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('propoVenteHollOKpasOK').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
}

async function offreHollandaise(objet, montant) {
    try {
        let overrides = { value: ethers.utils.parseEther(montant) };
        await dapps.contratBouletSigne.offreHollandaise(objet, overrides);
        document.getElementById('offreHollOKpasOK').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('offreHollOKpasOK').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
}

async function recupererObjetHollandaise(objet) {
    try {
        await dapps.contratBouletSigne.recupererObjetHollandaise(objet);
        document.getElementById('ObjetHollARecupererOKpasOK').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('ObjetHollARecupererOKpasOK').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
}

async function Remboursement() {
    try {
        await dapps.contratBouletSigne.Remboursement();
        document.getElementById('RemboursementOKpasOK').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('RemboursementOKpasOK').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
}

async function ListerCanonsOffres() {
    try {
        let listeCanons = await dapps.contratBoulet.recupListeOffres();

        if (listeCanons.length === 0) document.getElementById('ListeCanonsOffres').innerHTML = "Il n'y a aucune offre en cours.";
        else document.getElementById('ListeCanonsOffres').innerHTML = `<br>Voici la liste des canons mis en vente actuellement :<br>${listeCanons}`;

        document.getElementById('recupListeOffresOKpasOK').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        document.getElementById('recupListeOffresOKpasOK').innerHTML = `<img src="images/cross.png" alt="check" class="okpasok">`;
        console.error(err);
    }
}
