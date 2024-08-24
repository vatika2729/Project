const figlet = require('figlet');
const color = require('colors');
figlet('Mukul', function (e, data) {
    if (e) {
        console.log('something went wrong');
        console.dir(e);
        return;
    }
    console.log(data.rainbow);
})