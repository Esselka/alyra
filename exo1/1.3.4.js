class CourbeElliptique {
    constructor(a, b) {
        this.a = a;
        this.b = b;

        if (4*a**3+27*b**2 == 0) {
            throw(`4 x ${a}³ + 27 x ${b}² n'est pas une courbe valide`);
        }
        else {
            this.toString();
        }
    }

    // Compare si 2 courbres sont égales
    isEqual(courbe) {
        if (this.a === courbe.a && this.b === courbe.b) {
            console.log('Les courbes sont identiques');
        }
        else {
            console.log('Les courbes sont différentes');
        }
    }

    // Vérifie si un point appartient à la courbe
    testPoint(x, y) {
        if (y**2 == x**3 + this.a * x + this.b) {
            console.log(`Le point de coordonnées (${x}, ${y}) appartient à la courbe`);
            
        }
        else {
            console.log(`Le point de coordonnées (${x}, ${y}) n'appartient pas à la courbe`);
        }
    }

    // Affiche les paramètres de la courbe
    toString() {
        return `y² = x³ + ${this.a}x + ${this.b}`;
    }
}



try { let ce1 = new CourbeElliptique(0,0); }
catch(e) { console.log(e) };
console.log("");

let ce2 = new CourbeElliptique(0,7);
console.log("Paramètres de la courbe : " + ce2.toString());
ce2.testPoint(4,7);
