function facto (a) {
    a = parseInt(a);
    let result = 1
    let nbreOP = 0;

    for (let i = a; i > 1; i--) {
        result *= i;
        nbreOP++;
    }

    console.log(`Factorielle de ${a} = ${result} (effectué en ${nbreOP} opérations)`);
}

facto(0);
facto(3);
facto("4");
facto("5");
facto(8);
facto(10);
