//Write your own contracts here. Currently compiles using solc v0.4.15+commit.bbb8e64f.
pragma solidity ^0.5.11;
contract SceneOuverte {

  string[12] passagesArtistes;
  uint creneauxLibres = 12;
  uint tour;

  function sInscrire (string nomDArtiste) public {
    if (creneauxLibres > 0) {
      passagesArtistes[12 - creneauxLibres] = nomDArtiste;
      creneauxLibres--;
    }   
  }

  function passerArtisteSuivant() public {
    if (tour < 12 - creneauxLibres) {
      tour ++;
    }
  }

  function artisteEnCours() public view returns (string memory) {
    if (tour < 12 - creneauxLibres) {
      return passagesArtistes[tour];
      }
      else return "FIN";
  }
}