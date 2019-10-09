const sha256 = require('crypto-js/sha256')
// let hash = sha256('chaine')
// hash.toString()

class Noeud {
    constructor(valeur) {
      this.valeur = valeur;
      this.gauche = undefined;
      this.droite = undefined;
      this.parent = undefined;
    }
  
    /*trouverNoeud(valeur) {
      if (this.valeur === valeur) {
        return this;
      } else if (valeur < this.valeur && this.gauche !== undefined) {
        return this.gauche.trouverNoeud(valeur);
      } else if (valeur >= this.valeur && this.droite !== undefined) {
        return this.droite.trouverNoeud(valeur);
      }
      return undefined;
    }*/
    
    ajouterFeuille(chaine) {
      if (this.droite !== undefined && this.droite !== undefined) {
        this.parent = 
      }
      
      if (this.gauche === undefined) {
        this.gauche = sha256(chaine).toString();
      } else if (this.droite === undefined) {
        this.droite = sha256(chaine).toString();
      }
      }
  
    afficher() {
      
      var out = "Noeud " + this.valeur + ":  L";
      this.gauche === undefined ? out += "-" : out += this.gauche.valeur;
      out += " R";
      this.droite === undefined ? out += "-" : out += this.droite.valeur;
      out += " P";
      this.parent === undefined ? out += "-" : out += this.parent.valeur;
      
      console.log(out);
      
      if (this.gauche !== undefined) this.gauche.afficher();
      if (this.droite !== undefined) this.droite.afficher();
    }
    
    toString() {
      var out = "Noeud " + this.valeur + ":  L";
      this.gauche === undefined ? out += "-" : out += this.gauche.valeur;
      out += " R";
      this.droite === undefined ? out += "-" : out += this.droite.valeur;
      out += " P";
      this.parent === undefined ? out += "-" : out += this.parent.valeur;
      
      console.log(out);
    }
  }     
  
  class ArbreMerkle {
    constructor() {
      this.racine = undefined;
    }
  
    //Méthode pour trouver une valeur donnée dans un arbre binaire de recherche
    trouverNoeud(valeur) {
        if (this.racine !== undefined) return this.racine.trouverNoeud(valeur);
    }
  
    //Méthode pour ajouter une feuille
    ajouterFeuille(chaine) {
      if (this.racine !== undefined) this.racine.ajouterFeuille(chaine);
      else this.racine = new Noeud(sha256(chaine).toString());
    }
    
    //Méthode pour afficher la valeur d'un noeud à partir de sa valeur
    printNoeud(valeur) {
        let noeud = this.trouverNoeud(valeur);
        if (noeud !== undefined) noeud.toString();
    }
  }
  


let aM = new ArbreMerkle;
aM.ajouterFeuille('lapin');
aM.ajouterFeuille('carotte');
aM.ajouterFeuille('champs');
aM.ajouterFeuille('arbre');

