var tab = process.argv;
var result = 0;
for (var i=2 ; i < tab.length ; i++) {
  result += Number(tab[i]);
}

console.log(result);
