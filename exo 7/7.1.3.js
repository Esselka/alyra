const fetch = require("node-fetch");

function getLastExchangePrice (symbol) {
    fetch('https://data.messari.io/api/v1/assets/' + symbol + '/metrics')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(`${myJson.data.symbol} : ${myJson.data.name}`);
            console.log(`Prix actuel : ${myJson.data.market_data.price_usd} $`);
            console.log(`Prix maximal connu : ${myJson.data.all_time_high.price} $, le prix a chuté de ${(myJson.data.all_time_high.percent_down).toFixed(2)}% depuis cette valeur max\n`);
            console.log(`Il y a actuellement ${(myJson.data.supply.circulating/myJson.data.supply.y_2050*100).toFixed(2)}% des jetons qu'il y aura en 2050 en ciculation, le nombre de jetons en 2050 sera de ${myJson.data.supply.y_2050}.`);
            console.log('--------------------------------------------------------------------------------------------------------------------------');
        })
        .catch(err => console.error(err));
}

getLastExchangePrice('bat')
getLastExchangePrice('btc')
getLastExchangePrice('eth')