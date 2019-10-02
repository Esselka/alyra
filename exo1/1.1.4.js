// Classe définissant un cercle ayant un paramètre rayon dans son constructeur ainsi
// que 2 méthodes : aires() pour calculer l'aire et perimetre() pour calculer le périmètre
class Cercle {
    constructor(rayon) {
        this.rayon = rayon;
    }

    aire() {
        return this.rayon * this.rayon * Math.PI;
    }

    perimetre() {
        return 2 * Math.PI * this.rayon;
    }
}

let c = new Cercle(5);
console.log({'aire': c.aire(), 'perimetre': c.perimetre()});