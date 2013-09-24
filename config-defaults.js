REKOLA.baseUrl = REKOLA.baseUrl || document.location.href.replace(document.location.protocol + '//' + document.location.host, '').replace(document.location.hash, '');
REKOLA.remoteUrl = REKOLA.remoteUrl || 'http://localhost/Clevis/ReKola/www/api';
REKOLA.apiKey = REKOLA.apiKey || 'REKOLA-apiKey';
REKOLA.rentedBike = REKOLA.rentedBike || 'REKOLA-rentedBike';
REKOLA.manualPosition = REKOLA.manualPosition || 'REKOLA-manualPosition';
console.log('REKOLA', REKOLA);
