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
  
    trouverNoeud(valeur) {
      if (this.valeur === valeur) {
        return this;
      } else if (valeur < this.valeur && this.gauche !== undefined) {
        return this.gauche.trouverNoeud(valeur);
      } else if (valeur >= this.valeur && this.droite !== undefined) {
        return this.droite.trouverNoeud(valeur);
      }
      return undefined;
    }
  
    ajouterNoeud(valeur) {
      if (valeur < this.valeur) {
        this.gauche === undefined ? this._ajouterNoeud(new Noeud(valeur)) : this.gauche.ajouterNoeud(valeur);
      } 
      else {
        this.droite === undefined ? this._ajouterNoeud(new Noeud(valeur)) : this.droite.ajouterNoeud(valeur);
        }
      }
  
    _ajouterNoeud(noeud) {
      if (noeud.valeur < this.valeur) {
        this.gauche = noeud;
      } else {
        this.droite = noeud;
      }
      noeud.parent = this;
    }
    
    infixe() {
      let parcours = [];
      if (this.gauche !== undefined) {
        parcours = [].concat(parcours, this.gauche.infixe());
      }
      parcours.push(this.valeur);
      if (this.droite !== undefined) {
        parcours = [].concat(parcours, this.droite.infixe());
      }
      return parcours;
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
  
    //Méthode pour ajouter un noeud
    ajouterNoeud(valeur) {
        if (this.racine !== undefined) this.racine.ajouterNoeud(valeur);
        else this.racine = new Noeud(valeur);
    }
    
    //Méthode pour afficher l’arbre selon un parcours infixe
    //Cette méthode doit retournée un tableau contenant la valeur des noeuds
    infixe() {
        if (this.racine !== undefined) return this.racine.infixe();
    }
    
    //Méthode pour afficher la valeur d'un noeud à partir de sa valeur
    printNoeud(valeur) {
        let noeud = this.trouverNoeud(valeur);
        if (noeud !== undefined) noeud.toString();
    }

    //Méthode pour obtenir un hash à partir d'une chaîne de caractères
    hasher(chaine) {
        return sha256(chaine).toString();
    }
  }
  


let aM = new ArbreMerkle;
aM.hasher('lapin');
console.log(aM.hasher('carotte' + 'lapin'));
console.log(aM.hasher('carotte lapin'));
console.log(aM.hasher(aM.hasher('carotte') + aM.hasher('lapin')));
aM.hasher('champs');
aM.hasher('arbre');
