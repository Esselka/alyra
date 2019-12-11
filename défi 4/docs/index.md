[IERC721]: #IERC721
[IERC721-balanceOf-address-]: #IERC721-balanceOf-address-
[IERC721-ownerOf-uint256-]: #IERC721-ownerOf-uint256-
[IERC721-exists-uint256-]: #IERC721-exists-uint256-
[IERC721-transferFrom-address-address-uint256-]: #IERC721-transferFrom-address-address-uint256-
[IERC721-_mint-address-uint256-]: #IERC721-_mint-address-uint256-
[IERC721-Transfer-address-address-uint256-]: #IERC721-Transfer-address-address-uint256-
[BouletDeCanon]: #BouletDeCanon
[BouletDeCanon-_tokenOwner-mapping-uint256----address-]: #BouletDeCanon-_tokenOwner-mapping-uint256----address-
[BouletDeCanon-_ownedTokensCount-mapping-address----uint256-]: #BouletDeCanon-_ownedTokensCount-mapping-address----uint256-
[BouletDeCanon-listeCanonsAdresse-mapping-address----uint256---]: #BouletDeCanon-listeCanonsAdresse-mapping-address----uint256---
[BouletDeCanon-canons-mapping-uint256----struct-BouletDeCanon-Canon-]: #BouletDeCanon-canons-mapping-uint256----struct-BouletDeCanon-Canon-
[BouletDeCanon-joueurs-mapping-address----struct-BouletDeCanon-Joueur-]: #BouletDeCanon-joueurs-mapping-address----struct-BouletDeCanon-Joueur-
[BouletDeCanon-xpJoueur-uint32-10-]: #BouletDeCanon-xpJoueur-uint32-10-
[BouletDeCanon-statsJoueur-address-]: #BouletDeCanon-statsJoueur-address-
[BouletDeCanon-sEnregistrer-string-]: #BouletDeCanon-sEnregistrer-string-
[BouletDeCanon-listerMesCanons--]: #BouletDeCanon-listerMesCanons--
[BouletDeCanon-creerCanon--]: #BouletDeCanon-creerCanon--
[BouletDeCanon-updateNiveauJoueur--]: #BouletDeCanon-updateNiveauJoueur--
[BouletDeCanon-removeCanon-address-uint256-]: #BouletDeCanon-removeCanon-address-uint256-
[BouletDeCanon-balanceOf-address-]: #BouletDeCanon-balanceOf-address-
[BouletDeCanon-ownerOf-uint256-]: #BouletDeCanon-ownerOf-uint256-
[BouletDeCanon-exists-uint256-]: #BouletDeCanon-exists-uint256-
[BouletDeCanon-transferFrom-address-address-uint256-]: #BouletDeCanon-transferFrom-address-address-uint256-
[BouletDeCanon-_mint-address-uint256-]: #BouletDeCanon-_mint-address-uint256-
[MarketPlace]: #MarketPlace
[MarketPlace-bids-mapping-uint256----struct-MarketPlace-Enchere-]: #MarketPlace-bids-mapping-uint256----struct-MarketPlace-Enchere-
[MarketPlace-bidsHollandaise-mapping-uint256----struct-MarketPlace-EnchereHollandaise-]: #MarketPlace-bidsHollandaise-mapping-uint256----struct-MarketPlace-EnchereHollandaise-
[MarketPlace-listeOffres-uint256--]: #MarketPlace-listeOffres-uint256--
[MarketPlace-montantARembourser-mapping-address----uint256-]: #MarketPlace-montantARembourser-mapping-address----uint256-
[MarketPlace-recupListeOffres--]: #MarketPlace-recupListeOffres--
[MarketPlace-proposerALaVenteClassique-uint256-]: #MarketPlace-proposerALaVenteClassique-uint256-
[MarketPlace-proposerALaVenteHollandaise-uint256-uint256-]: #MarketPlace-proposerALaVenteHollandaise-uint256-uint256-
[MarketPlace-offreClassique-uint256-]: #MarketPlace-offreClassique-uint256-
[MarketPlace-offreHollandaise-uint256-]: #MarketPlace-offreHollandaise-uint256-
[MarketPlace-Remboursement--]: #MarketPlace-Remboursement--
[MarketPlace-recupererObjet-uint256-]: #MarketPlace-recupererObjet-uint256-
[MarketPlace-removeObjetListeOffres-uint256-]: #MarketPlace-removeObjetListeOffres-uint256-
[MarketPlace-recupererObjetHollandaise-uint256-]: #MarketPlace-recupererObjetHollandaise-uint256-
[JeuBouletCanon]: #JeuBouletCanon
[JeuBouletCanon-isAdmin-mapping-address----bool-]: #JeuBouletCanon-isAdmin-mapping-address----bool-
[JeuBouletCanon-tournois-mapping-uint256----struct-JeuBouletCanon-Tournoi-]: #JeuBouletCanon-tournois-mapping-uint256----struct-JeuBouletCanon-Tournoi-
[JeuBouletCanon-estParticipant-mapping-address----bool-]: #JeuBouletCanon-estParticipant-mapping-address----bool-
[JeuBouletCanon-numTN-uint256]: #JeuBouletCanon-numTN-uint256
[JeuBouletCanon-listeCanonsTire-uint256--]: #JeuBouletCanon-listeCanonsTire-uint256--
[JeuBouletCanon-listeParticipants-address--]: #JeuBouletCanon-listeParticipants-address--
[JeuBouletCanon-participerTournoi--]: #JeuBouletCanon-participerTournoi--
[JeuBouletCanon-lancerBouletCanon-uint256-]: #JeuBouletCanon-lancerBouletCanon-uint256-
[JeuBouletCanon-recupererPrix--]: #JeuBouletCanon-recupererPrix--
[JeuBouletCanon-creerTournoi--]: #JeuBouletCanon-creerTournoi--
[JeuBouletCanon-resetTournoi--]: #JeuBouletCanon-resetTournoi--
[JeuBouletCanon-recupArgent--]: #JeuBouletCanon-recupArgent--
## <span id="IERC721"></span> `IERC721`





- [`balanceOf(address _owner)`][IERC721-balanceOf-address-]
- [`ownerOf(uint256 _tokenId)`][IERC721-ownerOf-uint256-]
- [`exists(uint256 _tokenId)`][IERC721-exists-uint256-]
- [`transferFrom(address _from, address _to, uint256 _tokenId)`][IERC721-transferFrom-address-address-uint256-]
- [`_mint(address to, uint256 tokenId)`][IERC721-_mint-address-uint256-]
- [`Transfer(address _from, address _to, uint256 _tokenId)`][IERC721-Transfer-address-address-uint256-]

### <span id="IERC721-balanceOf-address-"></span> `balanceOf(address _owner) → uint256 balance` (public)





### <span id="IERC721-ownerOf-uint256-"></span> `ownerOf(uint256 _tokenId) → address _owner` (public)





### <span id="IERC721-exists-uint256-"></span> `exists(uint256 _tokenId) → bool Exists` (public)





### <span id="IERC721-transferFrom-address-address-uint256-"></span> `transferFrom(address _from, address _to, uint256 _tokenId)` (public)





### <span id="IERC721-_mint-address-uint256-"></span> `_mint(address to, uint256 tokenId)` (internal)





### <span id="IERC721-Transfer-address-address-uint256-"></span> `Transfer(address _from, address _to, uint256 _tokenId)`







## <span id="BouletDeCanon"></span> `BouletDeCanon`





- [`statsJoueur(address Adresse)`][BouletDeCanon-statsJoueur-address-]
- [`sEnregistrer(string votrePseudo)`][BouletDeCanon-sEnregistrer-string-]
- [`listerMesCanons()`][BouletDeCanon-listerMesCanons--]
- [`creerCanon()`][BouletDeCanon-creerCanon--]
- [`updateNiveauJoueur()`][BouletDeCanon-updateNiveauJoueur--]
- [`removeCanon(address addr, uint256 tokenId)`][BouletDeCanon-removeCanon-address-uint256-]
- [`balanceOf(address _owner)`][BouletDeCanon-balanceOf-address-]
- [`ownerOf(uint256 _tokenId)`][BouletDeCanon-ownerOf-uint256-]
- [`exists(uint256 _tokenId)`][BouletDeCanon-exists-uint256-]
- [`transferFrom(address from, address to, uint256 tokenId)`][BouletDeCanon-transferFrom-address-address-uint256-]
- [`_mint(address to, uint256 tokenId)`][BouletDeCanon-_mint-address-uint256-]
- [`Transfer(address _from, address _to, uint256 _tokenId)`][IERC721-Transfer-address-address-uint256-]

### <span id="BouletDeCanon-statsJoueur-address-"></span> `statsJoueur(address Adresse) → string Pseudo, uint32 xp, uint8 niveauJoueur, uint256 meilleurLance, uint8 compteurLance` (public)





### <span id="BouletDeCanon-sEnregistrer-string-"></span> `sEnregistrer(string votrePseudo)` (public)





### <span id="BouletDeCanon-listerMesCanons--"></span> `listerMesCanons() → uint256[] Liste` (public)





### <span id="BouletDeCanon-creerCanon--"></span> `creerCanon() → uint256 ID, uint256 puissance, uint256 rarete, uint256 magie` (public)





### <span id="BouletDeCanon-updateNiveauJoueur--"></span> `updateNiveauJoueur()` (public)





### <span id="BouletDeCanon-removeCanon-address-uint256-"></span> `removeCanon(address addr, uint256 tokenId)` (internal)





### <span id="BouletDeCanon-balanceOf-address-"></span> `balanceOf(address _owner) → uint256 balance` (public)





### <span id="BouletDeCanon-ownerOf-uint256-"></span> `ownerOf(uint256 _tokenId) → address _owner` (public)





### <span id="BouletDeCanon-exists-uint256-"></span> `exists(uint256 _tokenId) → bool Exist` (public)





### <span id="BouletDeCanon-transferFrom-address-address-uint256-"></span> `transferFrom(address from, address to, uint256 tokenId)` (public)





### <span id="BouletDeCanon-_mint-address-uint256-"></span> `_mint(address to, uint256 tokenId)` (internal)







## <span id="MarketPlace"></span> `MarketPlace`





- [`recupListeOffres()`][MarketPlace-recupListeOffres--]
- [`proposerALaVenteClassique(uint256 objet)`][MarketPlace-proposerALaVenteClassique-uint256-]
- [`proposerALaVenteHollandaise(uint256 objet, uint256 prixVendeur)`][MarketPlace-proposerALaVenteHollandaise-uint256-uint256-]
- [`offreClassique(uint256 objet)`][MarketPlace-offreClassique-uint256-]
- [`offreHollandaise(uint256 objet)`][MarketPlace-offreHollandaise-uint256-]
- [`Remboursement()`][MarketPlace-Remboursement--]
- [`recupererObjet(uint256 objet)`][MarketPlace-recupererObjet-uint256-]
- [`removeObjetListeOffres(uint256 objet)`][MarketPlace-removeObjetListeOffres-uint256-]
- [`recupererObjetHollandaise(uint256 objet)`][MarketPlace-recupererObjetHollandaise-uint256-]
- [`statsJoueur(address Adresse)`][BouletDeCanon-statsJoueur-address-]
- [`sEnregistrer(string votrePseudo)`][BouletDeCanon-sEnregistrer-string-]
- [`listerMesCanons()`][BouletDeCanon-listerMesCanons--]
- [`creerCanon()`][BouletDeCanon-creerCanon--]
- [`updateNiveauJoueur()`][BouletDeCanon-updateNiveauJoueur--]
- [`removeCanon(address addr, uint256 tokenId)`][BouletDeCanon-removeCanon-address-uint256-]
- [`balanceOf(address _owner)`][BouletDeCanon-balanceOf-address-]
- [`ownerOf(uint256 _tokenId)`][BouletDeCanon-ownerOf-uint256-]
- [`exists(uint256 _tokenId)`][BouletDeCanon-exists-uint256-]
- [`transferFrom(address from, address to, uint256 tokenId)`][BouletDeCanon-transferFrom-address-address-uint256-]
- [`_mint(address to, uint256 tokenId)`][BouletDeCanon-_mint-address-uint256-]
- [`Transfer(address _from, address _to, uint256 _tokenId)`][IERC721-Transfer-address-address-uint256-]

### <span id="MarketPlace-recupListeOffres--"></span> `recupListeOffres() → uint256[]` (public)





### <span id="MarketPlace-proposerALaVenteClassique-uint256-"></span> `proposerALaVenteClassique(uint256 objet)` (public)





### <span id="MarketPlace-proposerALaVenteHollandaise-uint256-uint256-"></span> `proposerALaVenteHollandaise(uint256 objet, uint256 prixVendeur)` (public)





### <span id="MarketPlace-offreClassique-uint256-"></span> `offreClassique(uint256 objet)` (public)





### <span id="MarketPlace-offreHollandaise-uint256-"></span> `offreHollandaise(uint256 objet)` (public)





### <span id="MarketPlace-Remboursement--"></span> `Remboursement()` (public)





### <span id="MarketPlace-recupererObjet-uint256-"></span> `recupererObjet(uint256 objet)` (public)





### <span id="MarketPlace-removeObjetListeOffres-uint256-"></span> `removeObjetListeOffres(uint256 objet)` (internal)





### <span id="MarketPlace-recupererObjetHollandaise-uint256-"></span> `recupererObjetHollandaise(uint256 objet)` (public)







## <span id="JeuBouletCanon"></span> `JeuBouletCanon`





- [`participerTournoi()`][JeuBouletCanon-participerTournoi--]
- [`lancerBouletCanon(uint256 tokenID)`][JeuBouletCanon-lancerBouletCanon-uint256-]
- [`recupererPrix()`][JeuBouletCanon-recupererPrix--]
- [`creerTournoi()`][JeuBouletCanon-creerTournoi--]
- [`resetTournoi()`][JeuBouletCanon-resetTournoi--]
- [`recupArgent()`][JeuBouletCanon-recupArgent--]
- [`recupListeOffres()`][MarketPlace-recupListeOffres--]
- [`proposerALaVenteClassique(uint256 objet)`][MarketPlace-proposerALaVenteClassique-uint256-]
- [`proposerALaVenteHollandaise(uint256 objet, uint256 prixVendeur)`][MarketPlace-proposerALaVenteHollandaise-uint256-uint256-]
- [`offreClassique(uint256 objet)`][MarketPlace-offreClassique-uint256-]
- [`offreHollandaise(uint256 objet)`][MarketPlace-offreHollandaise-uint256-]
- [`Remboursement()`][MarketPlace-Remboursement--]
- [`recupererObjet(uint256 objet)`][MarketPlace-recupererObjet-uint256-]
- [`removeObjetListeOffres(uint256 objet)`][MarketPlace-removeObjetListeOffres-uint256-]
- [`recupererObjetHollandaise(uint256 objet)`][MarketPlace-recupererObjetHollandaise-uint256-]
- [`statsJoueur(address Adresse)`][BouletDeCanon-statsJoueur-address-]
- [`sEnregistrer(string votrePseudo)`][BouletDeCanon-sEnregistrer-string-]
- [`listerMesCanons()`][BouletDeCanon-listerMesCanons--]
- [`creerCanon()`][BouletDeCanon-creerCanon--]
- [`updateNiveauJoueur()`][BouletDeCanon-updateNiveauJoueur--]
- [`removeCanon(address addr, uint256 tokenId)`][BouletDeCanon-removeCanon-address-uint256-]
- [`balanceOf(address _owner)`][BouletDeCanon-balanceOf-address-]
- [`ownerOf(uint256 _tokenId)`][BouletDeCanon-ownerOf-uint256-]
- [`exists(uint256 _tokenId)`][BouletDeCanon-exists-uint256-]
- [`transferFrom(address from, address to, uint256 tokenId)`][BouletDeCanon-transferFrom-address-address-uint256-]
- [`_mint(address to, uint256 tokenId)`][BouletDeCanon-_mint-address-uint256-]
- [`Transfer(address _from, address _to, uint256 _tokenId)`][IERC721-Transfer-address-address-uint256-]

### <span id="JeuBouletCanon-participerTournoi--"></span> `participerTournoi()` (public)





### <span id="JeuBouletCanon-lancerBouletCanon-uint256-"></span> `lancerBouletCanon(uint256 tokenID) → uint256 resultatLance` (public)





### <span id="JeuBouletCanon-recupererPrix--"></span> `recupererPrix()` (public)





### <span id="JeuBouletCanon-creerTournoi--"></span> `creerTournoi()` (public)





### <span id="JeuBouletCanon-resetTournoi--"></span> `resetTournoi()` (public)





### <span id="JeuBouletCanon-recupArgent--"></span> `recupArgent()` (public)





