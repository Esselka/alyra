/* Exercice 1.4.8 : Le bug de l'an... ?

Si le timestamp est encodé sur 4 octets, quel est sa taille maximale?

Sachant qu’il s’agit d’une date en seconde depuis 1970, à quelle date cette taille posera problème?
*/

log = console.log;

let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
let maxSec4Bytes = Math.pow(2,31) - 1;
let reste = maxSec4Bytes;

log('Nombre max de secondes sur 4 octets : ' + maxSec4Bytes + '\n');

// Calcul du nombre max d'années que peu faire le timestamp auquel on ajoute 1970 pour avoir l'année max
yearMax = 1970 + Math.trunc(maxSec4Bytes/(60*60*24*365.25));
reste -= (yearMax - 1970) * (60*60*24*365.25);

// Calcul du nombre max de mois que peu faire le timestamp avec le nombre de secondes qu'il nous reste
monthMax = Math.trunc(reste/(60*60*24*(365.25/12)));
reste -= monthMax * (60*60*24*(365.25/12));

// Calcul du nombre max de jours que peu faire le timestamp avec le nombre de secondes qu'il nous reste
dayMax = Math.trunc(reste/(60*60*24));
reste -= dayMax * (60*60*24);

// Calcul du nombre max d'heures que peu faire le timestamp avec le nombre de secondes qu'il nous reste
hourMax = Math.trunc(reste/(60*60));
if(hourMax < 10) hourMax = '0' + hourMax;
reste -= hourMax * (60*60);

// Calcul du nombre max de minutes que peu faire le timestamp avec le nombre de secondes qu'il nous reste
minuteMax = Math.trunc(reste/60);
if(minuteMax < 10) minuteMax = '0' + minuteMax;
reste -= minuteMax * 60;

// Le nombre de secondes qu'il nous reste
secondeMax = reste;
if(secondeMax < 10) secondeMax = '0' + secondeMax;

log(`La date max à laquelle le timestamp pourra aller est le :\n[${dayMax} ${months[monthMax]} ${yearMax} à ${hourMax}:${minuteMax}:${secondeMax}]`);
