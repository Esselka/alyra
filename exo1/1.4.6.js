// Exercice 1.4.6 : Quelques opérateurs en plus pour notre calculatrice polonaise

let log = console.log;

const calculer = (value) => {

	let calculs = value.split(' ');
    let stack = [];
    let operators = '+-/*<>=';

	for (let i = 0; i < calculs.length; i++) {

        // Test si l'index de calculs est égal à un des caractères de operators
		if (operators.includes(calculs[i])) {
			
			let a,b;

			switch (calculs[i]) {
				case '+':
					a = stack.pop();
					b = stack.pop();
					stack.push(b + a);
					break;
				case '-':
					a = stack.pop();
					b = stack.pop();
					stack.push(b - a);
					break;
				case '*':
					a = stack.pop();
					b = stack.pop();
					stack.push(b * a);
					break;
				case '/':
					a = stack.pop();
					b = stack.pop();
					stack.push(b / a);
                    break;
                case '<':
                    a = stack.pop();
                    b = stack.pop();
                    stack.push(b < a); // +(booléen) retourne 1 pour true et 0 pour false
                    break;
                case '>':
                    a = stack.pop();
                    b = stack.pop();
                    stack.push(b > a); // +(booléen) retourne 1 pour true et 0 pour false
                    break;
                case '=':
                    a = stack.pop();
                    b = stack.pop();
                    stack.push(b == a); // +(booléen) retourne 1 pour true et 0 pour false
                    break;
			}
		} 
		else stack.push(Number(calculs[i]));
	}
	return `${value}\n-> ${stack.pop()}\n`;
}


log(calculer('5 3 + 8 ='));
log(calculer('4 5 3 < +'));
log(calculer('5 3 + 1288 ='));
//log(calculer('1 2 + 4 * 3 +'));
//log(calculer('12 4 4 -'));
