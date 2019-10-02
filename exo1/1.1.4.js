// Classe définissant un cercle ayant un paramètre rayon dans son constructeur ainsi
// que 2 méthodes : aires() pour calculer l'aire et perimetre() pour calculer le périmètre
class Cercle {
    constructor(rayon) {
        this.rayon = rayon;
    }

    aires () {
        return this.rayon * this.rayon * Math.PI;
    }

    perimetre() {
        return 2 * Math.PI * this.rayon;
    }
}

/*  const cercle1 = new Cercle(4);
    const cercle2 = new Cercle(9);

    console.log(cercle1.aires()); // 50.26...
    console.log(cercle1.perimetre()); // 25.13...

    console.log(cercle2.aires()); // 254.46...
    console.log(cercle2.perimetre()); //56.54...    */