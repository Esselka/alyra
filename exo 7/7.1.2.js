const fetch = require("node-fetch");

function getLastExchangePrice (symbol) {
    fetch('https://api.bitfinex.com/v1/pubticker/' + symbol)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(`Prix du dernier échange sur Bitfinex en (${symbol}) : ${myJson.last_price}$`);
        })
        .catch(err => console.error(err));
}

getLastExchangePrice('btceur')