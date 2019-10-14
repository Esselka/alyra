// Exercice 1.4.5 : Calculatrice en notation polonaise inversée

let log = console.log;

const calculer = (value) => {

	let calculs = value.split(' ');
	let stack = [];

	for (let i = 0; i < calculs.length; i++) {

		if (calculs[i] == '+' || calculs[i] == '-' || calculs[i] == '/' || calculs[i] == '*') {
			
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
			}
		} 
		else stack.push(Number(calculs[i]));
	}
	log(`${value} = ${stack.pop()}`);
}


log(calculer('12 4 - 2 *'));
log(calculer('3 4 1 2 + * +'));
log(calculer('1 2 + 4 * 3 +'));
log(calculer('12 4 4 -'));