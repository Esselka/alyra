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

        dapps = { contratBoulet, contratBouletSigne, contratMarche, contratMarcheSigne, contratTournoi, contratTournoiSigne };
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
        document.getElementById('isRegistered').innerHTML = `<img src="images/cross.png" alt="cross" class="okpasok">`;
        await dapps.contratBouletSigne.sEnregistrer(pseudo);
        document.getElementById('isRegistered').innerHTML = `<img src="images/check.png" alt="check" class="okpasok">`;
    } catch (err) {
        console.error(err);
    }
}

async function chercherCanon() {
    try {
        let overrides = { value: ethers.utils.parseEther('0.1') };
        let resCanon = await dapps.contratBouletSigne.chercherCanon(overrides);
        console.log('Canon trouvé : ', resCanon)

        document.getElementById('canonTrouve').innerHTML = `<li>Vous avez trouvé un canon avec un ID = ${resCanon.ID} :<br>Puissance : ${resCanon.puissance}<br>Rareté : ${resCanon.rarete}<br>Magie : ${resCanon.magie}</li>`;
    } catch (err) {
      console.error(err);
    }
}