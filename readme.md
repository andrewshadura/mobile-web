# ReKola - Mobilní aplikace pro půjčování kol

## Konfigurace

* Pro potřeby lokální konfigurace slouží soubor `config-local.js`


## Initialization

Requirements: [Node.js](http://nodejs.org/download)


`npm install` - *the one command to rule them all*

1. Installation of node modules (specified in [package.json](package.json), mainly for Grunt build)
2. Installation of bower packages (specified in [bower.json](bower.json))
3. Production build (specified in Grunt [default task](Gruntfile.js))

In case of NPM network problems try EU mirror: `npm --registry http://registry.npmjs.eu/ install`

## Workflow

Follow [Code Conventions](https://github.com/Clevis/Frontbase/wiki/Code-Conventions) and write a perfect, well documented code.

* `npm run-script build` - for project production build
* `npm start` - start of development work which builds project with DEV settings and then watches for file change (browser-sync included)


## Deploy
Jsou tři servery:
- PRODUCTION - ostrá verze dostupná z app.rekola.cz; u nás na VPSce ve složce rekola-mobile; stačí pushnout do větve DEPLOY_PRODUCTION
- DEV - zkušební verze dostupná z vps.clevis.org/rekola-mobile-dev/; u nás na VPSce ve složce rekola-mobile-dev; stačí pushnout do větve DEPLOY_DEV
- DEMO - ukázková verze pro novináře atd. má pozměněnou db s pár testovacími daty; deployovat zřídka; dostupná z vps.clevis.org/rekola-mobile-demo; u nás na VPSce ve složce rekola-mobile-demo; není hook, potřeba potvrdit na deployHQ`

