# ReKola - Mobilní aplikace pro půjčování kol

## Konfigurace

* Pro potřeby lokální konfigurace slouží soubor `config-local.js`

## Build systém

* Využíváme [Grunt](http://gruntjs.com) task runner
* Závislosti: Ruby a SASS `gem install sass --pre"
* Poprvé či po změně závislostí `npm install`
* Spuštění produkčního buildu: `grunt`
* Vývojový režim: `grunt dev` a `grunt watch`

## Deploy
Jsou tři servery:
- PRODUCTION - ostrá verze dostupná z app.rekola.cz; u nás na VPSce ve složce rekola-mobile; stačí pushnout do větve DEPLOY_PRODUCTION
- DEV - zkušební verze dostupná z vps.clevis.org/rekola-mobile-dev/; u nás na VPSce ve složce rekola-mobile-dev; stačí pushnout do větve DEPLOY_DEV
- DEMO - ukázková verze pro novináře atd. má pozměněnou db s pár testovacími daty; deployovat zřídka; dostupná z vps.clevis.org/rekola-mobile-demo; u nás na VPSce ve složce rekola-mobile-demo; není hook, potřeba potvrdit na deployHQ a pak ručně ve složce spustit `npm install` a `grunt`

