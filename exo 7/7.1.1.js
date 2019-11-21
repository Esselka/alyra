const request = require('sync-request'); // https://www.npmjs.com/package/sync-request
bitmex = [];
bitfinex = [];

function requete(url) {
    let res = request('GET', url);
    return JSON.parse(res.getBody());
}

bitmex = requete('https://www.bitmex.com/api/v1/orderBook/L2?symbol=XBT&depth=10');
bitfinex = requete('https://api.bitfinex.com/v1/book/btcusd?limit_bids=10&limit_asks=10');

const afficherTableauBitfinex = (tab) => {
    let tabOffres = [];
    let tabDemandes = [];

    for (let i = 0; i < tab.bids.length; i++) {
        let element = tab.bids[i];
        tabOffres.push(element);
    }
    console.log('Bitfinex: Tableau des offres');
    console.table(tabOffres);

    for (let i = 0; i < tab.asks.length; i++) {
        let element = tab.asks[i];
        tabDemandes.push(element);
    }
    console.log('Bitfinex: Tableau des demandes');
    console.table(tabDemandes);

}

const comparerPlaceDeMarche = (tabBitmex, tabBitfinex) => {
    let gagnantAchat = "";
    let gagnantVente = "";
    let valeurMinBitmex = tabBitmex[0].price;
    let valeurMinBitfinex = tabBitfinex.bids[0].price;
    let valeurMaxBitmex = tabBitmex[10].price;
    let valeurMaxBitfinex = tabBitfinex.asks[0].price;

    for (let i = 1; i < 10; i++) {
        if (valeurMinBitmex > tabBitmex[i].price) valeurMinBitmex = tabBitmex[i].price;
        if (valeurMinBitfinex > tabBitfinex.bids[i].price) valeurMinBitfinex = tabBitfinex.bids[i].price;
    }

    for (let j = 1; j < tabBitfinex.asks.length; j++) {
        if (valeurMaxBitfinex < tabBitfinex.asks[j].price) valeurMaxBitfinex = tabBitfinex.asks[j].price;
    }

    for (let k = 11; k < tabBitmex.length; k++) {
        if (valeurMaxBitmex < tabBitmex[k].price) valeurMaxBitmex = tabBitmex[k].price;
    }

    valeurMinBitfinex > valeurMinBitmex ? gagnantAchat = 'Bitmex' : gagnantAchat = 'Bitfinex';
    valeurMaxBitmex > valeurMaxBitfinex ? gagnantVente = 'Bitmex' : gagnantVente = 'Bitfinex';
    console.log(`------------------------------------------------------
Achat de BTC :\n`);
    console.log('Bitmex:   1 BTC =', valeurMinBitmex + '$');
    console.log('Bitfinex: 1 BTC =', valeurMinBitfinex + '$\n');
    console.log(`Il est actuellement plus intéressant d'acheter des BTC sur ${gagnantAchat}`);
    console.log(`------------------------------------------------------`);

    console.log(`------------------------------------------------------
Vente de BTC :\n`);
    console.log('Bitmex:   1 BTC =', valeurMaxBitmex + '$');
    console.log('Bitfinex: 1 BTC =', valeurMaxBitfinex + '$\n');
    console.log(`Il est actuellement plus intéressant de vendre des BTC sur ${gagnantVente}`);
    console.log(`------------------------------------------------------`);

}
console.log('Bitmex: Tableau des offres et des demandes');
console.table(bitmex);
afficherTableauBitfinex(bitfinex);
comparerPlaceDeMarche(bitmex, bitfinex);

